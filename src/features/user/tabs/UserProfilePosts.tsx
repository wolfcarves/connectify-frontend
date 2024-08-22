'use client';

import User from '@/components/common/User';
import PostCard from '@/components/modules/Post/PostCard';
import PostAction from '@/components/modules/Post/PostAction';
import PostCardSkeleton from '@/components/modules/Post/PostCardSkeleton';
import PostContent from '@/components/modules/Post/PostContent';
import useGetAllUserPosts from '@/hooks/queries/useGetAllUserPosts';
import PostContainer from '@/components/modules/Post/PostContainer';
import useLikePost from '@/hooks/mutations/useLikePost';
import _ from 'lodash';

const UserProfilePosts = ({ userId }: { userId: number }) => {
  const { data: posts, isLoading: isPostsLoading } = useGetAllUserPosts(userId);
  const { mutateAsync: likePostMutate, isPending: isLikePostLoading } =
    useLikePost();

  const handleLikePost = _.debounce(async (postId: number) => {
    await likePostMutate(postId);
  }, 0);

  return (
    <PostContainer className="py-10">
      {isPostsLoading && <PostCardSkeleton count={10} />}

      {posts?.map(({ post, user }) => {
        return (
          <PostCard key={post.id}>
            <User
              avatar={user.avatar}
              name={user.name}
              timestamp={post.created_at}
            />
            <PostContent>{post.content}</PostContent>
            <PostAction>
              <PostAction.Like
                postId={post.id}
                isLike={post.isLiked}
                isLoading={isLikePostLoading}
                onClick={() => handleLikePost(post.id)}
              />
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
