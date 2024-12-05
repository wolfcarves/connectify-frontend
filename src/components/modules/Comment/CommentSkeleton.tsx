import React, { memo, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { generateRandomWidth } from '@/utils/generateRandomWidth';

const CommentSkeleton = ({ count = 1 }: { count?: number }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 10);

    return () => clearTimeout(timeout);
  }, []);

  if (isMounted)
    return (
      <>
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="flex gap-2">
            <div className="min-w-9 w-9 min-h-9 h-9 bg-accent rounded-full" />

            <Skeleton
              className="bg-accent w-full min-h-16 rounded-2xl p-2.5"
              style={{
                maxWidth: generateRandomWidth(120, 468),
              }}
            />
          </div>
        ))}
      </>
    );
};

export default memo(CommentSkeleton);
