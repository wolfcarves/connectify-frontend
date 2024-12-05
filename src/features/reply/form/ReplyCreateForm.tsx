import useCreateReply from '@/hooks/mutations/useCreateReply';
import ReplyInput from '@/components/modules/Reply/ReplyInput';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { schema, type ReplyInput as ReplyInputSchema } from './schema';

interface ReplyCreateFormProps {
  commentId: number;
  avatar: string;
}

const ReplyCreateForm = ({ commentId, avatar }: ReplyCreateFormProps) => {
  const { handleSubmit, register, reset } = useForm<ReplyInputSchema>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: createReply, isPending: isCreateReplyLoading } =
    useCreateReply();

  const handleSubmitForm = async ({ reply }: ReplyInputSchema) => {
    if (commentId) {
      await createReply({ commentId, reply });
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <ReplyInput
        {...register('reply')}
        avatar={avatar}
        isLoading={isCreateReplyLoading}
      />
    </form>
  );
};

export default ReplyCreateForm;
