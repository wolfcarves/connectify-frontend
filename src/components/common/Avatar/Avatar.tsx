import Image, { ImageProps } from 'next/image';
import { cva } from 'class-variance-authority';

const avatar = cva('relative flex aspect-square rounded-full overflow-hidden', {
  variants: {
    size: {
      sm: 'min-w-8 w-8 min-h-8 h-8',
      base: 'min-w-9 w-9 min-h-9 h-9',
      lg: 'min-w-10 w-10 min-h-10 h-10',
    },
  },
  defaultVariants: {
    size: 'base',
  },
});

interface AvatarProps extends Omit<ImageProps, 'alt'> {
  src: string;
  size?: 'sm' | 'base';
}

const Avatar = ({ src, size, className }: AvatarProps) => {
  return (
    <div className={avatar({ size, className })}>
      <Image alt="user_image" src={src} fill sizes="100%" />
    </div>
  );
};

export default Avatar;
