import { ReactNode } from 'react';
import type { DialogProps } from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GlobeHemisphereEast, Users } from '@phosphor-icons/react';
import { LuLock } from 'react-icons/lu';
import { Audience } from '@/services';
import Typography from '@/components/ui/typography';

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

interface PostDeleteModalProps extends DialogProps {
  trigger: ReactNode;
  onSubmitClick: () => void;
  isLoading?: boolean;
}

const PostDeleteModal = ({
  trigger,
  onSubmitClick,
  isLoading,
  ...props
}: PostDeleteModalProps) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle asChild>
            <Typography.H4 title="Are you sure to delete this post?" />
          </DialogTitle>

          <Typography.H6
            title="Once confirmed, this post will be deleted permanently."
            color="muted"
          />
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              className="rounded-full"
              isLoading={isLoading}
            >
              <Typography.Span title="Cancel" />
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              className="rounded-full"
              isLoading={isLoading}
              onClick={() => onSubmitClick()}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostDeleteModal;
