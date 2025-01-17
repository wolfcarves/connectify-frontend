'use client';

import Card from '@/components/common/Card/Card';
import Avatar from '@/components/common/Avatar/Avatar';
import Input from '@/components/common/Input';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { FaImage } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import Divider from '@/components/common/Divider/Divider';

const PostCreate = () => {
  const { data: session } = useGetCurrentSession();

  if (!session?.id) return null;

  return (
    <Card>
      <div className="flex gap-x-3 py-2">
        <Link
          href={`/${session.username}`}
          passHref
          className="hover:opacity-80"
        >
          <Avatar src={session.avatar} size="sm" />
        </Link>

        <Link href="/create" className="w-full">
          <Input
            placeholder="What's on your mind?"
            className="hover:cursor-pointer"
          />
        </Link>

        <Link href="/create">
          <Button variant="secondary" className="px-8">
            <Typography.Span
              title="Share Post"
              weight="semibold"
              color="primary"
            />
          </Button>
        </Link>
      </div>

      <Divider />

      <div className="flex justify-between items-center gap-x-4 mt-1">
        <Link href="/create">
          <Button
            variant="ghost"
            icon={<FaImage className="text-md text-primary" />}
            size="sm"
          >
            <Typography.Span
              title="Image/Video"
              weight="semibold"
              color="muted"
              size="sm"
            />
          </Button>
        </Link>

        <Link href="/create">
          <Button variant="ghost" size="sm">
            <Typography.Span title="Public" weight="medium" color="muted" />
            <IoIosArrowDown className="text-md text-muted" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default PostCreate;
