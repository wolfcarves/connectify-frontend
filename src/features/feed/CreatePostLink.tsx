import React from 'react';
import Typography from '@/components/ui/typography';
import Avatar from '@/components/common/Avatar/Avatar';

const CreatePostLink = () => {
  return (
    <div className="flex gap-3 my-5">
      <Avatar src="" size="lg" />
      <div className="bg-accent/50 min-h-10 w-full rounded-2xl p-4">
        <Typography.P title="What's on your mind?" color="muted" />
      </div>
    </div>
  );
};

export default CreatePostLink;
