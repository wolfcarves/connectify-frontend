import { useQueryClient } from '@tanstack/react-query';
import { ChatMessageInfinteData } from './queries/useGetChatMessages';

const useResetQueryData = () => {
  const queryClient = useQueryClient();

  const resetData = ({ queryKey }: { queryKey: (string | number)[] }) => {
    const previousData = queryClient.getQueryData(queryKey);

    if (previousData) {
      queryClient.setQueryData(queryKey, (oldData: ChatMessageInfinteData) => {
        const newData = {
          ...oldData,
          pages: oldData?.pages?.slice(0, 1),
        };

        return newData;
      });
    }
  };

  return {
    resetData,
  };
};

export default useResetQueryData;
