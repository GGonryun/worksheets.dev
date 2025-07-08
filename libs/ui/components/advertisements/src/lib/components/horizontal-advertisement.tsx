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
  tall?: boolean;
  text?: boolean;
}> = ({ bordered, text, tall, unit }) => {
  useGoogleAdsense();
  return (
    <Box
      sx={{
        backgroundColor: 'white',
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
        <ResponsiveAdvertisement unit={unit} tall={tall} />
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
              fontSize: tall
                ? {
                    xs: '0.4rem',
                    sm: '0.5rem',
                  }
                : { xs: '0.3rem', sm: '0.35rem', md: '0.4rem' },
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
  tall?: boolean;
  unit: AdUnit;
}> = ({ tall, unit }) => {
  const adUnit = AD_UNITS[unit];
  return (
    <Box
      sx={{
        display: 'block',
        width: '100%',
        height: tall
          ? { xs: '80px', sm: '90px', md: '100px', lg: '110px', xl: '120px' }
          : {
              xs: '50px',
              sm: '60px',
              md: '70px',
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
