import { Dispatch, ReactNode, SetStateAction } from 'react';
import type { DialogProps } from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GlobeHemisphereEast, Users } from '@phosphor-icons/react';
import { LuLock } from 'react-icons/lu';
import { Audience } from '@/services';
import Radio from '@/components/common/Radio/Radio';

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

interface PostAudienceDialogProps extends DialogProps {
  trigger: ReactNode;
  audience: {
    selected: Audience;
    value: Audience;
  };
  setAudience: Dispatch<
    SetStateAction<{
      selected: Audience;
      value: Audience;
    }>
  >;
  onApplyClick: () => void;
  isApplyLoading?: boolean;
}

const PostAudienceDialog = ({
  trigger,
  audience,
  setAudience,
  onApplyClick,
  isApplyLoading,
  ...props
}: PostAudienceDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Change audience</DialogTitle>
          <DialogDescription>
            Select your preferred audience to ensure the right people see your
            content.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          {AUDIENCE.map(({ label, value, icon }) => {
            return (
              <button
                key={value}
                className="flex justify-between items-center text-start border border-border/50 rounded-lg py-3 px-4 hover:bg-muted"
                onClick={() =>
                  setAudience(prev => ({
                    selected: value,
                    value: prev.value,
                  }))
                }
              >
                <div className="flex items-center gap-2">
                  {icon}
                  {label}
                </div>
                <Radio isSelected={audience.selected === value} />
              </button>
            );
          })}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              className="rounded-full text-xs"
              isLoading={isApplyLoading}
              onClick={() => onApplyClick()}
            >
              Apply changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostAudienceDialog;
