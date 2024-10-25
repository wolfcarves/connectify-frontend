import { env } from '@/config/env';
import { getCldImageUrl } from 'next-cloudinary';

const getCloudinaryImageUrl = (uri?: string) => {
  const src = getCldImageUrl({
    src: `${env?.cloudinaryProfilePublicID}/${uri}`,
  });

  return src;
};

export default getCloudinaryImageUrl;
