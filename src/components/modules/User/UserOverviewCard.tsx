import Card from '@/components/common/Card/Card';
import User from '@/components/modules/User/User';
import Typography from '@/components/ui/typography';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import Link from 'next/link';

const UserOverviewCard = () => {
  const { data: session } = useGetCurrentSession();
  const { avatar, name, username, friends_count } = session || {};

  return (
    <Link href={`/${username}`} className="hover:opacity-80">
      <Card>
        <User
          avatar={avatar}
          name={name}
          username={username}
          clickable={false}
        />

        <div className="flex justify-around items-center mt-2.5 select-none">
          <div className="flex flex-col text-center">
            <Typography.Span title="Posts" size="xs" weight="medium" />
            <Typography.Span title="80" size="xs" color="muted" />
          </div>
          <div className="flex flex-col text-center">
            <Typography.Span title="Friends" size="xs" weight="medium" />
            <Typography.Span title={friends_count} size="xs" color="muted" />
          </div>
          <div className="flex flex-col text-center">
            <Typography.Span title="Saved" size="xs" weight="medium" />
            <Typography.Span title="80" size="xs" color="muted" />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default UserOverviewCard;
