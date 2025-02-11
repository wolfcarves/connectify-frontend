import React, { useRef, useState } from 'react';
import { ReplyCard } from './ReplyCard';
import type { Comment as CommentType } from '@/services';
import useGetRepliesByCommentId from '@/hooks/queries/useGetRepliesByCommentId';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import ReplyInput from './ReplyInput';

interface ReplyProps {
  postId: number;
  data: Omit<CommentType, 'created_at' | 'updated_at'> &
    Partial<Pick<CommentType, 'created_at' | 'updated_at'>>;
  isNested: boolean;
}

const Reply = ({ postId, data: reply, isNested }: ReplyProps) => {
  const { data: session } = useGetCurrentSession();
  const replyFormRef = useRef<HTMLTextAreaElement & { setFocus: () => void }>(
    null,
  );
  const [nestedLocalReplies, setNestedLocalReplies] = useState<
    { id: number; content: string }[]
  >([]);

  const [isReplyOpen, setIsReplyOpen] = useState<boolean>(
    reply?.replies_count === 1 || false,
  );

  const { data: nestedReplies, isLoading: isNestedRepliesLoading } =
    useGetRepliesByCommentId({
      postId,
      commentId: reply?.id,
      enabled: reply?.replies_count === 1 || isReplyOpen,
    });

  const handleReplyClick = () => {
    replyFormRef.current?.setFocus();
    setIsReplyOpen(true);
  };

  return (
    <>
      <ReplyCard>
        <ReplyCard.Content
          isReplyOpen={isReplyOpen || reply?.replies_count >= 1}
          avatar={reply.user.avatar}
          username={reply.user.username}
          name={reply.user.name}
          content={reply.content}
          isNested={isNested}
        />
        <ReplyCard.Action
          onReplyClick={handleReplyClick}
          timestamp={reply.created_at}
        />
        <ReplyCard.ViewAllButton
          visible={!isReplyOpen && reply?.replies_count > 1}
          onClick={handleReplyClick}
          repliesCount={reply.replies_count}
          isLoading={isNestedRepliesLoading}
        />
      </ReplyCard>

      {isReplyOpen &&
        nestedReplies?.data.map(data => {
          return (
            <div
              key={data?.id}
              className="flex items-stretch border-l-2 ps-[30px] ms-[17px]"
            >
              <ReplyCard>
                <ReplyCard.Content
                  isReplyOpen={true}
                  avatar={data?.user.avatar}
                  username={data?.user.username}
                  name={data?.user.name}
                  content={data?.content}
                  isNested
                />
                <ReplyCard.Action
                  onReplyClick={handleReplyClick}
                  timestamp={data.created_at}
                />
                <ReplyCard.ViewAllButton
                  visible={!isReplyOpen && data.replies_count > 1}
                  onClick={handleReplyClick}
                  isLoading={isNestedRepliesLoading}
                  repliesCount={data?.replies_count}
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
                  is_liked: false,
                  likes_count: 0,
                  replies_count: 0,
                  user: {
                    id: session?.id!,
                    avatar: session?.avatar!,
                    name: session?.name!,
                    username: session?.username!,
                  },
                }}
                isNested={true}
              />
            </div>
          );
        })}

      {isReplyOpen && !isNestedRepliesLoading && (
        <div className="flex w-full ps-[1.05rem] xs:ps-[1.07rem]">
          <div className="border-l-2 w-[2.250rem] xs:w-[2.130rem]" />

          <div className="w-full">
            <ReplyInput
              ref={replyFormRef}
              postId={postId}
              commentId={reply?.id}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Reply;
