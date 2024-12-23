'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';
import PostCard from '@/components/modules/Post/PostCard';
import PostAction from '@/components/modules/Post/PostAction';
import type { Audience, Post, User as UserType } from '@/services';
import PhotoGrid from '@/components/common/PhotoGrid/PhotoGrid';
import { getCldImageUrl } from 'next-cloudinary';
import { env } from '@/config/env';
import PostMenu from './PostMenu';

export const PostContext = createContext<{
  ctxValue: {
    audience: Audience | null;
  };
  setCtxValue: Dispatch<SetStateAction<{ audience: Audience | null }>>;
} | null>(null);

interface PostProps {
  data?: {
    post: Post;
    user: UserType;
  };
  modal?: boolean;
}

const Post = ({ data, modal }: PostProps) => {
  const [ctxValue, setCtxValue] = useState<{ audience: Audience | null }>({
    audience: data?.post.audience!,
  });

  const images = data?.post.images?.map(({ image }) => {
    return getCldImageUrl({
      src: `${env?.cloudinaryPostPublicID}/${data?.post.uuid}/${image}`,
    });
  });

  return (
    <PostContext.Provider value={{ ctxValue, setCtxValue }}>
      <PostCard key={data?.post.id} withBorder={!modal}>
        <PostCard.Header>
          <PostCard.User
            avatar={data?.user.avatar}
            name={data?.user.name}
            username={data?.user.username}
            timestamp={data?.post.created_at}
          />
          <PostMenu
            postId={data?.post.id}
            isPostSaved={data?.post.is_saved}
            username={data?.user.username}
            audience={ctxValue?.audience!}
          />
        </PostCard.Header>
        <>
          <PostCard.Content>{data?.post.content}</PostCard.Content>

          {!!images && (
            <div className="mt-2">
              <PhotoGrid images={images} />
            </div>
          )}
        </>
        <PostAction>
          <PostAction.Like
            postId={data?.post.id}
            isLiked={data?.post.is_liked}
          />
          <PostAction.Comment uuid={data?.post.uuid} />
          <PostAction.Share postId={data?.post.id} />
        </PostAction>
      </PostCard>
    </PostContext.Provider>
  );
};

export default Post;
