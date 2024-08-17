import Link from 'next/link';

const UserProfileTab = () => {
  return (
    <div className="my-10">
      <ul className="flex items-center border-b">
        <Link href="/user/5/cazcade">
          <li className="border-b-2 border-b-primary w-max py-2 px-4">Posts</li>
        </Link>
        <Link href="/friends">
          <li className="w-max py-2 px-4">Friends</li>
        </Link>
        <li className="w-max py-2 px-4">Media</li>
        <li className="w-max py-2 px-4">About</li>
      </ul>
    </div>
  );
};

export default UserProfileTab;
