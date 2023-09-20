import { selectRandomItem } from '@worksheets/util/arrays';
import { PlayableCard, cardTypesByCategory, comboColors } from '../Card';
import { ShapeColor, useInterval, useTimeout } from '@worksheets/ui-core';

import { useState } from 'react';

export type EnemyDifficulty = 'easy' | 'medium' | 'hard' | 'insane';

export type EnemySettings = {
  movementFrequency: number;
  attackFrequency: number;
  comboFrequency: number;
  wildcardFrequency: number;
  wildcardMovementFrequency: number;
  actionDelay: number;
};

export const EnemySettings: Record<EnemyDifficulty, EnemySettings> = {
  easy: {
    movementFrequency: 4000,
    attackFrequency: 7500,
    comboFrequency: 25000,
    wildcardFrequency: 15000,
    wildcardMovementFrequency: 0.7,
    actionDelay: 5000,
  },
  medium: {
    movementFrequency: 3000,
    attackFrequency: 6000,
    comboFrequency: 15000,
    wildcardFrequency: 7500,
    wildcardMovementFrequency: 0.7,
    actionDelay: 4000,
  },
  hard: {
    movementFrequency: 2000,
    attackFrequency: 4000,
    comboFrequency: 10000,
    wildcardFrequency: 7500,
    wildcardMovementFrequency: 0.7,
    actionDelay: 3000,
  },
  insane: {
    movementFrequency: 2000,
    attackFrequency: 4000,
    comboFrequency: 7500,
    wildcardFrequency: 2000,
    wildcardMovementFrequency: 0.8,
    actionDelay: 1000,
  },
};

const movements = cardTypesByCategory['movement'];
const attacks = cardTypesByCategory['sword'];
const generateRandomEnemyAction = (
  wildcardMovementFrequency: number
): PlayableCard => {
  const isMovement = Math.random() < wildcardMovementFrequency;

  const type = isMovement
    ? selectRandomItem(movements)
    : selectRandomItem(attacks);
  // enemies can't combo without a playarea.
  const color = selectRandomItem(comboColors);

  return {
    type,
    color,
  };
};

export const generateRandomEnemyMovement = (): PlayableCard => {
  const type = selectRandomItem(movements);
  const color = selectRandomItem(comboColors);

  return {
    type,
    color,
  };
};

export const generateRandomEnemyAttack = (): PlayableCard => {
  const type = selectRandomItem(attacks);
  const color = selectRandomItem(comboColors);

  return {
    type,
    color,
  };
};

export const useArtificialEnemy = ({
  enemyAction,
  enemyCombo,
  difficulty,
  stop,
}: {
  enemyAction: (action: PlayableCard) => void;
  enemyCombo: (color: ShapeColor) => void;
  difficulty: EnemyDifficulty;
  stop: boolean;
}) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const settings = EnemySettings[difficulty];

  const { restart } = useTimeout(() => {
    setDisabled(false);
  }, settings.actionDelay);

  const paused = stop || disabled;

  // execute a random action.
  useInterval(
    () => {
      enemyAction(
        generateRandomEnemyAction(settings.wildcardMovementFrequency)
      );
    },
    settings.wildcardFrequency,
    paused
  );

  // execute a random enemy movement.
  useInterval(
    () => {
      enemyAction(generateRandomEnemyMovement());
    },
    settings.movementFrequency,
    paused
  );

  // execute a random enemy attack.
  useInterval(
    () => {
      enemyAction(generateRandomEnemyAttack());
    },
    settings.attackFrequency,
    paused
  );

  // execute a random enemy combo.
  useInterval(
    () => {
      enemyCombo(selectRandomItem(comboColors));
    },
    settings.comboFrequency,
    paused
  );

  const reset = () => {
    setDisabled(true);
    restart();
  };

  return { reset };
};
