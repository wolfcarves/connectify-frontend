import FriendSkeleton from '@/components/modules/Friend/FriendSkeleton';
import Typography from '@/components/ui/typography';

const FriendListSkeleton = ({ title }: { title: string }) => {
  return (
    <div className="pb-10">
      <Typography.H4 title={title} className="my-5" weight="medium" />

      <div className="grid gap-4 xxs:grid-cols-2 sm:grid-cols-3 min-h-[10rem]">
        {Array.from({ length: 3 }).map((_, idx) => (
          <FriendSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
};

export default FriendListSkeleton;
