import React, { ComponentProps } from 'react';
import Avatar from '@/components/common/Avatar/Avatar';
import Typography from '@/components/ui/typography';

interface ChatCardProps extends ComponentProps<'button'> {
  onClick?: () => void;
}

const ChatCard = ({ onClick, ...props }: ChatCardProps) => {
  return (
    <button
      type="button"
      className="relative w-full hover:bg-muted/30 p-3"
      onClick={onClick}
      {...props}
    />
  );
};

interface ChatCardContentProps {
  avatar: string;
  name: string;
  content?: string;
}

const ChatCardContent = ({ avatar, name, content }: ChatCardContentProps) => {
  return (
    <div className="flex gap-x-2.5">
      <Avatar src={avatar} size="lg" />

      <div className="flex flex-col text-start">
        <Typography.Span title={name} className="line-clamp-1 my-auto" />

        {content && (
          <Typography.Span
            title={content}
            color="muted"
            size="sm"
            className="line-clamp-1"
          />
        )}
      </div>
    </div>
  );
};

// const ChatCardMenuDropdown = () => {
//   return (
//     <Button
//       variant="ghost"
//       className="absolute right-5 top-0 bottom-0 my-auto rounded-full hover:bg-red-500 z-50"
//       icon={<HiDotsHorizontal size={20} className="text-foreground/90" />}
//       size="icon"
//       onClick={e => e.stopPropagation()}
//     />
//   );
// };

ChatCard.Content = ChatCardContent;

export default ChatCard;
