import Typography from '@/components/ui/typography';
import Image from 'next/image';

const PhotoGrid = ({ images }: { images?: string[] }) => {
  const imageCount = images && images?.length;

  const gridTemplates =
    imageCount === 1 ? 'grid-cols-1 grid-rows-1' : 'grid-cols-6 grid-rows-2';

  const maxImages = 5;

  if (imageCount === 0 || !imageCount) return <></>;

  return (
    <div
      className={`${gridTemplates} grid gap-1 h-[25rem] border rounded-lg overflow-hidden`}
    >
      {images &&
        images?.slice(0, maxImages).map((image: string, idx: number) => (
          <div
            key={image}
            className={`
            relative hover:brightness-75 hover:cursor-pointer
            ${images.length === 2 ? 'col-span-3 row-span-2' : idx === 0 && images.length === 3 ? 'col-span-4 row-span-2' : ''}
            ${idx > 0 && images.length === 3 && 'col-span-2'}
            ${images.length === 4 && 'col-span-3 row-span-1'}
            ${images.length >= maxImages && idx <= 1 ? 'col-span-3 row-span-1' : images.length >= 4 && idx > 1 ? 'col-span-2 row-span-1' : ''} 
            
            `}
          >
            {images.length > 5 && idx === 4 && (
              <div className="absolute inset-0 flex justify-center items-center bg-black/70 w-full h-full z-50">
                <Typography.H2 title={`${images.length - maxImages}+`} />
              </div>
            )}

            <Image
              alt={`preview-image-${idx}`}
              src={image}
              fill
              className="object-cover"
            />
          </div>
        ))}
    </div>
  );
};

export default PhotoGrid;
{
  /* {images.map((image, idx) => {
        return (
          <div
            key={image}
            className={`${idx < 1 ? 'col-span-2' : idx > 1 ? 'col-span-1' : 'col-span-3'} relative w-full h-full overflow-hidden`}
          >
            <Image
              alt={`preview-image`}
              src={image}
              fill
              className="object-cover"
            />
          </div>
        );
      })} */
}
