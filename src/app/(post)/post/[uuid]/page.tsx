import PostView from '@/features/post/PostView';

const PostPage = ({ params }: { params: { uuid: string } }) => {
  return <PostView uuid={params.uuid} />;
};

export default PostPage;
