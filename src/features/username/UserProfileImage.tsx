'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import useUploadUserProfileImage from '@/hooks/mutations/useUploadUserProfileImage';
import Typography from '@/components/ui/typography';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import useGetUserProfile from '@/hooks/queries/useGetUserProfile';
import UserProfileImageSkeleton from './UserProfileImageSkeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Image as ImageIcon, UploadSimple } from '@phosphor-icons/react';

const schema = z.object({
  avatar: z.any(),
});

type UploadProfileImage = z.infer<typeof schema>;

const UserProfileImage = (params: { username: string }) => {
  const { data: userProfile, isPending: isUserProfileLoading } =
    useGetUserProfile({
      username: params.username,
    });

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

  const handleOpenFileExplorer = () => {
    imageInput.current?.click();
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
              ${!userProfile?.avatar && 'animate-pulse'}
              relative w-28 h-28 border rounded-full overflow-hidden cursor-pointer bg-accent`}
        >
          <DropdownMenu>
            {preview ? (
              <Image
                alt="avatar"
                src={preview}
                unoptimized
                fill
                sizes="100%"
                className="object-cover active:scale-[0.98]"
                priority
              />
            ) : (
              !isUserProfileLoading && (
                <DropdownMenuTrigger asChild>
                  <Image
                    alt="avatar"
                    src={userProfile?.avatar!}
                    unoptimized
                    fill
                    sizes="100%"
                    className="object-cover active:scale-[0.98]"
                    priority
                  />
                </DropdownMenuTrigger>
              )
            )}

            <DropdownMenuContent align="start" className="w-[200px]">
              <DropdownMenuItem className="p-2 gap-2">
                <ImageIcon size={20} />
                <Typography.Span title="View Photo" weight="medium" size="sm" />
              </DropdownMenuItem>

              <DropdownMenuItem
                className="p-2 gap-2"
                onClick={handleOpenFileExplorer}
              >
                <UploadSimple size={20} />
                <Typography.Span
                  title="Change Photo"
                  weight="medium"
                  size="sm"
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
          <div className="space-x-2 mt-3">
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

        <div className="flex flex-wrap items-center">
          <div className="mt-5">
            <Typography.H3 title={userProfile?.name} weight="semibold" />
            <Typography.Span
              title={`@${userProfile?.username}`}
              color="muted"
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserProfileImage;
