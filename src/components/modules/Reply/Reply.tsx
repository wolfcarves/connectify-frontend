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
  const [nestedLocalReplies, setNestedLocalReplies] = useState<
    { id: number; content: string }[]
  >([]);

  const [isReplyActive, setIsReplyActive] = useState<boolean>(
    reply?.replies_count === 1 || false,
  );

  const { data: nestedReplies, isLoading: isNestedRepliesLoading } =
    useGetRepliesByCommentId({
      postId,
      commentId: reply?.id,
      enabled: reply?.replies_count === 1 || isReplyActive,
    });

  const handleReplyClick = () => {
    replyFormRef.current?.setFocus();
    setIsReplyActive(true);
  };

  return (
    <>
      <ReplyCard>
        <ReplyCard.Content
          isReplyActive={isReplyActive || reply?.replies_count >= 1}
          avatar={reply.user.avatar}
          username={reply.user.username}
          name={reply.user.name}
          content={reply.content}
          isNested={false}
        />
        <ReplyCard.Action
          isReplyActive={isReplyActive}
          onReplyClick={handleReplyClick}
          repliesCount={reply.replies_count}
          isLoading={isNestedRepliesLoading}
          timestamp={reply.created_at}
        />
      </ReplyCard>

      {isReplyActive &&
        nestedReplies?.data.map(data => {
          return (
            <div
              key={data?.id}
              className="flex items-stretch border-l-2 ps-[30px] ms-[17px]"
            >
              <ReplyCard>
                <ReplyCard.Content
                  isReplyActive={true}
                  avatar={data?.user.avatar}
                  username={data?.user.username}
                  name={data?.user.name}
                  content={data?.content}
                  isNested
                />
                <ReplyCard.Action
                  isNested
                  isReplyActive={isReplyActive}
                  onReplyClick={handleReplyClick}
                  repliesCount={data.replies_count}
                  isLoading={isNestedRepliesLoading}
                  timestamp={data.created_at}
                />
              </ReplyCard>
            </div>
          );
        })}

      {nestedLocalReplies &&
        nestedLocalReplies.map(reply => {
          return (
            <div
              key={reply?.id}
              className="flex items-stretch border-l-2 ps-[30px] ms-[17px]"
            >
              <Reply
                postId={postId}
                data={{
                  id: reply.id,
                  content: reply.content,
                  replies_count: 0,
                  user: {
                    avatar: session.avatar!,
                    id: session.userId!,
                    name: session.name!,
                    username: session.username!,
                  },
                }}
              />
            </div>
          );
        })}

      {isReplyActive && !isNestedRepliesLoading && (
        <div className="flex w-full ps-[1.05rem] xs:ps-[1.07rem]">
          <div className="border-l-2 w-[2.250rem] xs:w-[2.130rem]" />

          <div className="w-full">
            <ReplyCreateForm
              ref={replyFormRef}
              postId={postId}
              commentId={reply?.id}
              onSubmit={(commentId, value) =>
                setNestedLocalReplies(prev => [
                  ...prev,
                  { id: commentId, content: value },
                ])
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Reply;
