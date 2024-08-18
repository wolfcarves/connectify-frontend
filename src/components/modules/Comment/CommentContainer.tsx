import { ComponentProps, ReactNode } from 'react';
import Typography from '@/components/ui/typography';
import Link from 'next/link';

interface CommentContainerProps extends ComponentProps<'div'> {
  postId?: number;
  children?: ReactNode;
  hasComments?: boolean;
}

const CommentContainer = ({
  postId,
  children,
  hasComments,
  ...props
}: CommentContainerProps) => {
  return (
    <div className="border-t" {...props}>
      {hasComments && (
        <Link href={`/post/${postId}`}>
          <Typography.H6
            title="Read other comments"
            size="sm"
            weight="medium"
            className="my-4 hover:underline underline-offset-2"
          />
        </Link>
      )}

      {/* <Typography.H6
        title="Comments"
        size="sm"
        weight="medium"
        className="my-4"
      /> */}

      <div className={`${!postId ? 'mt-5' : 'mt-2'} space-y-4`}>{children}</div>
    </div>
  );
};

export default CommentContainer;
