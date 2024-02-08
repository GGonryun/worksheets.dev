import { NavigateBefore } from '@mui/icons-material';
import { Box, Button, Link, Typography, useTheme } from '@mui/material';
import { ResponsiveImage } from '@worksheets/ui/components/images';
import { PrizesGroup } from '@worksheets/ui/components/prizes';
import {
  BasicRaffleDetails,
  DetailedPrizeSchema,
} from '@worksheets/util/types';

import { CustomContainer } from '../shared/custom-container';
import { PrizeDescription } from './prize-description';
import { RafflesDescription } from './raffles-description';

export const PrizeScreen: React.FC<{
  prize: DetailedPrizeSchema;
  activeRaffles: BasicRaffleDetails[];
  expiredRaffles: BasicRaffleDetails[];
  suggestions: DetailedPrizeSchema[];
  onShare: () => void;
}> = ({ prize, activeRaffles, expiredRaffles, suggestions, onShare }) => (
  <CustomContainer>
    <Box display="flex" flexDirection="column" gap={4}>
      <Button
        href="/prizes"
        color="white"
        startIcon={<NavigateBefore />}
        sx={{
          textDecoration: 'underline',
          alignSelf: 'flex-start',
          width: 'fit-content',
        }}
      >
        All Prizes
      </Button>
      <Link color="inherit" underline="hover" variant="body1" href="/prizes">
        The Prize Wall
      </Link>

      <PrizeHeader prize={prize} />
      <PrizeDescription prize={prize} onShare={onShare} />
      <RafflesDescription
        prizeName={prize.name}
        activeRaffles={activeRaffles}
        expiredRaffles={expiredRaffles}
      />
      <PrizesGroup title={'Similar Prizes'} prizes={suggestions} />
    </Box>
  </CustomContainer>
);

const PrizeHeader: React.FC<{ prize: DetailedPrizeSchema }> = ({ prize }) => {
  const theme = useTheme();
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h4">{prize.name}</Typography>
      <Typography>{prize.headline}</Typography>
      <Box
        width="auto"
        height="100%"
        position="relative"
        px={{ xs: 2, sm: 4 }}
        py={2}
      >
        <ResponsiveImage
          src={prize.imageUrl}
          alt={prize.name}
          style={{
            borderRadius: '24px',
            boxShadow: theme.shadows[10],
          }}
        />
      </Box>
    </Box>
  );
};
