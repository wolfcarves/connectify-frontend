import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineMessage,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import { ButtonProps } from '@/components/ui/button';
import { Spinner } from '@phosphor-icons/react';
import useLikePost from '@/hooks/mutations/useLikePost';
import { useRouter } from 'next/navigation';

const PostAction = ({ children }: { children?: ReactNode }) => {
  return <div className="space-x-2">{children}</div>;
};

interface LikeButtonProps extends ButtonProps {
  postId?: number;
  isLiked?: boolean;
  likes?: number;
}

export const LikeButton = ({
  postId,
  isLiked,
  likes = 0,
  ...props
}: LikeButtonProps) => {
  const { mutateAsync: likePostMutate, isPending: isLikePostLoading } =
    useLikePost();

  const handleLikePost = async (post_id: number) => {
    try {
      await likePostMutate(post_id);
    } catch (error) {
      //
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleLikePost(postId!)}
      {...props}
    >
      {isLiked ? (
        <AiFillLike className="text-lg me-1 text-primary" />
      ) : (
        <AiOutlineLike className="text-lg me-1" />
      )}

      <div className="w-6">
        {isLikePostLoading ? <Spinner className="animate-spin" /> : 'Like'}
      </div>
    </Button>
  );
};

interface CommentButtonProps {
  href?: string;
  comments?: number;
}

export const CommentButton = ({ href, comments = 0 }: CommentButtonProps) => {
  const router = useRouter();
  const handlePush = () => href && router.push(href);

  return (
    <Button variant="ghost" size="sm" onClick={handlePush}>
      <AiOutlineMessage className="text-lg me-1" />
      Comment
    </Button>
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
