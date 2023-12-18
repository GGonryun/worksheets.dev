import { FC } from 'react';
import { CategoryCarousel } from './category-carousel';
import { Recommendations } from '@worksheets/util/types';
import { GameSection } from './game-section';
import { GameIcon } from '@worksheets/ui/game-grid';
import Box from '@mui/material/Box';
import { ButtonPill } from '@worksheets/ui/pills';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

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
      <Box mt={2} display="flex" gap={2} flexDirection="column">
        <ButtonPill
          href="/play"
          text={{
            content: 'All Games',
            color: 'primary.contrastText',
            variant: 'h4',
          }}
          backgroundColor="error.main"
          Icon={SportsEsportsOutlinedIcon}
        />
        <ButtonPill
          href="/tags"
          text={{
            content: 'All Categories',
            color: 'primary.contrastText',
            variant: 'h4',
          }}
          backgroundColor="primary.main"
          Icon={LocalOfferOutlinedIcon}
        />
        <ButtonPill
          onClick={onRandomGame}
          text={{
            content: 'Random ',
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
