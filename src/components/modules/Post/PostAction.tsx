/* eslint-disable react-hooks/exhaustive-deps */

import { ReactNode, useContext, useEffect, useState } from 'react';
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
import Typography from '@/components/ui/typography';
import PostModal from '@/components/modules/Post/PostModal';
import { PostContext } from './Post';
import { useQueryClient } from '@tanstack/react-query';
import { GET_USER_POST_KEY } from '@/hooks/queries/useGetUserPost';

const PostAction = ({ children }: { children?: ReactNode }) => {
  return <div className="flex">{children}</div>;
};

interface LikeButtonProps extends ButtonProps {
  postId: number;
  username: string;
  uuid: string;
  isLiked: boolean;
  likes?: number;
}

export const LikeButton = ({
  postId,
  username,
  uuid,
  isLiked: isAlreadyLike,
  likes = 0,
  ...props
}: LikeButtonProps) => {
  const queryClient = useQueryClient();
  const ctxValue = useContext(PostContext);

  const { mutateAsync: likePostMutate, isPending: isLikePostLoading } =
    useLikePost();

  const handleLikePost = async (postId: number) => {
    try {
      await likePostMutate({ postId, username });

      if (ctxValue?.modal) {
        await queryClient.invalidateQueries({
          queryKey: [GET_USER_POST_KEY(), uuid],
        });
      }
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
      {isAlreadyLike ? (
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
  uuid?: string;
  comments?: number;
}

export const CommentButton = ({ uuid, comments = 0 }: CommentButtonProps) => {
  const postCtx = useContext(PostContext);
  const modal = postCtx?.modal;

  if (modal)
    return (
      <Button variant="ghost" size="sm" className="flex-1">
        <AiOutlineMessage className="text-lg me-0" />
        <Typography.Span
          title="Comment"
          weight="medium"
          className="text-sm sm:text-base mt-0.5"
        />
      </Button>
    );

  return (
    <PostModal
      uuid={uuid!}
      trigger={
        <Button variant="ghost" size="sm" className="w-full">
          <AiOutlineMessage className="text-lg me-0" />
          <Typography.Span
            title="Comment"
            weight="medium"
            className="text-sm sm:text-base mt-0.5"
          />
        </Button>
      }
    />
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
