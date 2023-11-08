import { Box } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { Point, areEqual } from '@worksheets/util-coordinates';
import { LayoutGroup } from 'framer-motion';
import { GameBoard } from './GameBoard';
import { GameUnit } from './GameUnit';
import { OPPOSITE_COLOR, PlayerColor } from '../util/board';
import { PlayingCard } from './PlayingCard';
import { PlayingCardType } from '../util/playing-cards';

const TOP_STARTING_POINTS = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
  { x: 4, y: 0 },
];

const BOTTOM_STARTING_POINTS = [
  { x: 0, y: 4 },
  { x: 1, y: 4 },
  { x: 2, y: 4 },
  { x: 3, y: 4 },
  { x: 4, y: 4 },
];
/**
 * Movement Controller
 * We'll always have the red player ontop, but visually they may be on the bottom. The bottom pieces are always the current player. Sometimes the current player is red and sometimes they are blue so the screen will flip depending on the orientation.
 * Let's pretend that the enemy is red, and the red player makes a move. The red player will need to flip their movement grid.
 * If the player is red, then there is no movement grid flip
 * Would it be more clear to have the lower player always be the red player? And orientation would flip to make the top player blue? this is sort of how the cards are now conceptually only tho.
 */

export const GamePage = () => {
  const BOARD_ORIENTATION: PlayerColor = 1;
  const CARD_SIZE = 103.6;
  const BOARD_SIZE = 325;
  const [red, setRed] = useState<Point[]>(TOP_STARTING_POINTS);
  const [blue, setBlue] = useState<Point[]>(BOTTOM_STARTING_POINTS);

  const renderRedTile = useCallback(
    (p: Point) => {
      for (let i = 0; i < red.length; i++) {
        if (areEqual(p, red[i])) {
          return <GameUnit color={PlayerColor.Red} id={i} zIndex={1} />;
        }
      }
    },
    [red]
  );

  const renderBlueTile = useCallback(
    (p: Point) => {
      for (let i = 0; i < blue.length; i++) {
        if (areEqual(p, blue[i])) {
          return <GameUnit color={PlayerColor.Blue} id={i} zIndex={2} />;
        }
      }
    },
    [blue]
  );

  return (
    <LayoutGroup>
      <Box p={3} display="flex" flexDirection="column" gap={1}>
        <PlayerCards
          size={CARD_SIZE}
          flipped
          player={OPPOSITE_COLOR[BOARD_ORIENTATION]}
          cards={[PlayingCardType.Bishop, PlayingCardType.Blacksmith]}
          pending={PlayingCardType.Swordsman}
          onClick={(index) => {
            alert(
              `Clicked card ${index}, enemy, color ${
                PlayerColor[OPPOSITE_COLOR[BOARD_ORIENTATION]]
              }`
            );
          }}
        />
        <GameBoard
          size={BOARD_SIZE}
          orientation={BOARD_ORIENTATION}
          renderRedTile={renderRedTile}
          renderBlueTile={renderBlueTile}
          onClick={(tile) => {
            alert(`Clicked tile (x: ${tile.x}, y: ${tile.y})`);
          }}
        />
        <PlayerCards
          size={CARD_SIZE}
          player={BOARD_ORIENTATION}
          cards={[PlayingCardType.Bishop, PlayingCardType.Blacksmith]}
          pending={undefined}
          onClick={(card) => {
            alert(
              `Clicked card ${card}, player, color ${PlayerColor[BOARD_ORIENTATION]}`
            );
          }}
        />
      </Box>
    </LayoutGroup>
  );
};

const PlayerCards: FC<{
  cards: PlayingCardType[];
  size: number;
  pending?: PlayingCardType;
  player: PlayerColor;
  flipped?: boolean;
  onClick: (card: PlayingCardType) => void;
}> = ({ size, cards, pending, player, flipped, onClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        gap: size * 0.005,
      }}
    >
      {cards.map((card) => (
        <PlayingCard
          key={card}
          type={card}
          size={size}
          player={player}
          flipped={flipped}
          onClick={() => onClick(card)}
        />
      ))}
      {pending != null && (
        <PlayingCard
          pending
          type={pending}
          size={size}
          player={OPPOSITE_COLOR[player]}
          flipped={!flipped}
        />
      )}
    </Box>
  );
};
