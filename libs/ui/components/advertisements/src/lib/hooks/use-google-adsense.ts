import { useEffect, useRef } from 'react';
import { AdBreak, AdConfig } from 'types/adsense';
import { create } from 'zustand';

import { GOOGLE_AD_PLACEMENT_API } from '../data';

type AdBreakFunction = (o: AdBreak) => void;
type AdConfigFunction = (o: AdConfig) => void;
interface AdsenseFunctionsState {
  initialized: boolean;
  loading: boolean;
  ready: boolean;
  setLoading: (loading: boolean) => void;
  setReady: (ready: boolean) => void;
  adBreak: AdBreakFunction;
  adConfig: AdConfigFunction;
  setFunctions: (fns: {
    adBreak: AdBreakFunction;
    adConfig: AdConfigFunction;
  }) => void;
}

const useAdsenseFunctions = create<AdsenseFunctionsState>((set) => ({
  initialized: false,
  loading: true,
  ready: false,
  setLoading: (loading: boolean) => {
    set({ loading });
  },
  setReady: (ready: boolean) => {
    set({ ready });
  },
  adBreak: (o: AdBreak) => {
    console.warn('adBreak is not defined', o);
  },
  adConfig: (o: AdConfig) => {
    console.warn('adConfig is not defined', o);
  },
  setFunctions: (fns: {
    adBreak: (o: AdBreak) => void;
    adConfig: (o: AdConfig) => void;
  }) => {
    set((state) => ({
      ...state,
      ...fns,
      initialized: true,
    }));
  },
}));

const ADSENSE_TIMEOUT = 5000;

export const useGoogleAdsense = () => {
  const documentRef = useRef<Document>(document);

  const {
    adBreak,
    adConfig,
    setFunctions,
    initialized,
    loading,
    ready,
    setLoading,
    setReady,
  } = useAdsenseFunctions();

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
          const adBreak = function (o: AdBreak) {
            adsbygoogle.push(o);
          };
          const adConfig = function (o: AdConfig) {
            adsbygoogle.push(o);
          };

          setFunctions({ adBreak, adConfig });

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
  }, [initialized, setFunctions, setLoading, setReady]);

  return { adBreak, adConfig, loading, ready, initialized };
};
