import Typography from '@/components/ui/typography';
import Link from 'next/link';

const UserProfileTab = () => {
  return (
    <div className="my-10">
      <ul className="flex items-center border-b">
        <Link href="/user/5/cazcade">
          <li className="border-b-2 border-b-primary w-max py-2 px-4">
            <Typography.Span title="Posts" />
          </li>
        </Link>

        <li className="w-max py-2 px-4">
          <Typography.Span title="Friends" />
        </li>

        <li className="w-max py-2 px-4">
          <Typography.Span title="Media" />
        </li>
        <li className="w-max py-2 px-4">
          <Typography.Span title="About" />
        </li>
      </ul>
    </div>
  );
};

export default UserProfileTab;
