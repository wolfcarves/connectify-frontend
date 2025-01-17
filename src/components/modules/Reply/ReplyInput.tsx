'use client';

import React, {
  ComponentProps,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import Avatar from '@/components/common/Avatar/Avatar';
import TextArea from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { IoIosPaperPlane } from 'react-icons/io';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import useCreateReply from '@/hooks/mutations/useCreateReply';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useEnterToSubmit from '@/utils/useEnterToSubmit';

const schema = z.object({
  content: z
    .string({ required_error: 'Reply cannot be empty' })
    .min(1, 'Reply cannot be empty'),
});

export type ReplyInputSchema = z.infer<typeof schema>;

interface ReplyInputProps extends ComponentProps<'textarea'> {
  postId?: number;
  commentId: number;
}

const ReplyInput = forwardRef(
  ({ postId, commentId, ...props }: ReplyInputProps, ref) => {
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const { data: session } = useGetCurrentSession();

    const { handleSubmit, register, reset, setFocus } =
      useForm<ReplyInputSchema>({ resolver: zodResolver(schema) });

    const { mutateAsync: createReply, isPending: isCreateReplyLoading } =
      useCreateReply();

    const handleReplySubmit = async ({ content }: ReplyInputSchema) => {
      if (commentId) {
        const createdReply = await createReply({ postId, commentId, content });
        reset();
      }
    };

    const enterToSubmitCallback = async () => {
      await handleSubmit(handleReplySubmit)();
    };

    useEnterToSubmit(inputRef, enterToSubmitCallback);

    useImperativeHandle(ref, () => ({
      setFocus: () => setFocus('content'),
    }));

    const { ref: registerFormRef, ...registerForm } = register('content');

    return (
      <form onSubmit={handleSubmit(handleReplySubmit)}>
        <div className="flex w-full ps-[17.1px] pb-2.5">
          <div className="pe-1.5">
            <div className="h-6 w-7 border-b-2 border-l-2 rounded-bl-xl" />
          </div>

          <div className="flex gap-x-1.5 mt-[0.5rem] w-full">
            <div className="flex gap-x-2 w-full">
              <Avatar src={session?.avatar} size="xs" />
              <TextArea
                ref={e => {
                  inputRef.current = e;
                  registerFormRef(e);
                }}
                {...registerForm}
                placeholder="Post reply"
                {...props}
              />
            </div>

            <Button
              variant="secondary"
              size="sm"
              icon={<IoIosPaperPlane size={16} />}
              className="rounded-xl"
              isLoading={isCreateReplyLoading}
            />
          </div>
        </div>
      </form>
    );
  },
);

ReplyInput.displayName = 'ReplyInput';

export default ReplyInput;
