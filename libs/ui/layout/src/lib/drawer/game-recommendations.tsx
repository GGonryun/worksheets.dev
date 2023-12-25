import { FC } from 'react';
import { CategoryCarousel } from './category-carousel';
import { Recommendations } from '@worksheets/util/types';
import { GameSection } from './game-section/game-section';
import { GameIcon } from '@worksheets/ui/game-grid';
import Box from '@mui/material/Box';

export type GameRecommendationProps = {
  hideCategories?: boolean;
  hideSections?: boolean;
  recommendations: Partial<Recommendations>;
};

export const GameRecommendations: FC<GameRecommendationProps> = ({
  hideCategories,
  hideSections,
  recommendations: { popular = [], new: newGames = [], categories = [] },
}) => {
  return (
    <Box>
      {!hideCategories && <CategoryCarousel categories={categories} />}
      <Box
        flexDirection="column"
        mt={1}
        gap={3}
        display={hideSections ? 'none' : 'flex'}
      >
        <GameSection title="Popular this week" href="/tags/popular">
          {popular.map((game) => (
            <GameIcon key={game.id} size={94} {...game} />
          ))}
        </GameSection>
        <GameSection title="New games" href="/tags/new">
          {newGames.map((game) => (
            <GameIcon key={game.id} size={94} {...game} />
          ))}
        </GameSection>
      </Box>
    </Box>
  );
};
