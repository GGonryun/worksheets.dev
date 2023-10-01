import { Typography } from '@mui/material';
import { uppercase } from '@worksheets/util/strings';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { RegisterPositionHandler } from '../../types';
import * as layouts from '../../layouts';
import styles from './LetterSelection.module.scss';

export type LetterSelectionProps = {
  letter: string;
  index: number;
  selected: boolean;
  transform: string;
  diameter: number;
  registerPosition: RegisterPositionHandler;
};

export const LetterSelection: FC<LetterSelectionProps> = ({
  selected,
  letter,
  index,
  diameter,
  registerPosition,
  transform,
}) => {
  return (
    <div
      className={clsx({
        [styles['letter-selected']]: selected,
      })}
      // the position of this element is controlled programatically
      style={{
        transform,
        width: `${diameter}px`,
        height: `${diameter}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
      }}
    >
      <AnimatePresence>
        {!selected && (
          <motion.div
            layoutId={layouts.letter(index)}
            onViewportEnter={(e) => {
              registerPosition(index, e?.boundingClientRect);
            }}
            initial={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.1,
            }}
          >
            <Typography fontSize={45}>{uppercase(letter)}</Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
