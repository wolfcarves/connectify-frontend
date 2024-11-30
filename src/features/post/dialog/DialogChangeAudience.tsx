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
import Typography from '@/components/ui/typography';
import { GlobeHemisphereEast, Lock, Users } from '@phosphor-icons/react';
import { Audience } from '@/services';
import Radio from '@/components/common/Radio/Radio';

interface AudienceOptions {
  label: string;
  icon: ReactNode;
  value: NonNullable<Audience>;
}

const AUDIENCE: AudienceOptions[] = [
  { label: 'Public', icon: <GlobeHemisphereEast size={16} />, value: 'public' },
  { label: 'Friends only', icon: <Users size={16} />, value: 'friends' },
  { label: 'Only me', icon: <Lock size={16} />, value: 'private' },
];

interface DialogChangeAudienceProps extends DialogProps {
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
}

const DialogChangeAudience = ({
  audience,
  setAudience,
  onApplyClick,
  ...props
}: DialogChangeAudienceProps) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          className="rounded-full"
          size="sm"
        >
          {AUDIENCE.find(aud => aud.value === audience.value)?.icon}

          <Typography.Span
            title={AUDIENCE.find(aud => aud.value === audience.value)?.label}
            weight="medium"
            size="sm"
          />
        </Button>
      </DialogTrigger>
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
                className="flex justify-between items-center text-start border rounded-lg py-3 px-4 hover:bg-muted"
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

export default DialogChangeAudience;
