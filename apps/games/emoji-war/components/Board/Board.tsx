import styles from './Board.module.scss';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Flex, Spacing } from '@worksheets/ui-core';
import { Layout } from './Layout';
import { arrayFromLength } from '@worksheets/util/arrays';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { clsx } from 'clsx';
import {
  BOARD_LAYOUT_SIZE,
  BOARD_MAX_LAYOUT_SIZE,
  BOARD_GRID_SIZE,
} from '../settings';
import { BoardPoints } from './BoardPoints';

export type BoardPosition = { x: number; y: number };

const pointToInt = (point: BoardPosition) =>
  point.x + point.y * BOARD_GRID_SIZE;

export const Board: FC<{
  emoji: string;
  player: number;
  position: BoardPosition;
  attacks: BoardPosition[];
}> = ({ emoji, player, position, attacks }) => {
  const attackPoints = attacks.map(pointToInt);
  return (
    <Spacing bottom={player === 2 ? 3 : 0} top={player === 1 ? 3 : 0} x={3}>
      <Layout size={BOARD_LAYOUT_SIZE} maxSize={BOARD_MAX_LAYOUT_SIZE}>
        <BoardPoints top={player === 1} bot={player === 2} right />
        <Grid container spacing={0.5}>
          {arrayFromLength(9).map((i) => (
            <Grid xs={4} key={i}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  aspectRatio: '1/1',
                  border: '2px solid black',
                  borderRadius: 1,
                }}
              >
                <Flex fill centered sx={{ position: 'relative' }}>
                  {pointToInt(position) === i && (
                    <motion.div
                      layoutId={`gem-${player}`}
                      className={clsx({
                        [styles['gem']]: true,
                        [styles['damaged']]: attackPoints.includes(i),
                      })}
                    >
                      {emoji}
                    </motion.div>
                  )}
                  <AnimatePresence>
                    {attackPoints.includes(i) && (
                      <motion.div
                        className={styles['strike']}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        ⚔️
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Flex>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Layout>
    </Spacing>
  );
};
