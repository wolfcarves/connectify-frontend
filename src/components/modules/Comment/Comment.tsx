import type { Comment as CommentProps } from '@/services';
import { CommentCard } from './CommentCard';

const Comment = ({ data }: { data?: CommentProps }) => {
  return (
    <>
      <CommentCard>
        <CommentCard.Content
          avatar={data?.user.avatar}
          username={data?.user.username}
          comment={data?.comment}
        />
        <CommentCard.Action />
      </CommentCard>
    </>
  );
};

export default Comment;
