'use client';

import React, { ComponentProps, forwardRef } from 'react';
import Avatar from '@/components/common/Avatar/Avatar';
import TextArea from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { IoIosPaperPlane } from 'react-icons/io';
import useSession from '@/hooks/useSession';
interface ReplyInputProps extends ComponentProps<'textarea'> {
  isLoading: boolean;
}

const ReplyInput = forwardRef<HTMLTextAreaElement, ReplyInputProps>(
  ({ isLoading, ...props }: ReplyInputProps, ref) => {
    const { avatar } = useSession();

    return (
      <div className="flex w-full ps-[17.1px] pb-2.5">
        <div className="pe-1.5">
          <div className="h-6 w-7 border-b-2 border-l-2 rounded-bl-xl" />
        </div>

        <div className="flex gap-x-1.5 mt-[0.5rem] w-full">
          <div className="flex gap-x-2 w-full">
            <Avatar src={avatar} size="xs" />
            <TextArea ref={ref} placeholder="Post reply" {...props} />
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={<IoIosPaperPlane size={16} />}
            className="rounded-xl"
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  },
);

ReplyInput.displayName = 'ReplyInput';

export default ReplyInput;
