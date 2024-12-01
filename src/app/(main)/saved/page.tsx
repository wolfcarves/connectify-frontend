import SavedList from '@/features/saved/SavedList';
import { withAuthGuard } from '@/higher-order/withAuthGuard';

const SavedPage = () => {
  return (
    <>
      <SavedList />
    </>
  );
};

export default withAuthGuard(SavedPage);
