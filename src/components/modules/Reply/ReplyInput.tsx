'use client';

import React, { ComponentProps, forwardRef } from 'react';
import Avatar from '@/components/common/Avatar/Avatar';

interface CommentInputProps extends ComponentProps<'textarea'> {
  avatar: string;
}

const ReplyInput = forwardRef<HTMLTextAreaElement, CommentInputProps>(
  ({ avatar, ...props }: CommentInputProps, ref) => {
    return (
      <div className="flex w-full h-16 ps-[17.1px]">
        <div className="h-7 w-7 border-b-2 border-l-2 rounded-bl-lg" />
        <div className="flex gap-x-2 mt-[0.7rem] w-full">
          <Avatar src={avatar} size="xs" />

          <textarea
            className="bg-accent text-sm w-full min-h-2 rounded-2xl resize-none focus:outline-0 focus:ring-1 focus:ring-offset-4 focus:ring-border scroll-smooth scrollbar-thumb-foreground/10 scrollbar-track-foreground/0 scrollbar-thin p-2.5"
            placeholder="Post reply"
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  },
);

ReplyInput.displayName = 'ReplyInput';

export default ReplyInput;
