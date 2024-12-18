import PostCreateForm from '@/features/post/form/PostCreateForm';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const PostCreatePage = () => {
  return (
    <>
      <PostCreateForm />
    </>
  );
};

export default withAuthGuard(PostCreatePage);
