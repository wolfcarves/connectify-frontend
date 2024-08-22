'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import useUploadUserProfileImage from '@/hooks/mutations/useUploadUserProfileImage';
import Typography from '@/components/ui/typography';
import useSession from '@/hooks/useSession';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import useGetUserProfile from '@/hooks/queries/useGetUserProfile';

const schema = z.object({
  avatar: z.any(),
});

type UploadProfileImage = z.infer<typeof schema>;

const UserProfileImage = ({ userId }: { userId: number }) => {
  const { data: userProfile, isLoading } = useGetUserProfile(userId);

  const avatar = userProfile?.avatar;
  const name = userProfile?.name;
  const username = userProfile?.username;

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

  return (
    <FormProvider {...methods}>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit(handleUploadImage)}
      >
        <div
          className={`
            ${!avatar && 'animate-pulse'}
            relative w-28 h-28 border rounded-full overflow-hidden cursor-pointer bg-accent`}
        >
          {preview ? (
            <Image
              alt="avatar"
              src={preview}
              unoptimized
              fill
              sizes="100%"
              onClick={() => imageInput.current?.click()}
            />
          ) : (
            !isLoading && (
              <Image
                alt="avatar"
                src={avatar!}
                unoptimized
                fill
                sizes="100%"
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

        <div className="my-5">
          <Typography.H3 title={name} weight="semibold" />
          <Typography.Span title={`@${username}`} />
        </div>
      </form>
    </FormProvider>
  );
};

export default UserProfileImage;
