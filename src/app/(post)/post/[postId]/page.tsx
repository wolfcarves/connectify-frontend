import PostView from '@/features/post/PostView';

const PostViewPage = ({ params }: { params: { postId: number } }) => {
  return <PostView postId={params.postId} />;
};

export default PostViewPage;
