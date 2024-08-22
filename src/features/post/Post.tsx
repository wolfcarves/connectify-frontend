'use client';

import PostCard from '@/components/modules/Post/PostCard';
import CommentCard from '@/components/modules/Comment/CommentCard';
import PostContainer from '@/components/modules/Post/PostContainer';
import useGetUserPost from '@/hooks/queries/useGetUserPost';
import BackButton from '@/components/common/BackButton';
import useGetPostComments from '@/hooks/queries/useGetPostComments';
import User from '@/components/common/User';
import PostAction from '@/components/modules/Post/PostAction';

const Post = ({ postId }: { postId: number }) => {
  const { data: post, isPending: isPostLoading } = useGetUserPost(postId);
  const { data: comments } = useGetPostComments(postId);

  return (
    <>
      <div className="pb-4">
        <BackButton />
      </div>

      <PostContainer>
        <PostCard key={post?.post.id}>
          <User
            avatar={post?.user.avatar}
            name={post?.user.name}
            timestamp={post?.post.created_at}
          />
          <PostCard.Content>{post?.post.content}</PostCard.Content>
          <PostAction>
            <PostAction.Like postId={post?.post.id} />
            <PostAction.Comment postId={post?.post.id} />
            <PostAction.Share postId={post?.post.id} />
          </PostAction>
        </PostCard>
      </PostContainer>
    </>
  );
};

export default Post;
