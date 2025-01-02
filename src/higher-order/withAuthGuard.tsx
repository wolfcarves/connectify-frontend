import { ComponentType } from 'react';
import AuthGuard from '../providers/AuthProvider';

export function withAuthGuard<T extends object>(Component: ComponentType<T>) {
  const NewComponent = (props: T) => {
    return (
      <AuthGuard>
        <Component {...props} />
      </AuthGuard>
    );
  };

  return NewComponent;
}
