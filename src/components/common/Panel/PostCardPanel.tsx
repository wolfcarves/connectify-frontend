import { Button } from '@/components/ui/button';
import {
  AiOutlineLike,
  AiOutlineMessage,
  AiOutlineShareAlt,
} from 'react-icons/ai';

interface PostCardPanelProps {
  likes: number;
  comments: number;
  shares: number;
}

const PostCardPanel = ({ likes, comments, shares }: PostCardPanelProps) => {
  return (
    <div className="space-x-2">
      <Button variant="ghost" size="sm">
        <AiOutlineLike className="text-lg me-1" />
        {likes}
      </Button>

      <Button variant="ghost" size="sm">
        <AiOutlineMessage className="text-lg me-1" />
        {comments}
      </Button>

      <Button variant="ghost" size="sm">
        <AiOutlineShareAlt className="text-lg me-1" />
        {shares}
      </Button>
    </div>
  );
};

export default PostCardPanel;
