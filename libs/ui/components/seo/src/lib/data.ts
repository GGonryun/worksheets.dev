import { CHARITY_GAMES_BASE_URL } from '@worksheets/ui/env';

import { SEOImage } from './types';

export const DEFAULT_IMAGE: SEOImage = {
  url: `${CHARITY_GAMES_BASE_URL}/og-image.png`,
  width: 978,
  height: 800,
  alt: 'Charity Games Logo',
  type: 'image/png',
};

export const DEFAULT_DESCRIPTION =
  'On Charity Games you can play free online HTML browser games and microgames. Every play donates money to charitable causes. We support mobile and desktop.';

export const DEFAULT_TITLE = 'Charity Games';
