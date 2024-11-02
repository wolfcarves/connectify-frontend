import Typography from '../../ui/typography';
import Avatar, { AvatarProps } from '../../common/Avatar/Avatar';
import Link from 'next/link';

interface UserProps extends Pick<AvatarProps, 'unoptimized' | 'quality'> {
  avatar?: string;
  name?: string;
  username?: string;
  size?: 'base' | 'lg';
}

const User = ({ avatar, name, username, size, ...props }: UserProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <Link href={`/${username}`} className="hover:opacity-80">
        <Avatar src={avatar ?? ''} size={size} {...props} />
      </Link>

      <div>
        <Link href={`/${username}`} className="flex flex-col">
          <Typography.Span
            title={name}
            weight="semibold"
            className="hover:underline h-5"
          />
        </Link>

        <Link href={`/${username}`} className="flex flex-col">
          <Typography.Span
            title={`@${username}`}
            color="muted"
            size="sm"
            className="hover:underline"
          />
        </Link>
      </div>
    </div>
  );
};

export default User;
