import { Box } from '@mui/material';
import { FC } from 'react';
import { GameIcon } from '../../games/game-icon';
import { GameSection } from '../../games/game-section';
import { CategoryCarousel } from './category-carousel';
import { Recommendations } from '../../../types';

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
        gap={1}
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
      <Box mt={1}>
        <GameSection title="Browse Categories" href="/tags" />
        <GameSection title="Browse Games" href="/games" />
      </Box>
    </Box>
  );
};
