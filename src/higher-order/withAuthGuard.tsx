import { ComponentType } from 'react';

export function withAuthGuard<T extends object>(Component: ComponentType<T>) {
  const NewComponent = (props: T) => {
    return <Component {...props} />;
  };

  return NewComponent;
}
