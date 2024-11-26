'use client';

import { ChangeEvent, ReactNode, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Radio from '@/components/common/Radio/Radio';
import {
  GlobeHemisphereEast,
  Images,
  Lock,
  Users,
} from '@phosphor-icons/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useCreatePost from '@/hooks/mutations/useCreatePost';
import Typography from '@/components/ui/typography';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Audience } from '@/services';
import PhotoGrid from '@/components/common/PhotoGrid/PhotoGrid';

const schema = z.object({
  images: z.any(),
  content: z.string().min(1, 'Content is required').max(5000, 'Too long dude'),
});

type CreatePostInput = z.infer<typeof schema>;

interface AudienceOptions {
  label: string;
  icon: ReactNode;
  value: NonNullable<Audience>;
}

const AUDIENCE: AudienceOptions[] = [
  { label: 'Public', icon: <GlobeHemisphereEast size={16} />, value: 'public' },
  { label: 'Friends only', icon: <Users size={16} />, value: 'friends' },
  { label: 'Only me', icon: <Lock size={16} />, value: 'private' },
];

const CreatePostForm = () => {
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
        content: data.content,
        audience: audience.value,
      });
    } catch (error) {}
  };

  const handleAudienceChange = () => {
    setAudience(prev => ({
      selected: prev.selected,
      value: prev.selected,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event?.target?.files ?? []);
    const previews = files.map(file => URL.createObjectURL(file));

    if (files.length > 0) {
      setImages(prev => [...prev, ...files]);
      setPreviewImages(prev => [...prev, ...previews]);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleCreatePost)}>
        <Typography.H4 title="Create post" className="py-5" weight="semibold" />

        <textarea
          className="bg-transparent w-full h-40 border rounded-2xl resize-none focus:outline-0 focus:ring-1 focus:ring-offset-4 focus:ring-border scroll-smooth scrollbar-thumb-foreground/10 scrollbar-track-foreground/0 scrollbar-thin p-5"
          placeholder="What's on your mind?"
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

            <Dialog
              onOpenChange={() =>
                setAudience(prev => ({
                  selected: prev.value,
                  value: prev.value,
                }))
              }
            >
              <DialogTrigger asChild>
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
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                  <DialogTitle>Change audience</DialogTitle>
                  <DialogDescription>
                    Select your preferred audience to ensure the right people
                    see your content.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-2">
                  {AUDIENCE.map(({ label, value, icon }) => {
                    return (
                      <button
                        key={value}
                        className="flex justify-between items-center text-start border rounded-lg py-3 px-4 hover:bg-muted"
                        onClick={() =>
                          setAudience(prev => ({
                            selected: value,
                            value: prev.value,
                          }))
                        }
                      >
                        <div className="flex items-center gap-2">
                          {icon}
                          {label}
                        </div>
                        <Radio isSelected={audience.selected === value} />
                      </button>
                    );
                  })}
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      className="rounded-full text-xs"
                      onClick={() => handleAudienceChange()}
                    >
                      Apply changes
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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

        {previewImages && previewImages.length > 0 && (
          <div className="mt-10 space-y-4">
            <Typography.H6 title="Attached images" />
            <PhotoGrid images={previewImages} />
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default CreatePostForm;
