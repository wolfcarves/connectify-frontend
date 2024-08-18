'use client';

import useGetAllUserPosts from '@/hooks/queries/useGetAllUserPosts';
import useSession from '@/hooks/useSession';
import PostCard from '@/components/modules/Post/PostCard';
import CommentCard from '@/components/modules/Comment/CommentCard';
import PostCardPanel from '@/components/modules/Post/PostCardPanel';
import PostContainer from '@/components/modules/Post/PostContainer';
import CommentContainer from '@/components/modules/Comment/CommentContainer';
import useGetPostComments from '@/hooks/queries/useGetPostComments';

const UserProfilePosts = () => {
  const { userId } = useSession();
  const { data: posts } = useGetAllUserPosts(userId);

  return (
    <PostContainer>
      {posts?.map(({ id, content, comments, created_at }) => {
        return (
          <PostCard
            key={id}
            content={content}
            action={
              <PostCardPanel postId={id} likes={0} comments={0} shares={0} />
            }
            commentSection={
              <CommentContainer postId={id} hasComments={comments > 0}>
                <UserProfileComments postId={id} />
              </CommentContainer>
            }
            created_at={created_at}
          />
        );
      })}
    </PostContainer>
  );
};

const UserProfileComments = ({ postId }: { postId: number }) => {
  const { data: comments } = useGetPostComments(postId);

  return (
    <>{comments?.map(props => <CommentCard key={props.id} {...props} />)}</>
  );
};

export default UserProfilePosts;
