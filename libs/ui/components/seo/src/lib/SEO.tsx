import { CHARITY_GAMES_BASE_URL } from '@worksheets/ui/env';

import { DEFAULT_DESCRIPTION, DEFAULT_IMAGE, DEFAULT_TITLE } from './data';
import { SEOImage } from './types';

type SEOProps = {
  title?: string;
  description?: string;
  image?: SEOImage;
  path: string;
};

export const SEO = (props: SEOProps) => {
  const image = props.image ?? DEFAULT_IMAGE;
  const title = props.title ? props.title : DEFAULT_TITLE;
  const description = props.description ?? DEFAULT_DESCRIPTION;
  const url = `${CHARITY_GAMES_BASE_URL}${props.path}`;
  return (
    <>
      <title>{title}</title>

      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image.url} />
      <meta property="og:image:width" content={String(image.width)} />
      <meta property="og:image:height" content={String(image.height)} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image.url} />
      <meta property="twitter:image:width" content={String(image.width)} />
      <meta property="twitter:image:height" content={String(image.height)} />
    </>
  );
};
