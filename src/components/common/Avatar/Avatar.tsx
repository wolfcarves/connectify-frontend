import Image from 'next/image';

const Avatar = ({ src }: { src: string }) => {
  return (
    <>
      <Image
        alt="user_image"
        src={src}
        width={32}
        height={32}
        className="flex w-8 h-8 aspect-square rounded-full"
      />
    </>
  );
};

export default Avatar;
