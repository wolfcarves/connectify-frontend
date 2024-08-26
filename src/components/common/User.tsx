import Typography from '../ui/typography';
import Avatar from './Avatar/Avatar';
import Link from 'next/link';

interface UserProps {
  avatar?: string;
  name?: string;
  username?: string;
}

const User = ({ avatar, name, username }: UserProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <Link href={`/${username}`} className="hover:opacity-80">
        {avatar && <Avatar src={avatar} size="lg" />}
      </Link>

      <div>
        <Link href={`/${username}`} className="flex flex-col">
          <Typography.Span
            title={name}
            weight="semibold"
            className="hover:underline"
          />
        </Link>

        <Typography.Span title={`@${username}`} size="sm" color="muted" />
      </div>
    </div>
  );
};

export default User;
