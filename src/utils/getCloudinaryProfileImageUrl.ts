import { env } from '@/config/env';
import { getCldImageUrl } from 'next-cloudinary';

const getCloudinaryProfileImageUrl = (uri?: string) => {
  let src = uri;

  if (uri?.startsWith('version'))
    src = getCldImageUrl({
      src: `${env?.cloudinaryProfilePublicID}/${uri}`,
    });
  else src = uri;

  return src;
};

export default getCloudinaryProfileImageUrl;
