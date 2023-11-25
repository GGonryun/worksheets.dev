import { FC, ReactNode } from 'react';
import { ScreenBox } from './screen-box';
import { GameBox } from './game-box';
import { MixedGridItem, MixedGridItems } from '../../games/mixed-grid-items';
import { DescriptionBox } from './description-box';

type GameScreenProps = {
  suggestions: MixedGridItem[];
  description: ReactNode;
};

export const GameScreen: FC<GameScreenProps> = ({
  suggestions,
  description,
}) => {
  return (
    <ScreenBox>
      <MixedGridItems items={suggestions} />
      <GameBox>Game Section</GameBox>
      <DescriptionBox>{description}</DescriptionBox>
    </ScreenBox>
  );
};
