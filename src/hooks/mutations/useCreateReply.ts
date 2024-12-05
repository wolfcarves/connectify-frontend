import { ReplyService } from '@/services';
import { useMutation } from '@tanstack/react-query';

export default function useCreateReply() {
  return useMutation({
    mutationKey: ['CREATE_REPLY_KEY'],
    mutationFn: async ({
      commentId,
      reply,
    }: {
      commentId?: number;
      reply: string;
    }) => {
      const response = await ReplyService.postPostReply(commentId ?? -1, {
        reply,
      });

      return response;
    },
    onSuccess: async () => {},
  });
}
