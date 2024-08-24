import { ComponentProps } from 'react';

interface PostContainerProps extends ComponentProps<'div'> {}

const PostContainer = ({
  children,
  className,
  ...props
}: PostContainerProps) => {
  return (
    <>
      <div className={`space-y-14 ${className}`} {...props}>
        {children}
      </div>
    </>
  );
};

export default PostContainer;
