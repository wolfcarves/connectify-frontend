import CreatePostForm from '@/features/feed/forms/CreatePostForm';
import Modal from '@/components/common/Modal';

export default function CreatePostPage() {
  return (
    <Modal>
      <h1 className="text-2xl font-display font-semibold">Create post</h1>

      <CreatePostForm />
    </Modal>
  );
}
