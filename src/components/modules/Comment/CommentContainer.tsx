import React, { ReactNode } from 'react';
import Typography from '@/components/ui/typography';

const CommentContainer = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="border-t">
      <Typography.H6
        title="Comments"
        size="sm"
        weight="medium"
        className="my-4"
      />

      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default CommentContainer;
