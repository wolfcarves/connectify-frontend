import type { ReactNode } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { Bookmarks, ChatCircle, Rss, Users } from '@phosphor-icons/react';
import { usePathname, useRouter } from 'next/navigation';
import Card from '../Card/Card';
import { withAuthModal } from '@/higher-order/withAuthModal';

const Navigator = () => {
  return (
    <Card className="mt-4">
      <NavigatorItem title="Feed" href="/feed" icon={<Rss size={17} />} />
      <NavigatorItemWithAuth
        title="Friends"
        href="/friends"
        icon={<Users size={17} />}
      />
      <NavigatorItemWithAuth
        title="Saved"
        href="/saved"
        icon={<Bookmarks size={17} />}
      />
      <NavigatorItemWithAuth
        title="Chats"
        href="/chats"
        icon={<ChatCircle size={17} />}
      />
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

  return (
    <Button
      size="xs"
      variant="ghost"
      className="w-full justify-start rounded-lg"
      onClick={() => router.push(href)}
      {...props}
    >
      <div className={`${pathname.startsWith(href) && 'text-primary'} w-4`}>
        {icon}
      </div>
      <Typography.Span
        title={title}
        size="sm"
        weight="medium"
        color={pathname.startsWith(href) ? 'primary' : 'foreground'}
      />
    </Button>
  );
};

const NavigatorItemWithAuth = withAuthModal(NavigatorItem);

export default Navigator;
