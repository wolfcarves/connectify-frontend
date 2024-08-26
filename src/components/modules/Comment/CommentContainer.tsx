import { ComponentProps, ReactNode } from 'react';
import Typography from '@/components/ui/typography';
import CommentSkeleton from './CommentSkeleton';

interface CommentContainerProps extends ComponentProps<'div'> {
  postId?: number;
  children?: ReactNode;
  isLoading?: boolean;
}

const CommentContainer = ({
  postId,
  children,
  isLoading,
  ...props
}: CommentContainerProps) => {
  if (isLoading) return <CommentSkeleton count={10} />;

  return (
    <div className="pb-32" {...props}>
      <Typography.H6
        title="Comments"
        size="sm"
        weight="medium"
        className="my-4"
      />

      <div className={`${!postId ? 'mt-5' : 'mt-2'} space-y-4`}>{children}</div>
    </div>
  );
};

export default CommentContainer;
