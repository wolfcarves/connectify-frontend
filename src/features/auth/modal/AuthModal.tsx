import { ReactNode } from 'react';
import type { DialogProps } from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { GlobeHemisphereEast, Users } from '@phosphor-icons/react';
import { LuLock } from 'react-icons/lu';
import { Audience } from '@/services';
import LoginForm from '../form/LoginForm';
import Typography from '@/components/ui/typography';
import Logo from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { IoCloseSharp } from 'react-icons/io5';

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

interface AuthModalProps extends DialogProps {
  trigger: ReactNode;
}

const AuthModal = ({ trigger, ...props }: AuthModalProps) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[520px] p-4 pt-2">
        <DialogHeader>
          <div className="flex justify-between w-full pb-3">
            <Logo />
            <DialogClose asChild>
              <Button
                size="icon"
                icon={<IoCloseSharp size={20} />}
                variant="ghost"
              />
            </DialogClose>
          </div>

          <div className="sm:max-w-[320px]">
            <Typography.H5 title="Login to VibeOut" weight="medium" />
            <Typography.H6
              title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
              color="muted"
            />
          </div>
        </DialogHeader>

        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
