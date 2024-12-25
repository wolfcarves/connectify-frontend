'use client';

import { ComponentProps, Dispatch, ReactNode, SetStateAction } from 'react';
import { useClickOutside } from '@mantine/hooks';

interface DropdownProps {
  trigger: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const Dropdown = ({ trigger, isOpen, setIsOpen, children }: DropdownProps) => {
  const popupRef = useClickOutside(() => setIsOpen(false));

  return (
    <div className="relative">
      {trigger}

      <div
        ref={popupRef}
        className={`${!isOpen && 'hidden'} flex absolute right-0 top-12 w-[380px] h-[calc(100vh-15rem)] border bg-background-light rounded-xl overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
};

interface DropdownContentProps extends ComponentProps<'div'> {
  visible: boolean;
  out?: 'left' | 'right';
  children: ReactNode;
}

const DropdownContent = ({
  children,
  visible = true,
  out,
  className,
  ...props
}: DropdownContentProps) => {
  return (
    <div
      className={`absolute inset-0 ${visible ? 'left-0' : out === 'left' ? '-left-full' : 'left-full'} bg-card duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Dropdown.Content = DropdownContent;

export default Dropdown;
