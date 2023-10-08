import { Typography, useTheme, Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import { Flex } from '@worksheets/ui-core';
import { WarningAmber } from '@mui/icons-material';
import { boxShadow } from '@worksheets/ui-games';

export const MakeSelectionWarning: FC<{ open: boolean }> = ({ open }) => {
  return <Warning open={open}>Select a cell first!</Warning>;
};

export const InvalidSelectionWarning: FC<{ open: boolean }> = ({ open }) => {
  return <Warning open={open}>That doesn&apos;t fit!</Warning>;
};

// this is a small modal that pops up when you try to submit a word without making a selection
export const Warning: FC<{ open: boolean; children: ReactNode }> = ({
  open,
  children,
}) => {
  const theme = useTheme();

  return (
    <AnimatePresence>
      {open && (
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
          style={{
            position: 'absolute',
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
              pointerEvents: 'none',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: theme.palette.warning.main,
              borderRadius: '8px',
              padding: '12px',
              boxShadow: boxShadow(),
            }}
          >
            <Flex gap={0.5}>
              <WarningAmber sx={{ color: 'white' }} />
              <Typography fontWeight={900} color="primary.contrastText">
                {children}
              </Typography>
            </Flex>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
