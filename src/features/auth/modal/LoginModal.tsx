import { ReactNode } from 'react';
import type { DialogProps } from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { GlobeHemisphereEast, Users } from '@phosphor-icons/react';
import { LuLock } from 'react-icons/lu';
import { Audience } from '@/services';
import LoginForm from '../form/LoginForm';

interface AudienceOptions {
  label: string;
  icon: ReactNode;
  value: NonNullable<Audience>;
}

export const AUDIENCE: AudienceOptions[] = [
  { label: 'Public', icon: <GlobeHemisphereEast size={16} />, value: 'public' },
  { label: 'Friends only', icon: <Users size={16} />, value: 'friends' },
  { label: 'Only me', icon: <LuLock size={14} />, value: 'private' },
];

interface LoginModalProps extends DialogProps {
  trigger: ReactNode;
}

const LoginModal = ({ trigger, ...props }: LoginModalProps) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Login to your account</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2 mt-5">
          <LoginForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
