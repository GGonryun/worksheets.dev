import Image, { ImageProps } from 'next/image';
import { FC } from 'react';

export const ResponsiveImage: FC<
  Pick<
    ImageProps,
    'priority' | 'alt' | 'src' | 'style' | 'placeholder' | 'blurDataURL'
  >
> = ({ priority, alt, src, style, blurDataURL, placeholder }) => {
  return (
    <Image
      placeholder={placeholder}
      blurDataURL={blurDataURL}
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
