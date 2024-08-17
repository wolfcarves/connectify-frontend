import Avatar from '@/components/common/Avatar/Avatar';
import Typography from '@/components/ui/typography';

const CommentCard = () => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex gap-3">
        <Avatar src="https://github.com/shadcn.png" />

        <div className="bg-card/40 rounded-2xl py-2 px-3">
          <Typography.Span title="Cazcade Wolf" size="sm" weight="medium" />

          <Typography.P
            title={`
            Lorem ipsum dolor sit amet
            Lorem ipsum dolor sit amet
            Lorem ipsum dolor sit amet
            Lorem ipsum dolor sit amet
            Lorem ipsum dolor sit amet
            `}
            className="w-full"
            size="base"
          />
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
