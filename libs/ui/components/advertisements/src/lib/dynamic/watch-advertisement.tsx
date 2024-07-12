import { FeaturedVideoOutlined, StarBorder } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { PaletteColor } from '@worksheets/ui/theme';
import { noop } from '@worksheets/util/misc';
import { useState } from 'react';

import { AdBlockModal } from '../components';
import { useDetectAdBlock, useGoogleAdsense } from '../hooks';

export const WatchAdvertisement: React.FC<{
  onSubmit: () => void;
  disabled?: boolean;
  buttonColor?: PaletteColor;
  buttonText: string;
}> = ({ onSubmit, disabled, buttonText, buttonColor = 'primary' }) => {
  const snackbar = useSnackbar();
  const { loading, ready, adBreak } = useGoogleAdsense();
  const adBlockDetected = useDetectAdBlock();
  const [adComplete, setAdComplete] = useState(false);
  const [showAdBlockModal, setShowAdBlockModal] = useState(false);

  const handleSkipAd = () => {
    setShowAdBlockModal(false);
    setAdComplete(true);
  };

  const handleShowAd = () => {
    if (adBlockDetected) {
      setShowAdBlockModal(true);
      return;
    }

    adBreak({
      type: 'reward',
      name: 'quest',
      beforeReward: (showAdFn) => {
        showAdFn();
      },
      beforeAd: noop,
      adDismissed: noop,
      adViewed: noop,
      afterAd: noop,
      adBreakDone: (placementInfo) => {
        switch (placementInfo.breakStatus) {
          case 'viewed':
            snackbar.success('Thank you for watching the ad!');
            break;
          case 'dismissed':
            snackbar.warning('The ad was dismissed early.');
            break;
          default:
            snackbar.error('We failed to load an ad.');
            break;
        }
        setAdComplete(true);
      },
    });
  };

  return (
    <>
      <Column>
        {adComplete ? (
          <Button
            variant="arcade"
            color="success"
            startIcon={<StarBorder />}
            onClick={onSubmit}
          >
            Claim Reward
          </Button>
        ) : (
          <Button
            variant="arcade"
            color={buttonColor}
            startIcon={<FeaturedVideoOutlined />}
            disabled={disabled || (!adBlockDetected && (loading || !ready))}
            onClick={handleShowAd}
          >
            {buttonText}
          </Button>
        )}
      </Column>
      <AdBlockModal
        open={showAdBlockModal}
        onClose={handleSkipAd}
        message="You'll still get your reward without ads"
      />
    </>
  );
};
