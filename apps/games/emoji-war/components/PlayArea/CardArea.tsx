import { FC } from 'react';
import {
  Card,
  CardSlot,
  PlaceholderCard,
  PlayableCard,
  isPlayableCard,
} from '../Card';
import { RESPAWN_CARD_TIMER } from '../settings';
import { Flex } from '@worksheets/ui-core';

export const CardPlayArea: FC<{
  disabled?: boolean;
  cards: CardSlot[];
  onClick: (card: PlayableCard, index: number) => void;
}> = ({ cards, onClick, disabled }) => {
  return (
    <Flex gap={1} fullWidth>
      {cards.map((card, index) =>
        isPlayableCard(card) ? (
          <Card
            disabled={disabled}
            key={index}
            type={card.type}
            color={card.color}
            onClick={() => {
              onClick(card, index);
            }}
          />
        ) : (
          <PlaceholderCard
            key={index}
            timer={card.duration}
            max={RESPAWN_CARD_TIMER}
          />
        )
      )}
    </Flex>
  );
};
