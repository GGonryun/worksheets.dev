import { FC, useState } from 'react';
import { PuzzleItem } from '../../util/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Link, Typography, useTheme } from '@mui/material';
import { findDialog } from '../../puzzles/dialogs';
import { MicroMarkdown } from '@worksheets/ui-core';
import { tabletBoxShadow } from '@worksheets/ui-games';

export const TutorialDialog: FC<{ puzzle: PuzzleItem }> = ({ puzzle }) => {
  const theme = useTheme();
  const dialog = findDialog(puzzle.id);
  const [show, setShow] = useState(dialog ? true : false);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            y: -100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: 50,
            opacity: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          style={{
            position: 'absolute',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 'auto',
            pointerEvents: 'none',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: 8,
              right: 8,
              top: 8,
              pointerEvents: 'all',

              backgroundColor: theme.palette.success.light,
              borderRadius: '8px',
              padding: '12px',
              boxShadow: tabletBoxShadow,
            }}
          >
            <Typography color="primary.contrastText" variant="caption">
              <MicroMarkdown text={dialog ?? ''} />
              <br />
              <br />
              <Link
                color="inherit"
                onClick={() => setShow(false)}
                sx={{ cursor: 'pointer' }}
              >
                Close dialog
              </Link>
            </Typography>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
