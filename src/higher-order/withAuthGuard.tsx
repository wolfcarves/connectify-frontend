import SessionProvider from '@/providers/SessionProvider';
import { ComponentType } from 'react';

export function withAuthGuard<T extends object>(Component: ComponentType<T>) {
  const NewComponent = async (props: T) => {
    return (
      <SessionProvider>
        <Component {...props} />
      </SessionProvider>
    );
  };

  return NewComponent;
}
