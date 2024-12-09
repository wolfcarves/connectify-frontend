import React, { memo, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { generateRandomWidth } from '@/utils/generateRandomWidth';

const PostCardSkeleton = ({ count = 1 }: { count?: number }) => {
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
          <article
            key={idx}
            className="rounded-2xl space-y-4 my-5 bg-muted/20 p-5"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="min-w-11 w-11 min-h-11 h-11 rounded-full" />

                <div className="space-y-2">
                  <Skeleton
                    className="h-4"
                    style={{
                      width: generateRandomWidth(120, 250),
                    }}
                  />
                  <Skeleton
                    className="h-4"
                    style={{
                      width: generateRandomWidth(120, 250),
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2 pt-5">
                {Array.from({ length: 3 }).map((_, iidx) => (
                  <Skeleton
                    key={iidx}
                    className="h-4"
                    style={{
                      width: '100%',
                      maxWidth: generateRandomWidth(150, 520),
                    }}
                  />
                ))}
              </div>

              <div className="flex gap-2 items-center">
                <Skeleton className="flex flex-1 h-6" />
                <Skeleton className="flex flex-1 h-6" />
                <Skeleton className="flex flex-1 h-6" />
              </div>
            </div>
          </article>
        ))}
      </>
    );
};

export default memo(PostCardSkeleton);
