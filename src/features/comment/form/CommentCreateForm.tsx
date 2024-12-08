'use client';

import React, { useEffect, useRef } from 'react';
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

const CommentCreateForm = ({
  postId,
  onSubmit,
  onLoad,
}: CommentCreateFormProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const methods = useForm<CommentSchema>({});
  const { handleSubmit, register, setError } = methods;

  const {
    mutateAsync: createCommentMutate,
    isPending: isCreateCommentLoading,
  } = useCreateComment();

  useEffect(() => {
    onLoad && onLoad(isCreateCommentLoading);
  }, [isCreateCommentLoading, onLoad]);

  const handleCommentSubmit = async (data: CommentSchema) => {
    try {
      if (textareaRef?.current)
        if (
          textareaRef.current.value !== '' ||
          textareaRef.current.value !== undefined
        ) {
          const requestData = {
            postId,
            content: data?.content,
          };

          const createdComment = await createCommentMutate(requestData);
          onSubmit && onSubmit(createdComment.id, textareaRef.current.value);

          textareaRef.current.value = '';
        }
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
        isLoading={isCreateCommentLoading}
      />
    </form>
  );
};

export default CommentCreateForm;
