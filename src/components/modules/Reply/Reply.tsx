import React, { useRef, useState } from 'react';
import { ReplyCard } from './ReplyCard';
import type { Comment as CommentType } from '@/services';
import useGetRepliesByCommentId from '@/hooks/queries/useGetRepliesByCommentId';
import ReplyCreateForm from '@/features/reply/form/ReplyCreateForm';
import useSession from '@/hooks/useSession';

interface ReplyProps {
  postId?: number;
  data: Omit<CommentType, 'created_at' | 'updated_at'> &
    Partial<Pick<CommentType, 'created_at' | 'updated_at'>>;
}

const Reply = ({ postId, data: reply }: ReplyProps) => {
  const session = useSession();
  const replyFormRef = useRef<{ setFocus: () => void }>(null);

  const [isReplyActive, setIsReplyActive] = useState<boolean>(false);

  const { data: nestedReplies } = useGetRepliesByCommentId({
    postId,
    commentId: reply?.id,
    enabled: !!reply?.id,
  });

  console.log(nestedReplies);

  return (
    <>
      <ReplyCard>
        <ReplyCard.Content
          avatar={reply.user.avatar}
          username={reply.user.username}
          name={reply.user.name}
          content={reply.content}
          isReplyActive={isReplyActive}
          isNested={false}
        />
        <ReplyCard.Action
          isReplyActive={isReplyActive}
          timestamp={reply.created_at}
        />
      </ReplyCard>

      {nestedReplies?.data.map(data => {
        return (
          <div key={data?.id} className="flex items-stretch ms-[17px]">
            <div className="w-[32px] border-l-2" />

            <ReplyCard>
              <ReplyCard.Content
                avatar={data?.user.avatar}
                username={data?.user.username}
                name={data?.user.name}
                content={data?.content}
                isReplyActive={true}
                isNested
              />
              <ReplyCard.Action
                isNested
                isReplyActive={true}
                timestamp={reply?.created_at}
              />
            </ReplyCard>
          </div>
        );
      })}

      <div className="flex w-full ps-[1.1rem]">
        <div className="border-l-2 w-[2.1rem]" />

        <div className="w-full">
          <ReplyCreateForm
            ref={replyFormRef}
            postId={postId}
            commentId={reply?.id}
            avatar={session.avatar!}
          />
        </div>
      </div>
    </>
  );
};

export default Reply;
