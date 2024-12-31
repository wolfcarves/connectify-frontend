import { Spinner as SpinnerIcon } from '@phosphor-icons/react';
import { ComponentProps } from 'react';

const Spinner = ({
  className,
}: {
  className?: ComponentProps<'div'>['className'];
}) => {
  return (
    <SpinnerIcon
      size={20}
      className={`animate-spin duration-1000 ${className}`}
    />
  );
};

export default Spinner;
