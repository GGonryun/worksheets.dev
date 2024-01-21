import { Box } from '@mui/material';

import { CustomContainer } from '../shared/custom-container';
import { TitledPrizeCarousel } from '../shared/titled-prize-carousel';
import { useRaffleScreenContext } from './context';
import { FancySearch } from './fancy-search';
import { RaffleList } from './raffle-list';
import { TitleText } from './title-text';

export const PrizeWallScreen: React.FC = () => {
  const { hottest } = useRaffleScreenContext();

  return (
    <CustomContainer>
      <TitleText />

      <Box my={{ xs: 0.5, sm: 1 }} />
      <FancySearch />
      <Box my={{ xs: 1, sm: 2, md: 3 }} />
      <TitledPrizeCarousel items={hottest} title="Hottest Prizes" />

      <RaffleList />
    </CustomContainer>
  );
};

export type PrizeWallScreenProps = React.ComponentProps<typeof PrizeWallScreen>;
