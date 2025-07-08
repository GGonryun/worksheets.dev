import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

import { GOOGLE_PUBLISHER_ID } from '../data';
import { useGoogleAdsense } from '../hooks';

type AdFormat = 'auto' | 'autorelaxed';

type AdUnit = 'game-frame' | 'raffles' | 'raffle';

const AD_UNITS: Record<
  AdUnit,
  {
    name: string;
    slot: string;
    format: AdFormat;
  }
> = {
  'game-frame': {
    name: 'Bottom of Game Frame',
    slot: '4318442660',
    format: 'auto',
  },
  raffles: {
    name: 'Raffles Page',
    slot: '6739186907',
    format: 'auto',
  },
  raffle: {
    name: 'Raffle Page',
    slot: '5644809344',
    format: 'autorelaxed',
  },
};

export const HorizontalAdvertisement: FC<{
  unit: AdUnit;
  bordered?: boolean;
  text?: boolean;
}> = ({ bordered, text, unit }) => {
  useGoogleAdsense();
  return (
    <Box
      sx={{
        backgroundColor: 'whitesmoke',
        position: 'relative',
        display: 'flex',
        height: 'fit-content',
        width: '100%',
        border: bordered ? '1px solid' : 'none',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: 'calc(100% - 14px)',
          display: 'flex',
        }}
      >
        <ResponsiveAdvertisement unit={unit} />
      </Box>
      {text && (
        <Box
          sx={{
            transform: 'rotate(90deg)',
            transformOrigin: 'right center',
            height: '14px',
            right: '14px',
            top: '84%',
            position: 'absolute',
            lineHeight: '0',
          }}
        >
          <Typography
            variant="body3"
            sx={{
              textTransform: 'uppercase',
              textAlign: 'center',
              fontSize: {
                xs: '0.3rem',
                sm: '0.4rem',
                lg: '0.5rem',
                xl: '0.6rem',
              },
              opacity: 0.7,
              letterSpacing: '1px',
            }}
          >
            Advertisement
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export const ResponsiveAdvertisement: FC<{
  unit: AdUnit;
}> = ({ unit }) => {
  const adUnit = AD_UNITS[unit];
  return (
    <Box
      sx={{
        display: 'block',
        width: '100%',
        height: {
          xs: '60px',
          sm: '70px',
          md: '80px',
          lg: '90px',
          xl: '100px',
        },
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
        data-ad-client={GOOGLE_PUBLISHER_ID}
        data-ad-slot={adUnit.slot}
        data-full-width-responsive="true"
        data-ad-format={adUnit.format}
      />
    </Box>
  );
};
