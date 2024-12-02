'use client';

import React, { ComponentProps, forwardRef } from 'react';
import useSession from '@/hooks/useSession';
import Avatar from '@/components/common/Avatar/Avatar';
import CenterContainer from '@/components/common/Container/CenterContainer';

type CommentInputProps = ComponentProps<'textarea'>;

const CommentInput = forwardRef<HTMLTextAreaElement, CommentInputProps>(
  (props: CommentInputProps, ref) => {
    const { avatar } = useSession();

    return (
      <CenterContainer className="flex gap-2.5 pt-2 pb-7">
        <Avatar src={avatar!} size="sm" />
        <textarea
          className="bg-accent text-sm w-full min-h-10 rounded-2xl resize-none focus:outline-0 focus:ring-1 focus:ring-offset-4 focus:ring-border scroll-smooth scrollbar-thumb-foreground/10 scrollbar-track-foreground/0 scrollbar-thin p-2.5"
          placeholder="Post comment"
          ref={ref}
          {...props}
        />
      </CenterContainer>
    );
  },
);

CommentInput.displayName = 'CommentInput';

export default CommentInput;
