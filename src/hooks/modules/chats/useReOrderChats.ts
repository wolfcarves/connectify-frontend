import { GET_CHATS_KEY } from '@/hooks/queries/useGetChats';
import { useQueryClient } from '@tanstack/react-query';

const useReOrderChats = () => {
  const queryClient = useQueryClient();

  //   const reOrerChats = () => {
  //     const queryKey = [GET_CHATS_KEY()];

  //     const previousData = queryClient.getQueryData(queryKey);

  //     if (previousData) {
  //       queryClient.setQueryData(queryKey, (oldData: any) => {
  //         const newData = {
  //           ...oldData,
  //           pages: oldData?.pages?.reverse(),
  //         };

  //         return newData;
  //       });
  //     }
  //   };
};

export default useReOrderChats;
