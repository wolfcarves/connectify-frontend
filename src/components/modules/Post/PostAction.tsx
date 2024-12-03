import { ReactNode, useEffect, useState } from 'react';
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
import Typography from '@/components/ui/typography';

const PostAction = ({ children }: { children?: ReactNode }) => {
  return <div className="flex">{children}</div>;
};

interface LikeButtonProps extends ButtonProps {
  postId?: number;
  isLiked?: boolean;
  likes?: number;
}

export const LikeButton = ({
  postId,
  isLiked: isCurrentlyLiked,
  likes = 0,
  ...props
}: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState<boolean | undefined>(isCurrentlyLiked);

  const { mutateAsync: likePostMutate, isPending: isLikePostLoading } =
    useLikePost();

  useEffect(() => {
    setIsLiked(isCurrentlyLiked);
  }, [isCurrentlyLiked]);

  const handleLikePost = async (post_id: number) => {
    try {
      await likePostMutate(post_id);
      setIsLiked(prev => !prev);
    } catch (error) {
      //
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleLikePost(postId!)}
      className="flex-1"
      {...props}
    >
      {isLiked ? (
        <AiFillLike className="text-lg text-primary" />
      ) : (
        <AiOutlineLike className="text-lg" />
      )}

      <div className="w-6">
        {isLikePostLoading ? (
          <Spinner className="animate-spin" />
        ) : (
          <Typography.Span
            title="Like"
            weight="medium"
            className="text-sm sm:text-base mt-0.5"
          />
        )}
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
    <Button variant="ghost" size="sm" className="flex-1" onClick={handlePush}>
      <AiOutlineMessage className="text-lg me-0" />
      <Typography.Span
        title="Comment"
        weight="medium"
        className="text-sm sm:text-base mt-0.5"
      />
    </Button>
  );
};

interface ShareButtonProps {
  postId?: number;
  shares?: number;
}

export const ShareButton = ({ postId, shares = 0 }: ShareButtonProps) => {
  return (
    <Button variant="ghost" size="sm" className="flex-1">
      <AiOutlineShareAlt className="text-lg" />
      <Typography.Span
        title="Share"
        weight="medium"
        className="text-sm sm:text-base mt-0.5"
      />
    </Button>
  );
};

PostAction.Like = LikeButton;
PostAction.Comment = CommentButton;
PostAction.Share = ShareButton;

export default PostAction;
