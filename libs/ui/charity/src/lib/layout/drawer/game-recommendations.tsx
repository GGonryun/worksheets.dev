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
        <GameSection title="Popular this week" href="/c/popular">
          <GameIcon
            size={94}
            id="solitaire"
            name="Solitaire"
            banner="hot"
            iconUrl="https://storage.googleapis.com/game-logos/solitaire.jpg"
          />
          <GameIcon
            size={94}
            id="emoji-wars"
            name="Emoji Wars"
            banner="hot"
            iconUrl="https://storage.googleapis.com/game-logos/emoji-war.jpg"
          />
          <GameIcon
            size={94}
            id="chess-kata"
            name="Chess Kata"
            banner="hot"
            iconUrl="https://storage.googleapis.com/game-logos/chess-kata.jpg"
          />
          <GameIcon
            size={94}
            id="chess-kata"
            name="Nonograms"
            iconUrl="https://storage.googleapis.com/game-logos/nonograms.jpg"
          />
        </GameSection>
        <GameSection title="Recently played" href="/c/recent">
          <GameIcon
            size={94}
            id="word-search"
            name="Word Search"
            banner="played"
            iconUrl="https://storage.googleapis.com/game-logos/word-search.jpg"
          />
          <GameIcon
            size={94}
            id="word-smith"
            name="Word Smith"
            banner="played"
            iconUrl="https://storage.googleapis.com/game-logos/word-smith.jpg"
          />
          <GameIcon
            size={94}
            id="nonograms"
            name="Nonograms"
            banner="played"
            iconUrl="https://storage.googleapis.com/game-logos/nonograms.jpg"
          />
        </GameSection>
        <GameSection title="New games" href="/c/new">
          <GameIcon
            size={94}
            id="word-pack"
            name="Word Pack"
            banner="new"
            iconUrl="https://storage.googleapis.com/game-logos/word-pack.jpg"
          />
          <GameIcon
            size={94}
            id="puzzle-words"
            name="Puzzle Words"
            banner="new"
            iconUrl="https://storage.googleapis.com/game-logos/puzzle-words.jpg"
          />
          <GameIcon size={94} id="1" name="Placeholder" banner="new" />
        </GameSection>
        <GameSection title="Browse Categories" href="/c" />
        <GameSection title="Browse Games" href="/g" />
      </Box>
    </Box>
  );
};
