'use client';

import { Button } from '@/components/ui/button';
import { GlobeHemisphereEast, Images } from '@phosphor-icons/react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { FormProvider, useForm } from 'react-hook-form';
import { CreatePostInput } from '@/services';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useCreatePostMutation from '@/hooks/mutations/useCreatePostMutation';

const schema = z.object({
  content: z.string().min(1, 'Content is required').max(5000, 'Too long dude'),
});

const CreatePostForm = () => {
  const methods = useForm<CreatePostInput>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, register, formState } = methods;

  const { mutateAsync: createPostMutate } = useCreatePostMutation();

  const handleCreatePost = async (data: CreatePostInput) => {
    try {
      await createPostMutate(data);
    } catch (error) {
      //
    }
  };

  return (
    <FormProvider {...methods}>
      <TooltipProvider>
        <form onSubmit={handleSubmit(handleCreatePost)}>
          <h1 className="text-2xl font-display font-semibold leading-0 mb-5">
            Share your thoughts
          </h1>

          <textarea
            className="bg-transparent w-full h-40 border rounded-2xl resize-none focus:outline-0 focus:ring-1 focus:ring-offset-4 focus:ring-border scroll-smooth scrollbar-thumb-foreground/10 scrollbar-track-foreground/0 scrollbar-thin p-5"
            placeholder="What's on your mind?"
            {...register('content')}
          />

          <div className="flex justify-between items-center my-2">
            <div className="space-x-2">
              <Tooltip>
                <TooltipTrigger type="button" asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <Images size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload image</p>
                </TooltipContent>

                <TooltipTrigger type="button" asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <GlobeHemisphereEast size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Audience is set to public</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <Button
              size="sm"
              className="rounded-full"
              disabled={!formState.isValid}
            >
              Share public
            </Button>
          </div>
        </form>
      </TooltipProvider>
    </FormProvider>
  );
};

export default CreatePostForm;
