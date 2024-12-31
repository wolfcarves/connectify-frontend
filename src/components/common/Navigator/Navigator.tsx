import type { ReactNode } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { RiHome2Line } from 'react-icons/ri';
import { IoBookmarksOutline } from 'react-icons/io5';
import { SlPeople } from 'react-icons/sl';
import { RiChat3Line } from 'react-icons/ri';
import { usePathname, useRouter } from 'next/navigation';
import Card from '../Card/Card';
import { withAuthModal } from '@/higher-order/withAuthModal';

const Navigator = () => {
  return (
    <Card className="mt-4">
      <NavigatorItem
        title="Feed"
        href="/feed"
        icon={<RiHome2Line size={18} />}
      />

      <NavigatorItemWithAuth
        title="Friends"
        href="/friends"
        icon={<SlPeople size={16} />}
      />
      <NavigatorItemWithAuth
        title="Saved"
        href="/saved"
        icon={<IoBookmarksOutline size={17} />}
      />
      <NavigatorItemWithAuth
        title="Chats"
        href="/chats"
        icon={<RiChat3Line size={17} />}
      />

      {/* <div className="h-[1px] w-full bg-border" />

      <div className="p-2">
        <Typography.Span
          title="Other Contents"
          weight="medium"
          color="muted"
          className="uppercase"
          size="sm"
        />
      </div> */}
    </Card>
  );
};

interface NavigatorItemProps extends ButtonProps {
  href: string;
  title: string;
  icon: ReactNode;
}

const NavigatorItem = ({ href, title, icon, ...props }: NavigatorItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  return (
    <Button
      variant="ghost"
      className={`${isActive && 'bg-primary hover:bg-primary/80'} w-full justify-start rounded-md px-3`}
      onClick={() => router.push(href)}
      {...props}
    >
      <div className={`${isActive && 'text-background'} w-6`}>{icon}</div>

      <Typography.Span
        title={title}
        size="sm"
        weight="medium"
        color={isActive ? 'background' : 'foreground'}
        className="mt-1"
      />
    </Button>
  );
};

const NavigatorItemWithAuth = withAuthModal(NavigatorItem);

export default Navigator;
