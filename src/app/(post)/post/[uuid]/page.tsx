import PostView from '@/features/post/PostView';
import prefetchUserPost from '@/requests/prefetch/prefetchUserPost';

interface Params {
  uuid: string;
}

const PostPage = async ({ params }: { params: Promise<Params> }) => {
  const { uuid } = await params;
  await prefetchUserPost(uuid);

  return <PostView uuid={uuid} />;
};

export default PostPage;
