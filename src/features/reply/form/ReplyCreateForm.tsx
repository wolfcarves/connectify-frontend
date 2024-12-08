import useCreateReply from '@/hooks/mutations/useCreateReply';
import ReplyInput from '@/components/modules/Reply/ReplyInput';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { schema, type ReplyInput as ReplyInputSchema } from './schema';

interface ReplyCreateFormProps {
  postId?: number;
  commentId: number;
  avatar: string;
}

const ReplyCreateForm = ({
  postId,
  commentId,
  avatar,
}: ReplyCreateFormProps) => {
  const { handleSubmit, register, reset } = useForm<ReplyInputSchema>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: createReply, isPending: isCreateReplyLoading } =
    useCreateReply();

  const handleSubmitForm = async ({ content }: ReplyInputSchema) => {
    if (commentId) {
      await createReply({ postId, commentId, content });
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <ReplyInput
        {...register('content')}
        avatar={avatar}
        isLoading={isCreateReplyLoading}
      />
    </form>
  );
};

export default ReplyCreateForm;
