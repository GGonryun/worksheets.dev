import Image, { ImageProps } from 'next/image';
import { FC } from 'react';

export const ResponsiveImage: FC<
  Pick<ImageProps, 'priority' | 'alt' | 'src' | 'style'>
> = ({ priority, alt, src, style }) => {
  return (
    <Image
      priority={priority}
      alt={alt}
      src={src}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto', ...style }}
    />
  );
};
