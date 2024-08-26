import { ComponentProps } from 'react';
import PostCardSkeleton from './PostCardSkeleton';

interface PostContainerProps extends ComponentProps<'div'> {
  isLoading?: boolean;
}

const PostContainer = ({
  children,
  className,
  isLoading,
  ...props
}: PostContainerProps) => {
  if (isLoading) return <PostCardSkeleton count={1} />;

  return (
    <>
      <div className={`space-y-5 ${className}`} {...props}>
        {children}
      </div>
    </>
  );
};

export default PostContainer;
