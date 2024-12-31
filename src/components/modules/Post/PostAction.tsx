/* eslint-disable react-hooks/exhaustive-deps */

import React, { ReactNode, useCallback, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { PiHeartBold, PiHeartFill } from 'react-icons/pi';
import { PiShareFat } from 'react-icons/pi';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { ButtonProps } from '@/components/ui/button';
import { Spinner } from '@phosphor-icons/react';
import useLikePost from '@/hooks/mutations/useLikePost';
import Typography from '@/components/ui/typography';
import PostModal from '@/components/modules/Post/PostModal';
import { PostContext } from './Post';
import { useQueryClient } from '@tanstack/react-query';
import { GET_USER_POST_KEY } from '@/hooks/queries/useGetUserPost';

const PostAction = ({ children }: { children?: ReactNode }) => {
  return <div className="flex border-t pt-1 pb-0">{children}</div>;
};

interface LikeButtonProps extends ButtonProps {
  postId: number;
  username: string;
  uuid: string;
  isLiked: boolean;
  likesCount?: string;
}

export const LikeButton = ({
  postId,
  username,
  uuid,
  isLiked: isAlreadyLike,
  likesCount,
  ...props
}: LikeButtonProps) => {
  const queryClient = useQueryClient();
  const ctxValue = useContext(PostContext);

  const { mutateAsync: likePostMutate, isPending: isLikePostLoading } =
    useLikePost();

  const handleLikePost = useCallback(async (postId: number) => {
    try {
      await likePostMutate({ postId, username, uuid });

      if (ctxValue?.modal) {
        await queryClient.invalidateQueries({
          queryKey: [GET_USER_POST_KEY(), uuid],
        });
      }
    } catch (error) {
      //
    }
  }, []);

  return (
    <Button
      variant="opacity"
      size="xs"
      onClick={() => handleLikePost(postId!)}
      className="select-none"
      {...props}
    >
      {isAlreadyLike ? (
        <PiHeartFill className="text-lg text-primary" />
      ) : (
        <PiHeartBold
          className={`text-lg text-muted ${isAlreadyLike ? 'text-primary' : 'text-muted'}`}
        />
      )}

      <>
        {isLikePostLoading ? (
          <Spinner className="animate-spin" />
        ) : (
          <div className="flex items-center">
            <Typography.Span
              title={`${likesCount && Number(likesCount) !== 0 ? likesCount : 0} Like`}
              weight="medium"
              className={`text-sm sm:text-base mt-0.5`}
              color={isAlreadyLike ? 'primary' : 'muted'}
            />
          </div>
        )}
      </>
    </Button>
  );
};

interface CommentButtonProps {
  uuid?: string;
  commentsCount?: string;
}

export const CommentButton = ({ uuid, commentsCount }: CommentButtonProps) => {
  const postCtx = useContext(PostContext);
  const modal = postCtx?.modal;

  if (modal)
    return (
      <Button variant="opacity" size="xs">
        <IoChatbubblesOutline className="text-lg text-muted me-0" />

        <Typography.Span
          title={`${commentsCount} Comment`}
          weight="medium"
          color="muted"
          className="text-sm sm:text-base mt-0.5"
        />
      </Button>
    );

  return (
    <PostModal
      uuid={uuid!}
      trigger={
        <Button variant="opacity" size="xs">
          <IoChatbubblesOutline className="text-lg text-muted me-0" />

          <Typography.Span
            title={`${commentsCount} Comment`}
            weight="medium"
            color="muted"
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
    <Button variant="opacity" size="xs">
      <PiShareFat className="text-lg text-muted" />
      <Typography.Span
        title="Share"
        weight="medium"
        className="text-sm sm:text-base mt-0.5"
        color="muted"
      />
    </Button>
  );
};

PostAction.Like = LikeButton;
PostAction.Comment = CommentButton;
PostAction.Share = ShareButton;

export default PostAction;
