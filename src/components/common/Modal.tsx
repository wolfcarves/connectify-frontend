'use client';

import type { ComponentProps, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

const Modal = ({
  children,
  onClose,
  className,
}: {
  children?: ReactNode;
  onClose?: () => void;
  className?: ComponentProps<'div'>['className'];
}) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
    onClose && onClose();
  };

  return (
    <Dialog
      modal
      defaultOpen
      onOpenChange={state => {
        if (!state) handleClose();
      }}
    >
      <DialogContent className={className}>
        <DialogDescription className="hidden thisIsRequired" />
        <DialogTitle className="hidden thisIsRequired" />
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
