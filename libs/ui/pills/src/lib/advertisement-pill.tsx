import { FC } from 'react';
import Box from '@mui/material/Box';

export type AdvertisementPillProps = {
  slot: string;
  client: string;
};
export const AdvertisementPill: FC<AdvertisementPillProps> = (props) => (
  <Box
    sx={{
      position: 'relative',
      display: 'grid',
      placeItems: 'center',
      width: '100%',
      height: '100%',
      userSelect: 'none',
    }}
  >
    <SquareAdvertisement {...props} />
  </Box>
);

const SquareAdvertisement: FC<AdvertisementPillProps> = ({ slot, client }) => {
  return (
    <ins
      className="adsbygoogle"
      style={{
        display: 'inline-block',
        width: '190px',
        height: '190px',
      }}
      data-ad-client={client}
      data-ad-slot={slot}
    ></ins>
  );
};
