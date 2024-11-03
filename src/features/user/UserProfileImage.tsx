'use client';

import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import useUploadUserProfileImage from '@/hooks/mutations/useUploadUserProfileImage';
import Typography from '@/components/ui/typography';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import useGetUserProfile, {
  GET_USER_PROFILE_KEY,
} from '@/hooks/queries/useGetUserProfile';
import UserProfileImageSkeleton from './UserProfileImageSkeleton';
import { ChatCircle, Check, Trash, UserPlus, X } from '@phosphor-icons/react';
import useSendFriendRequest from '@/hooks/mutations/useSendFriendRequest';
import useSession from '@/hooks/useSession';
import { useQueryClient } from '@tanstack/react-query';
import useCancelFriendRequest from '@/hooks/mutations/useCancelFriendRequest';
import useAcceptFriendRequest from '@/hooks/mutations/useAcceptFriendRequest';

const schema = z.object({
  avatar: z.any(),
});

type UploadProfileImage = z.infer<typeof schema>;

const UserProfileImage = (params: { username: string }) => {
  const [isFriendAccepted, setIsFriendAccepted] = useState<boolean>(false);
  const [isFriendDeleted, setIsFriendDeleted] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { username } = useSession();

  const { data: userProfile, isLoading: isUserProfileLoading } =
    useGetUserProfile({
      username: params.username,
    });

  const { mutateAsync: sendRequest, isPending: isSendRequestLoading } =
    useSendFriendRequest();

  const {
    mutateAsync: acceptFriendRequest,
    isPending: isAcceptFriendRequestLoading,
  } = useAcceptFriendRequest();

  const { mutateAsync: cancelRequest, isPending: isCancelRequestLoading } =
    useCancelFriendRequest();

  const profile = useMemo(
    () => ({
      avatar: userProfile?.avatar,
      name: userProfile?.name,
      username: userProfile?.username,
    }),
    [userProfile],
  );

  const imageInput = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>('');

  const methods = useForm<UploadProfileImage>();

  const { register, handleSubmit } = methods;
  const { ref, onChange, ...rest } = register('avatar');

  const { toast } = useToast();

  const { mutateAsync: uploadImageMutate, isPending: isUploadImageLoading } =
    useUploadUserProfileImage();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onChange(e);

    if (file) {
      const preview = URL.createObjectURL(file);
      setPreview(preview);
    }
  };

  const handleUploadImage = async (data: UploadProfileImage) => {
    const formData = new FormData();
    const fileImage = data?.avatar?.[0];

    if (fileImage) {
      formData.append('avatar', fileImage);
      await uploadImageMutate(formData);
      setPreview('');
      toast({ title: 'Profile image updated', duration: 3000 });
    }
  };

  const handleSendRequest = async () => {
    try {
      const response = await sendRequest(userProfile?.id);
      await queryClient.invalidateQueries({
        queryKey: [GET_USER_PROFILE_KEY()],
      });

      toast({ title: response });
    } catch (error) {
      toast({ title: 'Something went wrong' });
    }
  };

  const handleAcceptRequest = async () => {
    try {
      const response = await acceptFriendRequest(userProfile?.id);
      await queryClient.invalidateQueries({
        queryKey: [GET_USER_PROFILE_KEY()],
      });
      toast({ title: response.message });
    } catch (error) {
      toast({ title: 'Something went wrong' });
    }
  };

  const handleCancelRequest = async () => {
    try {
      const response = await cancelRequest(userProfile?.id);
      await queryClient.invalidateQueries({
        queryKey: [GET_USER_PROFILE_KEY()],
      });

      toast({ title: response });
    } catch (error) {
      toast({ title: 'Something went wrong' });
    }
  };

  if (isUserProfileLoading) return <UserProfileImageSkeleton />;

  return (
    <FormProvider {...methods}>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit(handleUploadImage)}
      >
        <div
          className={`
            ${!profile.avatar && 'animate-pulse'}
            relative w-28 h-28 border rounded-full overflow-hidden cursor-pointer bg-accent`}
        >
          {preview ? (
            <Image
              alt="avatar"
              src={preview}
              unoptimized
              fill
              sizes="100%"
              className="object-cover"
              onClick={() => imageInput.current?.click()}
            />
          ) : (
            !isUserProfileLoading && (
              <Image
                alt="avatar"
                src={profile.avatar!}
                unoptimized
                fill
                sizes="100%"
                className="object-cover"
                onClick={() => imageInput.current?.click()}
              />
            )
          )}

          <input
            type="file"
            {...rest}
            ref={e => {
              imageInput.current = e;
              ref(e);
            }}
            accept="image/jpg,image/jpeg,image/png"
            className="hidden absolute inset-0 z-10"
            onChange={handleImageChange}
          />
        </div>

        {preview && (
          <div className="my-5 space-x-2">
            <Button
              type="submit"
              size="xs"
              variant={!isUploadImageLoading ? 'default' : 'ghost'}
              isLoading={isUploadImageLoading}
              disabled={isUploadImageLoading}
            >
              Save
            </Button>

            {!isUploadImageLoading && (
              <Button
                type="button"
                size="xs"
                variant="ghost"
                onClick={() => setPreview('')}
              >
                Cancel
              </Button>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between">
          <div className="my-5">
            <Typography.H3 title={profile.name} weight="semibold" />
            <Typography.Span title={`@${profile?.username}`} color="muted" />
          </div>

          {username !== params.username && (
            <div className="flex gap-2">
              <Button
                visible={!userProfile?.has_request && !userProfile?.is_friend}
                icon={<UserPlus size={18} />}
                variant="default"
                size="sm"
                className="rounded-full"
                isLoading={isSendRequestLoading}
                onClick={() => {
                  handleSendRequest();
                }}
              >
                Add Friend
              </Button>

              <Button
                visible={
                  userProfile?.has_request &&
                  userProfile.request_from === 'them' &&
                  !userProfile?.is_friend
                }
                icon={<Check size={18} />}
                variant="default"
                size="sm"
                className="rounded-full"
                isLoading={isAcceptFriendRequestLoading}
                onClick={() => {
                  handleAcceptRequest();
                }}
              >
                Accept
              </Button>

              <Button
                visible={
                  userProfile?.has_request &&
                  userProfile.request_from === 'them' &&
                  !userProfile?.is_friend
                }
                icon={<X size={18} />}
                variant="destructive"
                size="sm"
                className="rounded-full"
                isLoading={isCancelRequestLoading}
                onClick={() => {
                  handleCancelRequest();
                }}
              >
                <Typography.Span title="Delete" weight="medium" size="sm" />
              </Button>

              <Button
                visible={
                  userProfile?.has_request &&
                  userProfile.request_from === 'us' &&
                  !userProfile?.is_friend
                }
                icon={<X size={18} />}
                size="sm"
                className="rounded-full"
                isLoading={isCancelRequestLoading}
                onClick={() => {
                  handleCancelRequest();
                }}
              >
                <Typography.Span
                  title="Cancel Request"
                  weight="medium"
                  size="sm"
                  color="background"
                />
              </Button>

              <Button
                icon={<ChatCircle size={18} />}
                variant="default"
                size="sm"
                className="rounded-full"
              >
                Message
              </Button>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default UserProfileImage;
