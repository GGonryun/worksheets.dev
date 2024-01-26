import { NavigateBefore } from '@mui/icons-material';
import { Box, Container, Link, Typography } from '@mui/material';
import {
  PrizeSchema,
  TitledPrizeCarousel,
} from '@worksheets/ui/components/prizes';

import { CustomContainer } from '../shared/custom-container';
import { PrizeDescription } from './prize-description';
import { PrizeDetails } from './prize-details';

export const PrizeDetailsScreen: React.FC<{
  suggestedPrizes: PrizeSchema[];
  prize: PrizeSchema;
}> = ({ suggestedPrizes, prize }) => (
  <CustomContainer>
    <Container
      maxWidth="md"
      disableGutters
      sx={{
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <AllPrizesLink />
      <PrizeDetails {...prize} />
    </Container>

    <Gutter />

    <PrizeDescription description={prize.description} />

    <Gutter />

    <TitledPrizeCarousel items={suggestedPrizes} title="Prizes for you" />
  </CustomContainer>
);

const AllPrizesLink = () => (
  <Link
    href="/prizes"
    color="white.main"
    sx={{
      display: 'flex',
      gap: 0.5,
      pl: -0.5,
    }}
  >
    <NavigateBefore />
    <Typography>All Prizes</Typography>
  </Link>
);

const Gutter = () => <Box my={{ xs: 1, sm: 2 }} />;
