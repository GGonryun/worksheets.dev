import { NavigateBefore } from '@mui/icons-material';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { ResponsiveImage } from '@worksheets/ui/components/images';
import { PrizesCarousel, PrizesGroup } from '@worksheets/ui/components/prizes';
import { routes } from '@worksheets/ui/routes';
import {
  BasicRaffleDetails,
  DetailedPrizeSchema,
  PrizeSchema,
} from '@worksheets/util/types';

import { CustomContainer } from '../shared/custom-container';
import { PrizeDescription } from './prize-description';
import { RafflesDescription } from './raffles-description';

export const PrizeScreen: React.FC<{
  prize: DetailedPrizeSchema;
  activeRaffles: BasicRaffleDetails[];
  expiredRaffles: BasicRaffleDetails[];
  suggestions: { similar: PrizeSchema[]; active: PrizeSchema[] };
  onShare: () => void;
}> = ({ prize, activeRaffles, expiredRaffles, suggestions, onShare }) => (
  <CustomContainer>
    <Box display="flex" flexDirection="column" gap={4}>
      <Button
        href={routes.prizes.path()}
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

      <PrizeHeader prize={prize} />
      <PrizeDescription prize={prize} onShare={onShare} />
      <RafflesDescription
        prizeName={prize.name}
        activeRaffles={activeRaffles}
        expiredRaffles={expiredRaffles}
      />
      {Boolean(suggestions.active.length) && (
        <PrizesCarousel title="Active Prizes" prizes={suggestions.active} />
      )}
      {Boolean(suggestions.similar) && (
        <PrizesGroup title="Similar Prizes" prizes={suggestions.similar} />
      )}
    </Box>
  </CustomContainer>
);

const PrizeHeader: React.FC<{ prize: DetailedPrizeSchema }> = ({ prize }) => {
  const theme = useTheme();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography typography={{ xs: 'h5', sm: 'h4', md: 'h3' }}>
        {prize.name}
      </Typography>
      <Typography>{prize.headline}</Typography>
      <Box
        width="100%"
        height="100%"
        maxWidth={{ xs: '90%', sm: 600 }}
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
