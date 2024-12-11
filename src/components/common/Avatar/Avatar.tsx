'use client';

import Image, { ImageProps } from 'next/image';
import { cva, VariantProps } from 'class-variance-authority';
import getCloudinaryProfileImageUrl from '@/utils/getCloudinaryProfileImageUrl';
import { useRouter } from 'next/navigation';

const avatar = cva(
  'relative bg-accent flex aspect-square rounded-full overflow-hidden',
  {
    variants: {
      size: {
        xs: 'min-w-7 w-7 min-h-7 h-7',
        sm: 'min-w-9 w-9 min-h-9 h-9',
        base: 'min-w-9 w-9 min-h-9 h-9 sm:min-w-10 sm:w-10 sm:min-h-10 sm:h-10',
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

export interface AvatarProps
  extends Omit<ImageProps, 'alt' | 'src'>,
    CVAAvatarProps {
  href?: string;
  src?: string;
}

const Avatar = ({ href, src, size, className, ...props }: AvatarProps) => {
  const router = useRouter();
  const imageSrc = getCloudinaryProfileImageUrl(src);

  return (
    <div
      onClick={href ? () => router.push(`/${href}`) : undefined}
      className={`${!avatar && 'animate-pulse'} ${avatar({ className, size })} ${href && 'hover:opacity-80 hover:cursor-pointer'} select-none`}
    >
      {imageSrc && (
        <Image
          alt="avatar"
          src={imageSrc}
          fill
          className="rounded-full object-cover"
          sizes="100%"
          {...props}
        />
      )}
    </div>
  );
};

export default Avatar;
