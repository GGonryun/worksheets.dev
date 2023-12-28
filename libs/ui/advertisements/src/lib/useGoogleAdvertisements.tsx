'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle: any;
  }
}

export const useGoogleAdsense = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const scriptElement = document.querySelector(
      'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4354027605127587"]'
    );

    const handleScriptLoad = () => {
      try {
        if (window.adsbygoogle) {
          window.adsbygoogle.push({});
        } else {
          scriptElement?.addEventListener('load', handleScriptLoad);
        }
      } catch (err) {
        console.error('error in adsense', err);
      }
    };

    handleScriptLoad();
    // Wait for script to load

    return () => {
      if (scriptElement) {
        scriptElement.removeEventListener('load', handleScriptLoad);
      }
    };
  }, [pathname, searchParams]);
};
