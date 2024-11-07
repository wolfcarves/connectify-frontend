import PostView from '@/features/post/PostView';

interface Params {
  uuid: string;
}

const PostPage = async ({ params }: { params: Promise<Params> }) => {
  const { uuid } = await params;

  return <PostView uuid={uuid} />;
};

export default PostPage;
