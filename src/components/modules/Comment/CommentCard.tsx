import type { ReactNode } from 'react';
import Typography from '@/components/ui/typography';

const CommentCard = ({ children }: { children?: ReactNode }) => {
  return (
    <article className="space-y-5 my-5 px-3 py-4">
      <div className="flex gap-2">{children}</div>
    </article>
  );
};

export const Content = ({
  username,
  comment,
}: {
  username?: string;
  comment?: string;
}) => {
  return (
    <div className="bg-accent min-h-10 rounded-2xl resize-none focus:outline-0 focus:ring-1 focus:ring-offset-4 focus:ring-border scroll-smooth scrollbar-thumb-foreground/10 scrollbar-track-foreground/0 scrollbar-thin px-3 pt-1.5 pb-2">
      <Typography.Span title={username} size="sm" weight="semibold" />
      <Typography.P title={comment} size="sm" />
    </div>
  );
};

CommentCard.Content = Content;

export default CommentCard;
