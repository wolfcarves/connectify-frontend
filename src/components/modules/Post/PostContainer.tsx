import { ReactNode } from 'react';

const PostContainer = ({ children }: { children?: ReactNode }) => {
  return <div className="space-y-14 pb-10">{children}</div>;
};

export default PostContainer;
