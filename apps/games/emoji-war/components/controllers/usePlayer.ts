import { useEffect, useState } from 'react';
import { BoardPosition } from '../Board';
import { ShapeColor } from '@worksheets/ui-core';
import {
  PlayableCard,
  cardCategory,
  MovementCardType,
  AttackCardType,
  attackAction,
  movementAction,
  ComboColor,
} from '../Card';
import { BOARD_GRID_SIZE, CLEAR_ATTACKS_TIMER } from '../settings';

type UsePlayerOptions = {
  slot: number;
  hp: number;
  onGameOver: () => void;
};

type PlayerController = {
  slot: number;
  position: BoardPosition;
  attacks: BoardPosition[];
  health: number;
  applyDamage: () => void;
  executeCombo: (color: ShapeColor) => void;
  performAction: (card: PlayableCard) => void;
  reset: () => void;
};

type PlayerControllerHook = (options: UsePlayerOptions) => PlayerController;

export const usePlayer: PlayerControllerHook = ({ slot, hp, onGameOver }) => {
  const [health, setHealth] = useState(hp);
  const [position, setPosition] = useState<BoardPosition>({ x: 1, y: 1 });
  const [attacks, setAttacks] = useState<BoardPosition[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  useEffect(() => {
    if (health === 0) {
      return onGameOver();
    }
    // do not rerender if onGameOver changes which it does because it is a callback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [health]);

  const performAction = (card: PlayableCard) => {
    const category = cardCategory[card.type];
    if (category === 'movement') {
      const movement: MovementCardType = card.type as MovementCardType;
      const newPosition = applyMovement(position, movement);
      setPosition(newPosition);
    } else if (category === 'sword') {
      const attack: AttackCardType = card.type as AttackCardType;
      const incomingAttacks = attackAction[attack];
      setAttacks((a) => a.concat(incomingAttacks));

      // clear recently set attacks
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(undefined);
      }

      setTimeoutId(
        setTimeout(() => {
          setAttacks([]);
        }, CLEAR_ATTACKS_TIMER)
      );
    } else {
      throw new Error('unknown card action performed');
    }
  };

  const executeCombo = (color: ShapeColor) => {
    // clear any recently set attacks
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(undefined);
    }
    // select new attacks
    const c = color as ComboColor;
    const attacks = colorAction[c];
    // set the attacks
    setAttacks((a) => a.concat(attacks));
    // set a timeout to clear the attack map
    setTimeoutId(
      setTimeout(() => {
        setAttacks([]);
      }, CLEAR_ATTACKS_TIMER)
    );
  };

  const applyDamage = () => {
    setHealth((h) => h - 1);
  };

  return {
    slot,
    position,
    attacks,
    health,
    applyDamage,
    executeCombo,
    performAction,
    reset: () => {
      setPosition({ x: 1, y: 1 });
      setHealth(hp);
      setAttacks([]);
    },
  };
};

const applyMovement = (position: BoardPosition, movement: MovementCardType) => {
  // do not allow player to move off the board
  const action = movementAction[movement];
  const max = BOARD_GRID_SIZE - 1;

  const newPosition = {
    x: position.x + action.x,
    y: position.y + action.y,
  };

  if (newPosition.x < 0) {
    newPosition.x = 0;
  }

  if (newPosition.x > max) {
    newPosition.x = max;
  }

  if (newPosition.y < 0) {
    newPosition.y = 0;
  }

  if (newPosition.y > max) {
    newPosition.y = max;
  }

  return newPosition;
};

const colorAction: Record<ComboColor, BoardPosition[]> = {
  // first column
  red: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
  ],
  // second column
  orange: [
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ],
  // third column
  yellow: [
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ],
  // first row
  green: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ],
  // second row
  blue: [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
  // third row
  purple: [
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ],
};
