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
  if (isLoading)
    return (
      <div className="space-y-4">
        <CommentSkeleton count={10} />
      </div>
    );

  return (
    <div className="pb-32 px-3" {...props}>
      <Typography.H6
        title="Comments"
        size="sm"
        weight="medium"
        className="my-4"
      />

      <div className={`${!postId ? 'mt-5' : 'mt-2'}`}>{children}</div>
    </div>
  );
};

export default CommentContainer;
