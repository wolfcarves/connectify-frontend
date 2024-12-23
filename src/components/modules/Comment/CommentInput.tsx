'use client';

import React, { ComponentProps, forwardRef } from 'react';
import useSession from '@/hooks/useSession';
import Avatar from '@/components/common/Avatar/Avatar';
import CenterContainer from '@/containers/CenterContainer';
import TextArea from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { IoIosPaperPlane } from 'react-icons/io';

interface CommentInputProps extends ComponentProps<'textarea'> {
  isLoading?: boolean;
}

const CommentInput = forwardRef<HTMLTextAreaElement, CommentInputProps>(
  ({ isLoading, ...props }: CommentInputProps, ref) => {
    const { avatar } = useSession();

    return (
      <div className="flex gap-2.5 pt-2 pe-2 w-full">
        <Avatar src={avatar!} size="sm" />
        <TextArea
          rows={2}
          ref={ref}
          placeholder="Post comment"
          className="bg-background-light"
          {...props}
        />
        <Button
          variant="secondary"
          size="sm"
          isLoading={isLoading}
          icon={<IoIosPaperPlane size={16} />}
          className="rounded-xl"
        />
      </div>
    );
  },
);

CommentInput.displayName = 'CommentInput';

export default CommentInput;
