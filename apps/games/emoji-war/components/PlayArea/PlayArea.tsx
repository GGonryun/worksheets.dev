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
      column
      fullWidth
      maxWidth={400}
      centered
      py={1}
      gap={1}
      px={2}
      sx={{ overflow: 'hidden' }}
    >
      <ColorPlayArea color={color} count={combo} />
      <CardPlayArea disabled={disabled} cards={cards} onClick={executeAction} />
    </Flex>
  );
};
