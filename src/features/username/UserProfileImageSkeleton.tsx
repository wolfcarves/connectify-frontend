import { Skeleton } from '@/components/ui/skeleton';

const UserProfileImageSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="relative w-28 h-28 border rounded-full overflow-hidden cursor-pointer bg-accent animate-pulse"></div>

      <div className="my-6 space-y-2">
        <Skeleton className="h-4 w-40 " />
        <Skeleton className="h-4 w-52" />
      </div>
    </div>
  );
};

export default UserProfileImageSkeleton;
