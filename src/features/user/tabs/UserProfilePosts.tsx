'use client';

import User from '@/components/common/User';
import PostCard from '@/components/modules/Post/PostCard';
import PostAction from '@/components/modules/Post/PostAction';
import PostCardSkeleton from '@/components/modules/Post/PostCardSkeleton';
import useGetAllUserPosts from '@/hooks/queries/useGetAllUserPosts';
import PostContainer from '@/components/modules/Post/PostContainer';
import _ from 'lodash';

const UserProfilePosts = ({ username }: { username: string }) => {
  const { data: posts, isLoading: isPostsLoading } =
    useGetAllUserPosts(username);

  return (
    <PostContainer className="py-10">
      {isPostsLoading && <PostCardSkeleton count={10} />}

      {posts?.map(({ post, user }) => {
        return (
          <PostCard key={post.id}>
            <PostCard.User
              avatar={user.avatar}
              name={user.name}
              timestamp={post.created_at}
            />
            <PostCard.Content>{post.content}</PostCard.Content>
            <PostAction>
              <PostAction.Like postId={post.id} isLike={post.isLiked} />
              <PostAction.Comment postId={post.id} />
              <PostAction.Share postId={post.id} />
            </PostAction>
          </PostCard>
        );
      })}
    </PostContainer>
  );
};

export default UserProfilePosts;
