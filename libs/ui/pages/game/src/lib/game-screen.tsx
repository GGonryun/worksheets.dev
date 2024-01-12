import Container from '@mui/material/Container';
import { gameHorizontalAd } from '@worksheets/data-access/charity-games';
import { HorizontalAdvertisement } from '@worksheets/ui/advertisements';
import {
  GRID_ITEM_SIZE,
  MixedGridItem,
  MixedGridItems,
} from '@worksheets/ui/game-grid';
import { FC, ReactNode } from 'react';

import { AdvertisementBox } from './advertisement-box';
import { DescriptionBox } from './description-box';
import { GameBox } from './game-box';
import { ScreenBox } from './screen-box';

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
