'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';

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
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
