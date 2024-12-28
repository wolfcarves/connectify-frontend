import React, { useRef, useState } from 'react';
import { ReplyCard } from './ReplyCard';
import type { Comment as CommentType } from '@/services';
import useGetRepliesByCommentId from '@/hooks/queries/useGetRepliesByCommentId';
import ReplyCreateForm from '@/features/reply/form/ReplyCreateForm';
import useSession from '@/hooks/useSession';

interface ReplyProps {
  postId: number;
  data: Omit<CommentType, 'created_at' | 'updated_at'> &
    Partial<Pick<CommentType, 'created_at' | 'updated_at'>>;
}

const Reply = ({ postId, data: reply }: ReplyProps) => {
  const session = useSession();
  const replyFormRef = useRef<{ setFocus: () => void }>(null);
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
          isNested={false}
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

      {isReplyOpen && !isNestedRepliesLoading && (
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
