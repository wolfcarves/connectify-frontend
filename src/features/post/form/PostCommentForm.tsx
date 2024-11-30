'use client';

import React, { useRef } from 'react';
import useSession from '@/hooks/useSession';
import Avatar from '@/components/common/Avatar/Avatar';
import CenterContainer from '@/components/common/Container/CenterContainer';
import useCreatePostComment from '@/hooks/mutations/useCreatePostComment';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import errorHandler from '@/utils/errorHandler';

const schema = z.object({
  content: z
    .string()
    .min(1, 'Please add comment')
    .max(300, 'Comment is too long'),
});

type CommentSchema = z.infer<typeof schema>;

const PostCommentForm = ({ postId }: { postId?: number }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const methods = useForm<CommentSchema>({});
  const { avatar } = useSession();
  const { handleSubmit, register, setError } = methods;

  const { mutateAsync: createCommentMutate } = useCreatePostComment();

  const handleCommentSubmit = async (data: CommentSchema) => {
    try {
      const requestData = {
        postId,
        comment: data?.content,
      };

      await createCommentMutate(requestData);
    } catch (error: unknown) {
      //
      errorHandler(error, schema, setError);
    }
  };

  const { ref, ...registerContent } = register('content');

  return (
    <form
      className="w-full start-0 bottom-0 bg-background"
      onSubmit={handleSubmit(handleCommentSubmit)}
    >
      <CenterContainer className="flex gap-2.5 pt-2 pb-7">
        <Avatar src={avatar!} size="sm" />

        <textarea
          className="bg-accent text-sm w-full min-h-10 rounded-2xl resize-none focus:outline-0 focus:ring-1 focus:ring-offset-4 focus:ring-border scroll-smooth scrollbar-thumb-foreground/10 scrollbar-track-foreground/0 scrollbar-thin p-2.5"
          placeholder="Post comment"
          {...registerContent}
          ref={e => {
            ref(e);
            textareaRef.current = e;
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit(handleCommentSubmit)();
              textareaRef.current!.value = '';
            }
          }}
        />
      </CenterContainer>
    </form>
  );
};

export default PostCommentForm;
