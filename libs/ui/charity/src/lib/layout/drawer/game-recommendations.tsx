import { Box } from '@mui/material';
import { FC } from 'react';
import { GameIcon } from '../../games/game-icon';
import { GameSection } from '../../games/game-section';
import { CategoryCarousel } from './category-carousel';

export type GameRecommendationProps = {
  hideCategories?: boolean;
};

export const GameRecommendations: FC<GameRecommendationProps> = ({
  hideCategories,
}) => {
  return (
    <Box>
      {!hideCategories && (
        <CategoryCarousel
          onClick={(category) => alert(`TODO: handle ${category} click`)}
        />
      )}
      <Box>
        <GameSection title="Popular this week">
          <GameIcon
            name="solitaire"
            banner="hot"
            iconUrl="https://storage.googleapis.com/game-logos/solitaire.jpg"
          />
          <GameIcon
            name="Emoji Wars"
            banner="hot"
            iconUrl="https://storage.googleapis.com/game-logos/emoji-war.jpg"
          />
          <GameIcon
            name="Chess Kata"
            banner="hot"
            iconUrl="https://storage.googleapis.com/game-logos/chess-kata.jpg"
          />
          <GameIcon
            name="Nonograms"
            iconUrl="https://storage.googleapis.com/game-logos/nonograms.jpg"
          />
        </GameSection>
        <GameSection title="Recently played">
          <GameIcon
            name="Word Search"
            banner="played"
            iconUrl="https://storage.googleapis.com/game-logos/word-search.jpg"
          />
          <GameIcon
            name="Word Smith"
            banner="played"
            iconUrl="https://storage.googleapis.com/game-logos/word-smith.jpg"
          />
          <GameIcon
            name="Nonograms"
            banner="played"
            iconUrl="https://storage.googleapis.com/game-logos/nonograms.jpg"
          />
        </GameSection>
        <GameSection title="New games">
          <GameIcon
            name="Word Pack"
            banner="new"
            iconUrl="https://storage.googleapis.com/game-logos/word-pack.jpg"
          />
          <GameIcon
            name="Puzzle Words"
            banner="new"
            iconUrl="https://storage.googleapis.com/game-logos/puzzle-words.jpg"
          />
          <GameIcon name="Placeholder" banner="new" />
        </GameSection>
        <GameSection title="Originals">
          <GameIcon name="solitaire" />
        </GameSection>
      </Box>
    </Box>
  );
};
