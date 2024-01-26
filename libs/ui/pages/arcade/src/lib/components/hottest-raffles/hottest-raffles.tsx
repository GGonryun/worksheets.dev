import { Box } from '@mui/material';
import { TitledSection } from '@worksheets/ui/components/arcade';
import { Prize, PrizeProps } from '@worksheets/ui/components/prizes';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import React from 'react';

export type HottestRafflesProps = React.ComponentProps<typeof HottestRaffles>;

export const HottestRaffles: React.FC<{ prizes: PrizeProps[] }> = ({
  prizes,
}) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isDesktop1 = useMediaQuery((theme) =>
    theme.breakpoints.down('desktop1')
  );
  const isMedium = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isLarge = useMediaQuery((theme) => theme.breakpoints.down('xl'));

  if (isMobile) {
    prizes = prizes.slice(0, 6);
  } else if (isSmall) {
    prizes = prizes.slice(0, 6);
  } else if (isDesktop1) {
    prizes = prizes.slice(0, 4);
  } else if (isMedium) {
    prizes = prizes.slice(0, 5);
  } else if (isLarge) {
    prizes = prizes.slice(0, 6);
  } else {
    prizes = prizes.slice(0, 6);
  }

  return (
    <TitledSection
      title={'Hottest Raffles'}
      action={{
        color: 'success',
        text: 'All Raffles',
        href: '/prizes',
      }}
    >
      {prizes.map((prize) => (
        <Box key={prize.id}>
          <Prize {...prize} />
        </Box>
      ))}
    </TitledSection>
  );
};
