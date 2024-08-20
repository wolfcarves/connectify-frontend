import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const generateRandomWidth = (minWidth: number, maxWidth: number): number => {
  const width = Math.floor(
    Math.random() * (maxWidth - minWidth + 1) + minWidth,
  );

  return width;
};

const PostCardSkeleton = ({ count = 1 }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <article key={idx} className="rounded-md space-y-4 my-5">
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
              {Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="h-4"
                  style={{
                    width: '100%',
                    maxWidth: generateRandomWidth(150, 520),
                  }}
                />
              ))}
            </div>

            <div className="flex gap-2 items-center">
              <Skeleton key={idx} className="h-6 w-20" />
              <Skeleton key={idx} className="h-6 w-20" />
              <Skeleton key={idx} className="h-6 w-20" />
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default PostCardSkeleton;
