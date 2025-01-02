import PostCreate from '@/components/modules/Post/PostCreate';
import FeedDiscoverPosts from '@/features/feed/FeedDiscoverPosts';
import FeedSortBy from '@/features/feed/FeedSortBy';

const FeedDiscoverPage = () => {
  return (
    <>
      <PostCreate />
      <FeedSortBy />
      <FeedDiscoverPosts />
    </>
  );
};

export default FeedDiscoverPage;
