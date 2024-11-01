import Image, { ImageProps } from 'next/image';
import { cva, VariantProps } from 'class-variance-authority';
import getCloudinaryImageUrl from '@/utils/getCloudinaryImageUrl';

const avatar = cva(
  'relative bg-accent flex aspect-square rounded-full overflow-hidden',
  {
    variants: {
      size: {
        sm: 'min-w-9 w-9 min-h-9 h-9',
        base: 'min-w-10 w-10 min-h-10 h-10',
        lg: 'min-w-11 w-11 min-h-11 h-11',
        xl: 'min-w-12 w-12 min-h-12 h-12',
        '2xl': 'min-w-14 w-14 min-h-14 h-14',
      },
    },
    defaultVariants: {
      size: 'base',
    },
  },
);

type CVAAvatarProps = VariantProps<typeof avatar>;

interface AvatarProps extends Omit<ImageProps, 'alt' | 'src'>, CVAAvatarProps {
  src?: string;
}

const Avatar = ({ src, size, className }: AvatarProps) => {
  const imageSrc = getCloudinaryImageUrl(src);

  return (
    <div
      className={`${!avatar && 'animate-pulse'} ${avatar({ className, size })}`}
    >
      {imageSrc && (
        <Image
          alt="avatar"
          src={imageSrc}
          fill
          className="rounded-full object-cover"
          sizes="100%"
        />
      )}
    </div>
  );
};

export default Avatar;
