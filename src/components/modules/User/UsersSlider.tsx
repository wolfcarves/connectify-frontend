import Avatar from '@/components/common/Avatar/Avatar';

const UsersSlider = () => {
  return (
    <div className="relative h-20 w-full">
      <div className="absolute flex gap-2 items-center h-20 rounded-xl max-w-full overflow-x-auto scrollbar-hidden">
        {Array.from({ length: 19 }).map((_, idx) => (
          <Avatar key={idx} src="" size="2xl" />
        ))}
      </div>
    </div>
  );
};

export default UsersSlider;
