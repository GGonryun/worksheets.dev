// https://developers.google.com/ad-placement/docs/placement-types
// https://developers.google.com/ad-placement/apis/adbreak
declare global {
  interface Window {
    adsbygoogle: any[];
  }

  const adsbygoogle: {
    push: (config: AdConfig | AdBreak) => void;
  };
}

export interface AdConfig {
  sound?: 'on' | 'off';
  preloadAdBreaks?: 'on' | 'off';
  onReady?: () => void;
}

export type PlacementInfo = {
  breakType: 'start' | 'reward' | 'next';
  breakName: string;
  breakFormat: 'interstitial' | 'reward';
  breakStatus:
    | 'notReady'
    | 'timeout'
    | 'error'
    | 'noAdPreloaded'
    | 'frequencyCapped'
    | 'ignored'
    | 'other'
    | 'dismissed'
    | 'viewed';
};

export type AdBreak = RewardAdBreak | InterstitialAdBreak;

export type InterstitialAdBreak = {
  type: 'start';
  name: string;
  beforeAd: () => void;
  afterAd: () => void;
  adBreakDone: (placementInfo: PlacementInfo) => void;
};

export type RewardAdBreak = {
  type: 'reward';
  name: string;
  beforeReward: (showAdFn: () => void) => void;
  beforeAd: () => void;
  adDismissed: () => void;
  adViewed: () => void;
  afterAd: () => void;
  adBreakDone?: (placementInfo: PlacementInfo) => void;
};
