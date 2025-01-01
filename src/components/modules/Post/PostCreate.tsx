import React from 'react';
import Card from '@/components/common/Card/Card';
import Avatar from '@/components/common/Avatar/Avatar';
import Input from '@/components/common/Input';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { FaImage } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';

const PostCreate = () => {
  const { data: session } = useGetCurrentSession();

  if (!session?.isAuth) return null;

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

        <Button variant="ghost" className="w-full p-0 hover:opacity-80">
          <Input
            placeholder="What's on your mind?"
            className="hover:cursor-pointer"
          />
        </Button>

        <Button variant="secondary" className="px-8">
          <Typography.Span
            title="Share Post"
            weight="semibold"
            color="primary"
          />
        </Button>
      </div>

      <div className="h-[1px] w-full bg-border" />

      <div className="flex justify-between items-center gap-x-4 mt-1">
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

        <Button variant="ghost" size="sm">
          <Typography.Span title="Public" weight="medium" color="muted" />
          <IoIosArrowDown className="text-md text-muted" />
        </Button>
      </div>
    </Card>
  );
};

export default PostCreate;
