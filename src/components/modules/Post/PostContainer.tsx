import { ComponentProps } from 'react';
import PostCardSkeleton from './PostCardSkeleton';

interface PostContainerProps extends ComponentProps<'div'> {
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  skeletonCount?: number;
}

const PostContainer = ({
  children,
  className,
  isLoading,
  isFetchingNextPage,
  skeletonCount,
  ...props
}: PostContainerProps) => {
  if (isLoading) return <PostCardSkeleton count={skeletonCount} />;

  return (
    <div className={`space-y-3 sm:space-y-5 ${className}`} {...props}>
      {children}

      {isFetchingNextPage && (
        <div className="px-2">
          <PostCardSkeleton count={2} />
        </div>
      )}
    </div>
  );
};

export default PostContainer;
