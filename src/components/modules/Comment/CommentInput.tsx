'use client';

import React, { ComponentProps, forwardRef } from 'react';
import useSession from '@/hooks/useSession';
import Avatar from '@/components/common/Avatar/Avatar';
import CenterContainer from '@/components/common/Container/CenterContainer';
import TextArea from '@/components/ui/textarea';

type CommentInputProps = ComponentProps<'textarea'>;

const CommentInput = forwardRef<HTMLTextAreaElement, CommentInputProps>(
  (props: CommentInputProps, ref) => {
    const { avatar } = useSession();

    return (
      <CenterContainer className="flex gap-2.5 pt-2 pb-7">
        <Avatar src={avatar!} size="sm" />
        <TextArea ref={ref} placeholder="Post comment" {...props} />
      </CenterContainer>
    );
  },
);

CommentInput.displayName = 'CommentInput';

export default CommentInput;
