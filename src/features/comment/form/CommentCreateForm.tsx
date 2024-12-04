'use client';

import React, { useRef } from 'react';
import useCreatePostComment from '@/hooks/mutations/useCreatePostComment';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import errorHandler from '@/utils/errorHandler';
import CommentInput from '@/components/modules/Comment/CommentInput';

const schema = z.object({
  content: z
    .string()
    .min(1, 'Please add comment')
    .max(300, 'Comment is too long'),
});

type CommentSchema = z.infer<typeof schema>;

const CommentCreateForm = ({ postId }: { postId?: number }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const methods = useForm<CommentSchema>({});
  const { handleSubmit, register, setError } = methods;

  const { mutateAsync: createCommentMutate } = useCreatePostComment();

  const handleCommentSubmit = async (data: CommentSchema) => {
    try {
      const requestData = {
        postId,
        comment: data?.content,
      };

      await createCommentMutate(requestData);

      if (textareaRef?.current) textareaRef.current.value = '';
    } catch (error: unknown) {
      //
      errorHandler(error, schema, setError);
    }
  };

  const { ref, ...registerContent } = register('content');

  return (
    <form
      className="fixed start-0 bottom-0 w-full bg-background-light"
      onSubmit={handleSubmit(handleCommentSubmit)}
    >
      <CommentInput
        {...registerContent}
        ref={e => {
          ref(e);
          textareaRef.current = e;
        }}
      />
    </form>
  );
};

export default CommentCreateForm;
