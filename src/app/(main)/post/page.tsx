import CreatePostForm from '@/components/modules/Post/CreatePostForm';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const CreatePostPage = () => {
  return (
    <>
      <CreatePostForm />
    </>
  );
};

export default withAuthGuard(CreatePostPage);
