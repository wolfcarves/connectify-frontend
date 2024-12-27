'use client';

import {
  createContext,
  Dispatch,
  memo,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import PostCard from '@/components/modules/Post/PostCard';
import PostAction from '@/components/modules/Post/PostAction';
import type { Audience, Post, User as UserType } from '@/services';
import PhotoGrid from '@/components/common/PhotoGrid/PhotoGrid';
import { getCldImageUrl } from 'next-cloudinary';
import { env } from '@/config/env';
import PostMenu from './PostMenu';
import convertEngagementCount from '@/utils/convertEngagementCount';

export const PostContext = createContext<{
  ctxValue: {
    audience: Audience | null;
  };
  setCtxValue: Dispatch<SetStateAction<{ audience: Audience | null }>>;
  modal: boolean;
} | null>(null);

interface PostProps {
  data: {
    post: Post;
    user: UserType;
  };
  modal?: boolean;
}

const Post = ({ data, modal = false }: PostProps) => {
  const [ctxValue, setCtxValue] = useState<{ audience: Audience | null }>({
    audience: data?.post.audience!,
  });

  const images = useMemo(
    () =>
      data?.post.images?.map(({ image }) => {
        return getCldImageUrl({
          src: `${env?.cloudinaryPostPublicID}/${data?.post.uuid}/${image}`,
        });
      }),
    [data],
  );

  return (
    <PostContext.Provider value={{ ctxValue, setCtxValue, modal }}>
      <PostCard key={data.post.id} withBorder={!modal}>
        <PostCard.Header>
          <PostCard.User
            avatar={data.user.avatar}
            name={data.user.name}
            username={data.user.username}
            timestamp={data.post.created_at}
          />
          <PostMenu
            postId={data.post.id}
            isPostSaved={data.post.is_saved}
            username={data.user.username}
            audience={ctxValue?.audience!}
          />
        </PostCard.Header>

        <>
          <PostCard.Content>{data.post.content}</PostCard.Content>
          {!!images && <PhotoGrid images={images} />}
        </>

        <PostAction>
          <PostAction.Like
            postId={data?.post.id}
            username={data?.user.username}
            uuid={data?.post.uuid}
            isLiked={data?.post.is_liked}
            likesCount={convertEngagementCount(data?.post.likes_count)}
          />
          <PostAction.Comment
            uuid={data?.post.uuid}
            commentsCount={convertEngagementCount(data?.post.comments_count)}
          />
          <PostAction.Share postId={data?.post.id} />
        </PostAction>
      </PostCard>
    </PostContext.Provider>
  );
};

export default memo(Post);
