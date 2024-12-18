import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const ChatSkeleton = ({ count }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count ?? 1 }).map((_, idx) => {
        return (
          <div key={idx} className="py-3 px-2">
            <div className="flex gap-x-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40 rounded-full" />
                <Skeleton className="h-4 w-24 rounded-full" />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ChatSkeleton;
