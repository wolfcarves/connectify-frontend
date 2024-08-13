'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

const Modal = ({
  children,
  onClose,
}: {
  children?: ReactNode;
  onClose?: () => void;
}) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
    onClose && onClose();
  };

  return (
    <Dialog open modal>
      <DialogContent
        className="sm:max-w-[33rem] min-h-[20rem]"
        onBlur={() => handleClose()}
      >
        <DialogTitle className="hidden thisIsRequired" />
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
