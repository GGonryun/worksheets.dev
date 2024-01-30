import Box from '@mui/material/Box';
import { Recommendations } from '@worksheets/util/types';
import { FC } from 'react';

import { CategorySection } from './category-section/category-section';
import { GameSection } from './game-section/game-section';
import { NoRecentGamesPlaceholder } from './no-recent-games-placeholder/no-recent-games-placeholder';

export type GameRecommendationProps = {
  hideCategories?: boolean;
  hideSections?: boolean;
  recommendations: Partial<Recommendations>;
};

export const GameRecommendations: FC<GameRecommendationProps> = ({
  hideCategories,
  hideSections,
  recommendations: {
    popular = [],
    new: newGames = [],
    categories = [],
    recent = [],
  },
}) => {
  return (
    <Box>
      {!hideCategories && <CategorySection categories={categories} />}
      <Box
        display={hideSections ? 'none' : 'flex'}
        flexDirection="column"
        mt={1}
        gap={3}
      >
        <GameSection
          title="Popular this week"
          href="/tags/popular"
          games={popular}
        />
        <GameSection title="New games" href="/tags/new" games={newGames} />
        <GameSection
          title="Recently Played"
          games={recent}
          placeholder={<NoRecentGamesPlaceholder />}
        />
      </Box>
    </Box>
  );
};
