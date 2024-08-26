'use client';

import PostCard from '@/components/modules/Post/PostCard';
import PostAction from '@/components/modules/Post/PostAction';
import type { Post, User as UserType } from '@/services';

interface PostProps {
  data?: {
    post: Post;
    user: UserType;
  };
}

const Post = ({ data }: PostProps) => {
  return (
    <PostCard key={data?.post.id}>
      <PostCard.User
        avatar={data?.user.avatar}
        name={data?.user.name}
        username={data?.user.username}
        timestamp={data?.post.created_at}
      />
      <PostCard.Content>{data?.post.content}</PostCard.Content>
      <PostAction>
        <PostAction.Like postId={data?.post.id} isLiked={data?.post.isLiked} />
        <PostAction.Comment href={`/post/${data?.post.uuid}`} />
        <PostAction.Share postId={data?.post.id} />
      </PostAction>
    </PostCard>
  );
};

export default Post;
