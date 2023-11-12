import Image, { ImageProps } from 'next/image';
import { FC } from 'react';

export const ResponsiveImage: FC<ImageProps> = ({ alt, src }) => {
  return (
    <Image
      alt={alt}
      src={src}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
    />
  );
};
