import Image from 'next/image';
import Typography from '../ui/typography';
import { convertUtil } from '@/utils/convertUtil';
import Avatar from './Avatar/Avatar';

interface UserProps {
  avatar?: string;
  name?: string;
  timestamp?: string;
}

const User = ({ avatar, name, timestamp }: UserProps) => {
  return (
    <div className="flex items-center gap-2.5">
      {avatar && <Avatar src={avatar} size="lg" />}

      <div className="flex flex-col">
        <Typography.Span title={name} weight="semibold" />
        <Typography.Span
          title={convertUtil(timestamp)}
          size="sm"
          color="muted"
        />
      </div>
    </div>
  );
};

export default User;
