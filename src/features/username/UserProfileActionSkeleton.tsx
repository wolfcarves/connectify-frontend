import { Skeleton } from '@/components/ui/skeleton';

const UserProfileActionSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="flex my-6 space-x-2">
        <Skeleton className="h-9 w-24 rounded-full" />
        <Skeleton className="h-9 w-24 rounded-full" />
      </div>
    </div>
  );
};

export default UserProfileActionSkeleton;
