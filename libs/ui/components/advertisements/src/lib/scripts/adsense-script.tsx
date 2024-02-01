import { adClient } from '@worksheets/util/adsense';
import Script from 'next/script';

export const AdSenseScript = () => (
  <Script
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
    crossOrigin="anonymous"
  />
);
