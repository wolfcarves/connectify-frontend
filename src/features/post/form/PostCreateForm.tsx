'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Images, PencilSimple, X } from '@phosphor-icons/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useCreatePost from '@/hooks/mutations/useCreatePost';
import Typography from '@/components/ui/typography';
import { Audience } from '@/services';
import PhotoGrid from '@/components/common/PhotoGrid/PhotoGrid';
import { ServerInternalError } from '@/services';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import PostAudienceDialog, {
  AUDIENCE,
} from '@/components/modules/Post/PostAudienceDialog';

const schema = z.object({
  images: z.any(),
  content: z.string().min(1, 'Content is required').max(5000, 'Too long dude'),
});

type CreatePostInput = z.infer<typeof schema>;

const PostCreateForm = () => {
  const { toast } = useToast();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [audience, setAudience] = useState<{
    selected: Audience;
    value: Audience;
  }>({
    selected: 'public',
    value: 'public',
  });

  const methods = useForm<CreatePostInput>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, register, formState } = methods;
  const { ref, ...imagesProps } = register('images');

  const { mutateAsync: createPostMutate, isPending: isCreatePostLoading } =
    useCreatePost();

  const handleCreatePost = async (data: CreatePostInput) => {
    try {
      await createPostMutate({
        images,
        content: data.content.trim(),
        audience: audience.value,
      });
    } catch (error) {
      const err = error as { body: ServerInternalError };
      toast({ title: err.body.error.message });
    }
  };

  const handleAudienceChange = () => {
    setAudience(prev => ({
      selected: prev.selected,
      value: prev.selected,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const MAX_IMAGE = 10;

    const files = Array.from(event?.target?.files ?? []);
    const previews = files.map(file => URL.createObjectURL(file));

    const totalUploadedImages = files.length + images.length;

    if (totalUploadedImages > MAX_IMAGE) {
      return toast({ title: `You can only upload up to ${MAX_IMAGE} images` });
    }

    if (files.length > 0) {
      setImages(prev => [...prev, ...files]);
      setPreviewImages(prev => [...prev, ...previews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => {
      const updatedImages = prev.filter((_, idx) => idx !== index);
      if (updatedImages.length === 0) setEditMode(false);
      return updatedImages;
    });
    setPreviewImages(prev => prev.filter((_, idx) => idx !== index));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleCreatePost)}>
        <Typography.H4 title="Create post" className="py-5" weight="semibold" />

        <textarea
          className="w-full border rounded-2xl resize-none focus:outline-0 focus:ring-1 focus:ring-offset-4 focus:ring-border scroll-smooth scrollbar-thumb-foreground/10 scrollbar-track-foreground/0 scrollbar-thin p-5"
          placeholder="What's on your mind?"
          rows={5}
          {...register('content')}
        />

        <div className="flex justify-between items-center my-2">
          <div className="space-x-2">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full"
              size="sm"
              onClick={() => imageInputRef.current?.click()}
            >
              <Images size={16} />
              <Typography.Span title="Add image" weight="medium" size="sm" />

              <input
                type="file"
                {...imagesProps}
                ref={e => {
                  imageInputRef.current = e;
                  ref(e);
                }}
                multiple
                className="hidden"
                accept="image/jpeg, image/jpg, image/png"
                onChange={handleImageChange}
              />
            </Button>

            <PostAudienceDialog
              trigger={
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-full"
                  size="sm"
                >
                  {AUDIENCE.find(aud => aud.value === audience.value)?.icon}

                  <Typography.Span
                    title={
                      AUDIENCE.find(aud => aud.value === audience.value)?.label
                    }
                    weight="medium"
                    size="sm"
                  />
                </Button>
              }
              onOpenChange={() =>
                setAudience(prev => ({
                  selected: prev.value,
                  value: prev.value,
                }))
              }
              audience={audience}
              setAudience={setAudience}
              onApplyClick={handleAudienceChange}
            />
          </div>

          <Button
            className="rounded-full text-xs"
            isLoading={isCreatePostLoading}
            disabled={!formState.isValid || isCreatePostLoading}
            size="sm"
          >
            Share public
          </Button>
        </div>

        {previewImages && previewImages.length > 0 && !editMode && (
          <div className="mt-10 space-y-4">
            <Typography.H6 title="Attached images" />
            <PhotoGrid images={previewImages} />
            <Button
              type="button"
              variant="secondary"
              icon={<PencilSimple size={16} />}
              className="w-full rounded-full"
              onClick={() => setEditMode(true)}
            >
              <Typography.Span title="Edit images" size="sm" />
            </Button>
          </div>
        )}

        {editMode && (
          <div className="space-y-6 py-10">
            <Typography.H6 title="Attached images" />
            {previewImages?.map((image, idx) => (
              <div key={image} className="relative">
                <div className="absolute inset-0 flex justify-center items-center bg-muted/40 rounded-xl duration-100 opacity-0 hover:opacity-100">
                  {images[idx].name}
                </div>

                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  icon={<X size={20} />}
                  className="absolute -top-5 -end-3 rounded-full"
                  onClick={() => {
                    handleRemoveImage(idx);
                  }}
                />

                <Image
                  alt={`uploaded-image-${idx}`}
                  src={image}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto rounded-xl"
                />
              </div>
            ))}
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default PostCreateForm;
