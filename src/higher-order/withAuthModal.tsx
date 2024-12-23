import { ComponentType } from 'react';
import useSession from '@/hooks/useSession';
import AuthModal from '@/features/auth/modal/AuthModal';

export function withAuthModal<T extends object>(Component: ComponentType<T>) {
  const NewComponent = (props: T) => {
    const { isAuth } = useSession();

    if (!isAuth) {
      return <AuthModal trigger={<Component {...props} />} />;
    }

    return <Component {...props} />;
  };

  return NewComponent;
}
