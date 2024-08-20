'use client';

import PostCard from '@/components/modules/Post/PostCard';
import CommentCard from '@/components/modules/Comment/CommentCard';
import PostContainer from '@/components/modules/Post/PostContainer';
import useGetUserPost from '@/hooks/queries/useGetUserPost';
import BackButton from '@/components/common/BackButton';
import useGetPostComments from '@/hooks/queries/useGetPostComments';
import User from '@/components/common/User';
import PostAction from '@/components/modules/Post/PostAction';
import PostContent from '@/components/modules/Post/PostContent';

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
          <PostContent>{post?.post.content}</PostContent>
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

const PostComments = ({ postId }: { postId?: number }) => {
  const { data: comments } = useGetPostComments(postId ?? -1);

  return (
    <>{comments?.map(props => <CommentCard key={props.id} {...props} />)}</>
  );
};

export default Post;
