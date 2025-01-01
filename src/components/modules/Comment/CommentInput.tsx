'use client';

import React, { useRef } from 'react';
import useCreateComment from '@/hooks/mutations/useCreateComment';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import errorHandler from '@/utils/errorHandler';
import useEnterToSubmit from '@/utils/useEnterToSubmit';
import Avatar from '@/components/common/Avatar/Avatar';
import TextArea from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { IoIosPaperPlane } from 'react-icons/io';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';

const schema = z.object({
  content: z
    .string()
    .min(1, 'Please add comment')
    .max(300, 'Comment is too long'),
});

type CommentSchema = z.infer<typeof schema>;

interface CommentInputProps {
  postId: number;
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (commentId: number, value: string) => void;
  // eslint-disable-next-line no-unused-vars
  onLoad?: (status: boolean) => void;
  modal?: boolean;
}

const CommentInput = ({
  postId,
  onSubmit,
  modal = false,
}: CommentInputProps) => {
  const { data: session } = useGetCurrentSession();

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const methods = useForm<CommentSchema>({});
  const { handleSubmit, register, setError, reset } = methods;

  const { mutateAsync: createComment, isPending: isCreateCommentLoading } =
    useCreateComment();

  const enterToSubmitCallback = async () => {
    await handleSubmit(handleCommentSubmit)();
  };

  useEnterToSubmit(inputRef, enterToSubmitCallback);

  const handleCommentSubmit = async ({ content }: CommentSchema) => {
    try {
      const requestData = {
        postId,
        content: content,
      };

      const createdComment = await createComment(requestData);
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
      className={`${modal ? '' : 'fixed start-0 end-0 -bottom-0 max-w-xl mx-auto bg-background-light w-full pb-4'}`}
      onSubmit={handleSubmit(handleCommentSubmit)}
    >
      <div className="flex gap-2.5 pt-2 pe-2 w-full">
        <Avatar src={session?.avatar!} size="sm" />

        <TextArea
          {...registerContent}
          rows={2}
          ref={e => {
            inputRef.current = e;
            ref(e);
          }}
          placeholder="Post comment"
          className="bg-muted"
        />
        <Button
          variant="secondary"
          size="sm"
          isLoading={isCreateCommentLoading}
          icon={<IoIosPaperPlane size={16} />}
          className="rounded-xl"
        />
      </div>
    </form>
  );
};

export default CommentInput;
