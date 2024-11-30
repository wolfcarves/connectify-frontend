'use client';

import PostCard from '@/components/modules/Post/PostCard';
import PostAction from '@/components/modules/Post/PostAction';
import type { Post, User as UserType } from '@/services';
import PhotoGrid from '@/components/common/PhotoGrid/PhotoGrid';
import { getCldImageUrl } from 'next-cloudinary';
import { env } from '@/config/env';
import PostMenu from './PostMenu';

interface PostProps {
  data?: {
    post: Post;
    user: UserType;
  };
}

const Post = ({ data }: PostProps) => {
  const images = data?.post.images?.map(({ image }) => {
    return getCldImageUrl({
      src: `${env?.cloudinaryPostPublicID}/${data?.post.uuid}/${image}`,
    });
  });

  return (
    <PostCard key={data?.post.id}>
      <PostCard.Header>
        <PostCard.User
          avatar={data?.user.avatar}
          name={data?.user.name}
          username={data?.user.username}
          timestamp={data?.post.created_at}
        />
        <PostMenu
          postId={data?.post.id}
          isPostSaved={data?.post?.is_saved}
          username={data?.user.username}
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
        <PostAction.Like postId={data?.post.id} isLiked={data?.post.is_liked} />
        <PostAction.Comment href={`/post/${data?.post.uuid}`} />
        <PostAction.Share postId={data?.post.id} />
      </PostAction>
    </PostCard>
  );
};

export default Post;
