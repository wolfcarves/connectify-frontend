import { ReactNode } from 'react';

const PostCard = ({ children }: { children?: ReactNode }) => {
  return <article className="rounded-md space-y-4 my-5">{children}</article>;
};

export default PostCard;
