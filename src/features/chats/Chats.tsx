import Avatar from '@/components/common/Avatar/Avatar';
import Input from '@/components/common/Input';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import useGetChats from '@/hooks/queries/useGetChats';
import { Chat } from '@/services';
import { ComponentProps, MouseEvent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiDotsHorizontal } from 'react-icons/hi';
import { z } from 'zod';

interface ChatsProps {
  onMessageClick: (
    // eslint-disable-next-line no-unused-vars
    e: MouseEvent<HTMLDivElement>,
    // eslint-disable-next-line no-unused-vars
    userId: number,
    // eslint-disable-next-line no-unused-vars
    roomId: string,
  ) => void;
}

const schema = z.object({
  search: z.string(),
});

const Chats = ({ onMessageClick }: ChatsProps) => {
  const { data: chats } = useGetChats();

  const methods = useForm<z.infer<typeof schema>>();

  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <div className="p-2 space-y-4">
        <Typography.Span
          title="Messages"
          color="muted"
          className="uppercase"
          weight="medium"
          size="sm"
        />

        <div>
          <Input
            type="text"
            name="search"
            control={control}
            placeholder="Search friends or people"
          />
          {/* <input
            className="h-10 w-full rounded-full bg-muted/80 px-4 pb-0.5"
            placeholder="Search friends or people"
          /> */}
        </div>
      </div>

      {chats?.data?.map(chat => {
        return <ChatItem key={chat?.id} {...chat} />;
      })}
    </FormProvider>
  );
};

interface ChatItemProps extends Omit<ComponentProps<'div'>, 'id'>, Chat {}

const ChatItem = ({ id, avatar, name, content, ...props }: ChatItemProps) => {
  return (
    <div key={id} className="relative" {...props}>
      <div className="flex gap-x-2 text-start w-full hover:bg-muted/50 hover:cursor-pointer p-3">
        <Avatar src={avatar} size="lg" />
        <div className="flex flex-col">
          <Typography.Span title={name} weight="medium" />
          <Typography.Span
            title={content}
            className="line-clamp-3"
            size="sm"
            color="muted"
          />
        </div>
      </div>

      <Button
        variant="ghost"
        className="absolute right-5 top-0 bottom-0 my-auto rounded-full hover:bg-muted"
        icon={<HiDotsHorizontal size={20} className="text-foreground/90" />}
        size="icon"
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
};

export default Chats;
