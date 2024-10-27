import { env } from '@/config/env';
import { getCldImageUrl } from 'next-cloudinary';

const getCloudinaryImageUrl = (uri?: string) => {
  let src = uri;

  if (uri?.startsWith('version'))
    src = getCldImageUrl({
      src: `${env?.cloudinaryProfilePublicID}/${uri}`,
    });
  else src = uri;

  return src;
};

export default getCloudinaryImageUrl;
