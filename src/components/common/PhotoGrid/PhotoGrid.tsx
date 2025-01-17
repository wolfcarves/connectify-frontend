import { ComponentProps, useEffect, useState } from 'react';
import Typography from '@/components/ui/typography';
import NextImage from 'next/image';
import Spinner from '@/components/ui/spinner';
import { PiImageBrokenLight } from 'react-icons/pi';

interface PhotoGridProps extends ComponentProps<'div'> {
  images?: string[];
}

const PhotoGrid = ({ images, ...props }: PhotoGridProps) => {
  const imageCount = images && images?.length;

  const gridTemplates =
    imageCount === 1 ? 'grid-cols-1 grid-rows-1' : 'grid-cols-6 grid-rows-2';

  if (imageCount === 0 || !imageCount) return <></>;

  return (
    <div
      className={`${gridTemplates} grid gap-1 h-[25rem] border rounded-lg overflow-hidden`}
      {...props}
    >
      {images &&
        images
          ?.slice(0, MAX_IMAGE)
          .map((image: string, idx: number) => (
            <PhotoGridItem
              key={image}
              id={idx}
              src={image}
              totalImages={images.length}
            />
          ))}
    </div>
  );
};

interface PhotoGridItemProps extends Omit<ComponentProps<'div'>, 'id'> {
  id: number;
  src: string;
  totalImages: number;
}

const MAX_IMAGE = 5;

const PhotoGridItem = ({
  id,
  src,
  totalImages,
  ...props
}: PhotoGridItemProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsError(false);
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      setIsError(true);
    };
  }, [src]);

  return (
    <>
      <div
        className={`
        relative hover:brightness-90 hover:cursor-pointer
        ${totalImages === 2 ? 'col-span-3 row-span-2' : id === 0 && totalImages === 3 ? 'col-span-4 row-span-2' : ''}
        ${id > 0 && totalImages === 3 && 'col-span-2'}
        ${totalImages === 4 && 'col-span-3 row-span-1'}
        ${totalImages >= MAX_IMAGE && id <= 1 ? 'col-span-3 row-span-1' : totalImages >= 4 && id > 1 ? 'col-span-2 row-span-1' : ''}
        `}
        {...props}
      >
        {isError && (
          <div className="flex flex-col justify-center items-center h-full">
            <PiImageBrokenLight size={24} />
            <Typography.Span title="Failed to load" />
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          !isError && (
            <NextImage
              key={id}
              alt={`preview-image-${id}`}
              src={src}
              fill
              sizes="100%"
              className={'object-cover'}
            />
          )
        )}

        {totalImages > 5 && id === 4 && (
          <div className="absolute inset-0 flex justify-center items-center bg-muted/10 w-full h-full z-50">
            <Typography.H2 title={`${totalImages - MAX_IMAGE}+`} />
          </div>
        )}
      </div>
    </>
  );
};

export default PhotoGrid;
