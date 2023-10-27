import { ShapeColor, Flex } from '@worksheets/ui-core';
import { CardSlot, PlayableCard } from '../Card';
import { FC } from 'react';
import { CardPlayArea } from './CardArea';
import { ColorPlayArea } from './ColorArea';

export type PlayAreaProps = {
  color: ShapeColor;
  combo: number;
  cards: CardSlot[];
  executeAction: (card: PlayableCard, index: number) => void;
  disabled?: boolean;
};
export const PlayArea: FC<PlayAreaProps> = ({
  cards,
  color,
  combo,
  disabled,
  executeAction,
}) => {
  return (
    <Flex
      className="play-area"
      column
      width={'min(45vh, 90vw)'}
      centered
      gap={1}
      px={2}
      pb={3}
      sx={{ overflow: 'hidden' }}
    >
      <ColorPlayArea color={color} count={combo} />
      <CardPlayArea disabled={disabled} cards={cards} onClick={executeAction} />
    </Flex>
  );
};
