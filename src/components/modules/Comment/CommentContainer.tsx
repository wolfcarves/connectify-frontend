import { ComponentProps, ReactNode } from 'react';
import Typography from '@/components/ui/typography';
import CommentSkeleton from './CommentSkeleton';

interface CommentContainerProps extends ComponentProps<'div'> {
  postId?: number;
  children?: ReactNode;
  isLoading?: boolean;
  hasComment?: boolean;
}

const CommentContainer = ({
  postId,
  children,
  isLoading,
  hasComment,
  ...props
}: CommentContainerProps) => {
  return (
    <div className="pb-24 pe-2" {...props}>
      {!isLoading && (
        <Typography.H6
          title="Comments"
          size="sm"
          weight="medium"
          className="my-4"
        />
      )}

      {isLoading && (
        <div className="space-y-4 pb-2">
          <CommentSkeleton count={10} />
        </div>
      )}

      {hasComment && !isLoading ? (
        <div className={`${!postId ? 'mt-5' : 'mt-2'}`}>{children}</div>
      ) : !isLoading ? (
        <div className={`${!postId ? 'mt-5' : 'mt-2'} text-center`}>
          <Typography.Span title="Be the first to comment!" size="sm" />
        </div>
      ) : null}
    </div>
  );
};

export default CommentContainer;
