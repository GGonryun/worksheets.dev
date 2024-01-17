import Script from 'next/script';

export const AdSenseScript = () => (
  <Script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1305399541775198"
    crossOrigin="anonymous"
  />
);

export const AdsensePushScript = () => (
  <Script id="adsense-push">
    {`if (adsbygoogle && !adsbygoogle.loaded) (adsbygoogle = window.adsbygoogle || []).push({});`}
    {/* Check if the above code works for ads if not we'll need to change how we render game containers. */}
    {/* {`(adsbygoogle = window.adsbygoogle || []).push({});`} */}
  </Script>
);
