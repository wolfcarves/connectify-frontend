import Typography from '../../ui/typography';
import Avatar, { AvatarProps } from '../../common/Avatar/Avatar';
import Link from 'next/link';

interface UserProps extends Pick<AvatarProps, 'unoptimized' | 'quality'> {
  avatar?: string;
  name?: string;
  username?: string;
  size?: 'base' | 'lg';
  timestamp?: string;
  clickable?: boolean;
}

const User = ({
  avatar,
  name,
  username,
  size,
  timestamp,
  clickable = true,
  ...props
}: UserProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar href={username!} src={avatar} size={size} {...props} />

      <div>
        {clickable ? (
          <Link href={`/${username}`} className="flex flex-col">
            <Typography.Span
              title={name}
              weight="semibold"
              className="line-clamp-1 hover:opacity-80 h-5"
            />
          </Link>
        ) : (
          <Typography.Span
            title={name}
            weight="semibold"
            className="line-clamp-1 h-5"
          />
        )}

        {timestamp && (
          <Typography.Span title={timestamp} color="muted" size="xs" />
        )}
      </div>
    </div>
  );
};

export default User;
