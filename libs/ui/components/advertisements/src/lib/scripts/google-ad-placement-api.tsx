import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { AdBreak, AdConfig } from 'types/adsense';

let adBreak = function (o: AdBreak) {
  console.error('adBreak is not defined', o);
};
let adConfig = function (o: AdConfig) {
  console.error('adConfig is not defined', o);
};

if (typeof window !== 'undefined' && window) {
  if (typeof adsbygoogle !== 'undefined' && adsbygoogle) {
    window.adsbygoogle = window.adsbygoogle || [];
    adBreak = function (o: AdBreak) {
      adsbygoogle.push(o);
    };
    adConfig = function (o: AdConfig) {
      adsbygoogle.push(o);
    };
    adConfig({
      sound: 'on',
      preloadAdBreaks: 'on',
    });
  }
} else {
  console.error('window is undefined');
}

export const useGoogleAdPlacement = () => {
  return { adBreak, adConfig };
};

export const GoogleAdPlacement: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    adBreak({
      type: 'reward',
      name: 'restart-game',
      beforeReward(showAdFn) {
        showAdFn();
      },
      beforeAd() {
        //
      },
      adDismissed() {
        //
      },
      adViewed() {
        //
      },
      afterAd() {
        setShow(true);
      },
    });
  };

  return (
    <Box>
      <Button variant="arcade" onClick={handleClick}>
        Show Advertisement
      </Button>
      <Typography>
        {show ? 'Advertisement is showing' : 'Advertisement is hidden'}
      </Typography>
    </Box>
  );
};
