import { adClient } from '@worksheets/data-access/charity-games';
import Script from 'next/script';

export const AdSenseScript = () => (
  <Script
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
    crossOrigin="anonymous"
  />
);
