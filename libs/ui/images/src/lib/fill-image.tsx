import Image, { ImageProps } from 'next/image';
import { FC } from 'react';

export const FillImage: FC<
  Pick<
    ImageProps,
    'priority' | 'alt' | 'src' | 'style' | 'blurDataURL' | 'placeholder'
  >
> = ({ priority, alt, src, style }) => {
  return (
    <Image
      priority={priority}
      title={alt}
      alt={alt}
      src={src}
      sizes="100%"
      fill
      style={{ objectFit: 'cover', ...style }}
    />
  );
};
