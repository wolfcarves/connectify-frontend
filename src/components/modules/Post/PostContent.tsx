import type { ReactNode } from 'react';
import Typography from '@/components/ui/typography';

const PostContent = ({ children }: { children?: ReactNode }) => {
  return <Typography.P>{children}</Typography.P>;
};

export default PostContent;
