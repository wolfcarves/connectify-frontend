import Avatar from '@/components/common/Avatar/Avatar';
import Typography from '@/components/ui/typography';

const ChatList = () => {
  return (
    <div className="h-[calc(100vh-100px)] overflow-y-auto scrollbar-hidden pb-10">
      <Typography.H4 title="Chats" weight="medium" className="my-5" />

      {Array.from({ length: 10 }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-xl hover:bg-muted/50 cursor-pointer py-2 px-1"
        >
          <div className="flex items-center gap-2.5">
            <Avatar src={''} size={'xl'} />

            <div className="flex flex-col">
              <Typography.Span title={'Cazcade malupet'} weight="semibold" />
              <Typography.Span title={`Hello po`} size="sm" color="muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
