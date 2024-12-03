'use client';

import React, { ComponentProps, forwardRef } from 'react';
import Avatar from '@/components/common/Avatar/Avatar';
import TextArea from '@/components/ui/textarea';

interface CommentInputProps extends ComponentProps<'textarea'> {
  avatar: string;
}

const ReplyInput = forwardRef<HTMLTextAreaElement, CommentInputProps>(
  ({ avatar, ...props }: CommentInputProps, ref) => {
    return (
      <div className="flex w-full ps-[17.1px] pb-2.5">
        <div className="h-6 w-7 border-b-2 border-l-2 rounded-bl-lg" />

        <div className="flex gap-x-2 mt-[0.5rem] w-full">
          <Avatar src={avatar} size="xs" />
          <TextArea ref={ref} placeholder="Post reply" {...props} />
        </div>
      </div>
    );
  },
);

ReplyInput.displayName = 'ReplyInput';

export default ReplyInput;
