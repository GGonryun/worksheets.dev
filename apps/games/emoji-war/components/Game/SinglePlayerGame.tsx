import { Divider } from '@mui/material';
import { Flex, Spacing, useInterval } from '@worksheets/ui-core';
import { StatusBar } from '../StatusBar';
import { Board } from '../Board';
import { PlayArea } from '../PlayArea';
import { PlayerTag } from '../Player';
import {
  usePlayer,
  useArtificialEnemy,
  useDamageObserver,
  EnemyDifficulty,
  usePlayArea,
} from '../controllers';
import {
  GAME_SECOND,
  GAME_TIMER_SECONDS,
  STARTING_PLAYER_HEALTH,
} from '../settings';
import { FC, useEffect, useState } from 'react';
import { GameLayout } from '../Layouts';

export const SinglePlayerGame: FC<{
  difficulty: EnemyDifficulty;
  emoji: string;
  enemy: string;
  paused?: boolean;
  onGameOver: (
    // slot number of winner
    winner: number
  ) => void;
  onRestart: () => void;
  onExitGame: () => void;
  restart: boolean;
}> = ({
  emoji,
  enemy,
  difficulty,
  paused,
  onGameOver,
  restart,
  onRestart,
  onExitGame,
}) => {
  const [timer, setTimer] = useState(GAME_TIMER_SECONDS);
  const enemySlot = 2;
  const {
    position: enemyPosition,
    attacks: enemyAttacks,
    performAction: enemyAction,
    executeCombo: enemyCombo,
    health: enemyHealth,
    applyDamage: damageEnemy,
    reset: resetEnemy,
  } = usePlayer({
    slot: enemySlot,
    hp: STARTING_PLAYER_HEALTH,
    onGameOver: () => {
      // player wins
      onGameOver(playerSlot);
    },
  });

  const playerSlot = 1;
  const {
    position: playerPosition,
    attacks: playerAttacks,
    performAction: playerAction,
    executeCombo: playerCombo,
    health: playerHealth,
    applyDamage: damagePlayer,
    reset: resetPlayer,
  } = usePlayer({
    hp: STARTING_PLAYER_HEALTH,
    slot: playerSlot,
    onGameOver: () => {
      // enemy wins
      onGameOver(enemySlot);
    },
  });

  const playArea = usePlayArea({
    disabled: paused || playerHealth <= 0 || enemyHealth <= 0,
    executeCombo: playerCombo,
    performAction: playerAction,
  });

  const { reset: resetArtificialEnemy } = useArtificialEnemy({
    enemyAction,
    enemyCombo,
    difficulty,
    stop: paused || enemyHealth <= 0,
  });

  useDamageObserver({
    dealDamage: damageEnemy,
    position: enemyPosition,
    attacks: playerAttacks,
  });

  useDamageObserver({
    dealDamage: damagePlayer,
    position: playerPosition,
    attacks: enemyAttacks,
  });

  useInterval(() => {
    if (paused) return;
    if (timer === 0) {
      onGameOver(enemySlot);
    }
    setTimer((prev) => prev - 1);
  }, GAME_SECOND);

  useEffect(() => {
    if (restart) {
      setTimer(GAME_TIMER_SECONDS);
      resetEnemy();
      resetPlayer();
      resetArtificialEnemy();
      playArea.reset();

      // wait for 100 ms to allow for reset to complete
      const timeoutId = setTimeout(() => {
        onRestart();
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restart]);

  return (
    <GameLayout>
      <StatusBar
        emojis={[enemy, emoji]}
        timer={timer}
        onExitGame={onExitGame}
      />
      <Divider sx={{ width: '100%' }} />
      <Spacing y={1}>
        <Flex column centered gap={1}>
          <Board
            emoji={enemy}
            player={enemySlot}
            position={enemyPosition}
            attacks={playerAttacks}
          />
          <PlayerTag
            emoji={enemy}
            hp={enemyHealth}
            slot={enemySlot}
            max={STARTING_PLAYER_HEALTH}
          />
          <Divider sx={{ width: '100%' }} />
          <PlayerTag
            emoji={emoji}
            hp={playerHealth}
            slot={playerSlot}
            max={STARTING_PLAYER_HEALTH}
          />
          <Board
            emoji={emoji}
            player={playerSlot}
            position={playerPosition}
            attacks={enemyAttacks}
          />
        </Flex>
      </Spacing>
      <Divider sx={{ width: '100%' }} />
      <Flex fill fullWidth>
        <PlayArea {...playArea} />
      </Flex>
    </GameLayout>
  );
};
