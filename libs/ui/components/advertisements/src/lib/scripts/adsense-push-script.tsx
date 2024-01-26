import Script from 'next/script';

export const AdsensePushScript = () => (
  <Script id="adsense-push" async>
    {`(adsbygoogle = window.adsbygoogle || []).push({});`}
  </Script>
);
