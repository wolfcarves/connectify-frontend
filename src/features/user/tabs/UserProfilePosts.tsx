// 'use client';

import useGetAllUserPosts from '@/hooks/queries/useGetAllUserPosts';
import useSession from '@/hooks/useSession';
import PostCard from '@/components/modules/Post/PostCard';
import CommentCard from '@/components/common/Card/CommentCard';
import CommentContainer from '@/components/modules/Comment/CommentContainer';
import PostCardPanel from '@/components/common/Panel/PostCardPanel';

const UserProfilePosts = () => {
  // const { userId } = useSession();
  // const { data: userPosts } = useGetAllUserPosts(userId);

  return (
    <>
      <PostCard
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor veniam beatae eum ratione inventore nisi odit atque quasi omnis sed."
        action={
          <PostCardPanel
            likes={0}
            comments={0}
            shares={0}
            onCommentClick={() => {}}
          />
        }
        commentSection={
          <CommentContainer>
            <CommentCard />
          </CommentContainer>
        }
      />
      {/* {userPosts?.map(props => {
        return <PostCard key={props.id} {...props} />;
      })} */}
    </>
  );
};

export default UserProfilePosts;
