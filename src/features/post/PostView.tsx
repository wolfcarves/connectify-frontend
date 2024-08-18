'use client';

import PostCard from '@/components/modules/Post/PostCard';
import CommentCard from '@/components/modules/Comment/CommentCard';
import PostCardPanel from '@/components/modules/Post/PostCardPanel';
import PostContainer from '@/components/modules/Post/PostContainer';
import useGetUserPost from '@/hooks/queries/useGetUserPost';
import BackButton from '@/components/common/BackButton';
import CommentContainer from '@/components/modules/Comment/CommentContainer';
import useGetPostComments from '@/hooks/queries/useGetPostComments';

const PostView = ({ postId }: { postId: number }) => {
  const { data: post, isPending: isPostLoading } = useGetUserPost(postId);
  const { data: comments } = useGetPostComments(postId);

  return (
    <>
      <div className="pb-4">
        <BackButton />
      </div>

      <PostContainer>
        <PostCard
          key={post?.id}
          content={post?.content}
          action={
            <PostCardPanel
              postId={post?.id}
              likes={0}
              comments={0}
              shares={0}
            />
          }
          commentSection={
            <CommentContainer
              postId={post?.id}
              hasComments={
                comments?.length && comments.length > 0 ? true : false
              }
            >
              <PostViewComments postId={post?.id} />
            </CommentContainer>
          }
        />
      </PostContainer>
    </>
  );
};

const PostViewComments = ({ postId }: { postId?: number }) => {
  const { data: comments } = useGetPostComments(postId ?? -1);

  return (
    <>{comments?.map(props => <CommentCard key={props.id} {...props} />)}</>
  );
};

export default PostView;
