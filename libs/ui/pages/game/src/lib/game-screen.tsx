import { FC, ReactNode } from 'react';
import { ScreenBox } from './screen-box';
import { GameBox } from './game-box';
import {
  GRID_ITEM_SIZE,
  MixedGridItem,
  MixedGridItems,
} from '@worksheets/ui/game-grid';
import { DescriptionBox } from './description-box';
import { Container } from '@mui/material';
import { AdvertisementBox } from './advertisement-box';

type GameScreenProps = {
  suggestions: MixedGridItem[];
  description: ReactNode;
  game: ReactNode;
};

export const GameScreen: FC<GameScreenProps> = ({
  suggestions,
  description,
  game,
}) => {
  return (
    <Container maxWidth="lg" disableGutters sx={{ py: 2 }}>
      <ScreenBox>
        <MixedGridItems items={suggestions} size={GRID_ITEM_SIZE} />
        <GameBox>{game}</GameBox>
        <DescriptionBox>{description}</DescriptionBox>
        <AdvertisementBox />
      </ScreenBox>
    </Container>
  );
};
