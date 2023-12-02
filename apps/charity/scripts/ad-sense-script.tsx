import Script from 'next/script';

export const AdSenseScript = () => {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1305399541775198"
      crossOrigin="anonymous"
    />
  );
};
