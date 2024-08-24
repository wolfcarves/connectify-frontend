'use client';

import React from 'react';
import useSession from '@/hooks/useSession';
import Avatar from '@/components/common/Avatar/Avatar';
import CenterContainer from '@/components/common/Container/CenterContainer';

const PostCommentForm = ({ uuid }: { uuid: string }) => {
  const { avatar } = useSession();

  return (
    <div className="fixed w-full start-0 bottom-0 bg-background">
      <CenterContainer className="flex gap-2.5 pt-2 pb-7">
        <Avatar src={avatar!} size="sm" />

        <textarea
          className="bg-accent text-sm w-full min-h-10 rounded-2xl resize-none focus:outline-0 focus:ring-1 focus:ring-offset-4 focus:ring-border scroll-smooth scrollbar-thumb-foreground/10 scrollbar-track-foreground/0 scrollbar-thin p-2.5"
          placeholder="Post comment"
        />
      </CenterContainer>
    </div>
  );
};

export default PostCommentForm;
