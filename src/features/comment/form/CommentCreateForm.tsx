'use client';

import React from 'react';
import useCreateComment from '@/hooks/mutations/useCreateComment';
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

interface CommentCreateFormProps {
  postId?: number;
  onSubmit?: (commentId: number, value: string) => void;
  onLoad?: (status: boolean) => void;
}

const CommentCreateForm = ({ postId, onSubmit }: CommentCreateFormProps) => {
  const methods = useForm<CommentSchema>({});
  const { handleSubmit, register, setError, reset } = methods;

  const {
    mutateAsync: createCommentMutate,
    isPending: isCreateCommentLoading,
  } = useCreateComment();

  const handleCommentSubmit = async ({ content }: CommentSchema) => {
    try {
      const requestData = {
        postId,
        content: content,
      };

      const createdComment = await createCommentMutate(requestData);
      onSubmit?.(createdComment.id, content);

      reset();
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
        ref={ref}
        isLoading={isCreateCommentLoading}
      />
    </form>
  );
};

export default CommentCreateForm;
