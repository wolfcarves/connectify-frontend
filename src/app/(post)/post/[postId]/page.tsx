import Post from '@/features/post/Post';

const PostViewPage = ({ params }: { params: { postId: number } }) => {
  return <Post postId={params.postId} />;
};

export default PostViewPage;
