import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineMessage,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import { ButtonProps } from '@/components/ui/button';

const PostAction = ({ children }: { children?: ReactNode }) => {
  return <div className="space-x-2">{children}</div>;
};

interface LikeButtonProps extends ButtonProps {
  postId?: number;
  isLike?: boolean;
  isLoading?: boolean;
  likes?: number;
}

export const LikeButton = ({
  postId,
  isLike,
  isLoading,
  likes = 0,
  ...props
}: LikeButtonProps) => {
  return (
    <Button variant="ghost" size="sm" {...props}>
      {isLike ? (
        <AiFillLike className="text-lg me-1 text-primary" />
      ) : (
        <AiOutlineLike className="text-lg me-1" />
      )}
      Like
    </Button>
  );
};

interface CommentButtonProps {
  postId?: number;
  comments?: number;
}

export const CommentButton = ({ postId, comments = 0 }: CommentButtonProps) => {
  return (
    <Link href={`/post/${postId}`}>
      <Button variant="ghost" size="sm">
        <AiOutlineMessage className="text-lg me-1" />
        Comment
      </Button>
    </Link>
  );
};

interface ShareButtonProps {
  postId?: number;
  shares?: number;
}

export const ShareButton = ({ postId, shares = 0 }: ShareButtonProps) => {
  return (
    <Button variant="ghost" size="sm">
      <AiOutlineShareAlt className="text-lg me-1" />
      Share
    </Button>
  );
};

PostAction.Like = LikeButton;
PostAction.Comment = CommentButton;
PostAction.Share = ShareButton;

export default PostAction;
