import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

import { GOOGLE_PUBLISHER_ID } from '../data';
import { useGoogleAdsense } from '../hooks';

export const HorizontalAdvertisement: FC<{
  slot: string;
  bordered?: boolean;
  text?: boolean;
}> = ({ bordered, text, slot }) => {
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
        <ResponsiveAdvertisement slot={slot} />
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
              fontSize: { xs: '0.3rem', sm: '0.35rem', md: '0.4rem' },
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

export const ResponsiveAdvertisement: FC<{ slot: string }> = ({ slot }) => {
  return (
    <Box
      sx={{
        display: 'block',
        width: '100%',
        height: {
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
        data-ad-slot={slot}
        data-full-width-responsive="true"
        data-ad-format="auto"
      />
    </Box>
  );
};
