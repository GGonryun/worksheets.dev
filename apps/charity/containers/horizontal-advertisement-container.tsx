import { useEffect } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle: any;
  }
}

export const HorizontalAdvertisementContainer = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-1305399541775198"
      data-ad-slot="3067977464"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};
