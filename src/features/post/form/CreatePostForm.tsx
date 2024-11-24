'use client';

import { Button } from '@/components/ui/button';
import { GlobeHemisphereEast, Images } from '@phosphor-icons/react';
import { FormProvider, useForm } from 'react-hook-form';
import { CreatePostInput } from '@/services';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useCreatePost from '@/hooks/mutations/useCreatePost';
import Typography from '@/components/ui/typography';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const schema = z.object({
  content: z.string().min(1, 'Content is required').max(5000, 'Too long dude'),
});

const CreatePostForm = () => {
  const [audience, setAudience] =
    useState<CreatePostInput['audience']>('public');

  const methods = useForm<CreatePostInput>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, register, formState } = methods;

  const { mutateAsync: createPostMutate } = useCreatePost();

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

            <Button
              type="button"
              variant="secondary"
              className="rounded-full"
              size="sm"
            >
              <GlobeHemisphereEast size={16} />
              <Typography.Span title="Public" weight="medium" size="sm" />
            </Button>
          </div>

          <Button
            className="rounded-full"
            disabled={!formState.isValid}
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
