import Script from 'next/script';

import { GOOGLE_AD_PLACEMENT_API } from '../data';

export const AdSenseScript = () => (
  <Script async src={GOOGLE_AD_PLACEMENT_API} crossOrigin="anonymous" />
);
