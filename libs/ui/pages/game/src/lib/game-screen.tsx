import { FC, ReactNode } from 'react';
import { ScreenBox } from './screen-box';
import { GameBox } from './game-box';
import {
  GRID_ITEM_SIZE,
  MixedGridItem,
  MixedGridItems,
} from '@worksheets/ui/game-grid';
import { DescriptionBox } from './description-box';
import { AdvertisementBox } from './advertisement-box';
import { gameHorizontalAd } from '@worksheets/data-access/charity-games';
import { HorizontalAdvertisement } from '@worksheets/ui/advertisements';
import Container from '@mui/material/Container';

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
        <AdvertisementBox>
          {<HorizontalAdvertisement {...gameHorizontalAd} />}
        </AdvertisementBox>
      </ScreenBox>
    </Container>
  );
};
