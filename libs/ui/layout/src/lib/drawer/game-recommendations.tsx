import { FC } from 'react';
import { CategoryCarousel } from './category-carousel';
import { Recommendations } from '@worksheets/util/types';
import { GameSection } from './game-section';
import { GameIcon } from '@worksheets/ui/game-grid';
import Box from '@mui/material/Box';
import { ButtonPill } from '@worksheets/ui/pills';
import ShuffleIcon from '@mui/icons-material/Shuffle';

export type GameRecommendationProps = {
  hideCategories?: boolean;
  hideSections?: boolean;
  recommendations: Partial<Recommendations>;
  onRandomGame: () => void;
};

export const GameRecommendations: FC<GameRecommendationProps> = ({
  hideCategories,
  hideSections,
  recommendations: { popular = [], new: newGames = [], categories = [] },
  onRandomGame,
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
        <GameSection title="Browse Games" href="/" />
        <ButtonPill
          onClick={onRandomGame}
          text={{
            content: 'Random Game',
            color: 'text.primary',
            variant: 'h4',
          }}
          backgroundColor="highlight.main"
          Icon={ShuffleIcon}
        />
      </Box>
    </Box>
  );
};
