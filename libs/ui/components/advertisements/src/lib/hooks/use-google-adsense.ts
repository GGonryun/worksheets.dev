import { useEffect, useRef, useState } from 'react';
import { AdBreak, AdConfig } from 'types/adsense';

import { GOOGLE_AD_PLACEMENT_API } from '../data';

let adBreak = function (o: AdBreak) {
  console.warn('adBreak is not defined', o);
};
let adConfig = function (o: AdConfig) {
  console.warn('adConfig is not defined', o);
};

const ADSENSE_TIMEOUT = 5000;

export const useGoogleAdsense = () => {
  const documentRef = useRef<Document>(document);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;

    const adsense = document.createElement('script');
    adsense.src = GOOGLE_AD_PLACEMENT_API;
    adsense['crossOrigin'] = 'anonymous';
    if (process.env['NODE_ENV'] === 'development') {
      adsense.setAttribute('data-adbreak-test', 'on');
    }
    adsense.setAttribute('data-ad-frequency-hint', '30s');
    adsense.onerror = (error) => {
      console.warn('Failed to load adsense', error);
    };
    const handleScriptLoad = () => {
      if (typeof window !== 'undefined' && window) {
        if (typeof adsbygoogle !== 'undefined' && adsbygoogle) {
          window.adsbygoogle = window.adsbygoogle || [];
          adBreak = function (o: AdBreak) {
            adsbygoogle.push(o);
          };
          adConfig = function (o: AdConfig) {
            adsbygoogle.push(o);
          };

          const adConfigPromise = new Promise<boolean>((resolve) =>
            adConfig({
              sound: 'on',
              preloadAdBreaks: 'on',
              onReady: () => resolve(true),
            })
          );
          const timeoutPromise = new Promise<boolean>((resolve) => {
            setTimeout(() => {
              resolve(false);
            }, ADSENSE_TIMEOUT);
          });

          Promise.race([adConfigPromise, timeoutPromise]).then((result) => {
            setLoading(false);
            setReady(result);
            setInitialized(true);
          });
        }
      } else {
        console.error('window is undefined');
      }
    };

    adsense.addEventListener('load', handleScriptLoad);

    documentRef.current.body.appendChild(adsense);

    return () => {
      adsense.removeEventListener('load', handleScriptLoad);
    };
  }, [initialized]);

  return { adBreak, adConfig, loading, ready, initialized };
};

export const useDetectAdBlock = () => {
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    // grab a domain from https://github1s.com/gorhill/uBlock/blob/master/docs/tests/hostname-pool.js
    const urls = [
      'https://www3.doubleclick.net',
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    ];
    Promise.all(
      urls.map((url) =>
        fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-store' })
      )
    )
      .then((responses) => {
        if (responses.some((response) => response.redirected)) {
          console.info('AdBlock detected');
          setAdBlockDetected(true);
        }
      })
      .catch(() => {
        console.info('AdBlock detected');
        setAdBlockDetected(true);
      });
  }, []);

  return adBlockDetected;
};
