import React, { forwardRef, useImperativeHandle } from 'react';
import useCreateReply from '@/hooks/mutations/useCreateReply';
import ReplyInput from '@/components/modules/Reply/ReplyInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { schema, type ReplyInput as ReplyInputSchema } from './schema';

interface ReplyCreateFormProps {
  postId?: number;
  commentId: number;
  avatar: string;
}

const ReplyCreateForm = forwardRef(
  ({ postId, commentId, avatar }: ReplyCreateFormProps, ref) => {
    const { handleSubmit, register, reset, setFocus } =
      useForm<ReplyInputSchema>({ resolver: zodResolver(schema) });

    const { mutateAsync: createReply, isPending: isCreateReplyLoading } =
      useCreateReply();

    const handleSubmitForm = async ({ content }: ReplyInputSchema) => {
      if (commentId) {
        await createReply({ postId, commentId, content });
        reset();
      }
    };

    useImperativeHandle(ref, () => ({
      setFocus: () => setFocus('content'),
    }));

    return (
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ReplyInput
          {...register('content')}
          avatar={avatar}
          isLoading={isCreateReplyLoading}
        />
      </form>
    );
  },
);

ReplyCreateForm.displayName = 'ReplyCreateForm';

export default ReplyCreateForm;
