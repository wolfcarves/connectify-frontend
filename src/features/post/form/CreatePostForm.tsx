'use client';

import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import Radio from '@/components/common/Radio/Radio';
import {
  GlobeHemisphereEast,
  Images,
  Lock,
  Users,
} from '@phosphor-icons/react';
import { FormProvider, useForm } from 'react-hook-form';
import { CreatePostInput } from '@/services';
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

const schema = z.object({
  content: z.string().min(1, 'Content is required').max(5000, 'Too long dude'),
});

interface AudienceOptions {
  label: string;
  icon: ReactNode;
  value: NonNullable<CreatePostInput['audience']>;
}

const AUDIENCE: AudienceOptions[] = [
  { label: 'Public', icon: <GlobeHemisphereEast size={16} />, value: 'public' },
  { label: 'Friends only', icon: <Users size={16} />, value: 'friends' },
  { label: 'Only me', icon: <Lock size={16} />, value: 'private' },
];

const CreatePostForm = () => {
  const [audience, setAudience] =
    useState<CreatePostInput['audience']>('public');

  const [selectedAudience, setSelectedAudience] =
    useState<CreatePostInput['audience']>(audience);

  const methods = useForm<CreatePostInput>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, register, formState } = methods;

  const { mutateAsync: createPostMutate, isPending: isCreatePostLoading } =
    useCreatePost();

  const handleCreatePost = async (data: CreatePostInput) => {
    try {
      await createPostMutate({
        content: data.content,
        audience,
      });
    } catch (error) {
      //
    }
  };

  const handleAudienceChange = () => {
    setAudience(selectedAudience);
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
            >
              <Images size={16} />
              <Typography.Span title="Add image" weight="medium" size="sm" />
            </Button>

            <Dialog onOpenChange={() => setSelectedAudience(audience)}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-full"
                  size="sm"
                >
                  <GlobeHemisphereEast size={16} />
                  <Typography.Span
                    title={AUDIENCE.find(aud => aud.value === audience)?.label}
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
                  {AUDIENCE.map(({ label, value }) => {
                    return (
                      <button
                        key={value}
                        className="flex justify-between gap-2 text-start border rounded-lg py-3 px-4 hover:bg-muted"
                        onClick={() => setSelectedAudience(value)}
                      >
                        {label}
                        <Radio isSelected={selectedAudience === value} />
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
      </form>
    </FormProvider>
  );
};

export default CreatePostForm;
