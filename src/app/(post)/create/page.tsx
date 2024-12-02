import PostCreateForm from '@/features/post/form/PostCreateForm';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const CreatePostPage = () => {
  return (
    <>
      <PostCreateForm />
    </>
  );
};

export default withAuthGuard(CreatePostPage);
