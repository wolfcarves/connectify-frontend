import Avatar from '@/components/common/Avatar/Avatar';
import type { Comment as CommentProps } from '@/services';
import CommentCard from './CommentCard';

const Comment = ({ data }: { data?: CommentProps }) => {
  return (
    <>
      <CommentCard>
        <Avatar src={data?.user.avatar ?? ''} size="sm" />
        <CommentCard.Content
          username={data?.user.name}
          comment={data?.comment}
        />
      </CommentCard>
    </>
  );
};

export default Comment;
