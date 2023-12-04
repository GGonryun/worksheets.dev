import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

export const HorizontalAdvertisement: FC<{
  slot: string;
  client: string;
  bordered?: boolean;
}> = ({ bordered, ...props }) => (
  <Box
    sx={{
      position: 'relative',
      display: 'flex',
      height: '100%',
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
      <ResponsiveAdvertisement {...props} />
    </Box>
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
          fontSize: '0.5rem',
          opacity: 0.7,
          letterSpacing: '1px',
        }}
      >
        Advertisement
      </Typography>
    </Box>
  </Box>
);

export const ResponsiveAdvertisement: FC<{ slot: string; client: string }> = ({
  slot,
  client,
}) => {
  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          minWidth: '250px',
          maxWidth: '1070px',
          width: '100%',
          height: '90px',
        }}
        data-ad-client={client}
        data-ad-slot={slot}
      />
    </div>
  );
};
