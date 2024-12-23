'use client';

import React, { useRef } from 'react';
import useCreateComment from '@/hooks/mutations/useCreateComment';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import errorHandler from '@/utils/errorHandler';
import CommentInput from '@/components/modules/Comment/CommentInput';
import useEnterToSubmit from '@/utils/useEnterToSubmit';

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
  isCard?: boolean;
}

const CommentCreateForm = ({
  postId,
  onSubmit,
  isCard = false,
}: CommentCreateFormProps) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
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

  useEnterToSubmit(inputRef, async () => {
    await handleSubmit(handleCommentSubmit)();
  });

  return (
    <form
      className={`${isCard ? 'fixed -bottom-1 start-0 end-0 mx-auto px-2 pb-5 bg-card' : 'fixed start-0 end-0 -bottom-0 max-w-lg mx-auto bg-background-light w-full border-t pb-4'}`}
      onSubmit={handleSubmit(handleCommentSubmit)}
    >
      <CommentInput
        {...registerContent}
        ref={e => {
          inputRef.current = e;
          ref(e);
        }}
        isLoading={isCreateCommentLoading}
        className="bg-muted"
      />
    </form>
  );
};

export default CommentCreateForm;
