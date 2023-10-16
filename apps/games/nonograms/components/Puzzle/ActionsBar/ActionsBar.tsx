import { Square, Clear, SquareOutlined, MoreHoriz } from '@mui/icons-material';
import { borderRadius } from '@worksheets/ui-games';
import { Box, useTheme } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { boxShadow } from '../../../util/styles';
import { Selection } from '../../../util/types';
import { AnimatePresence, motion } from 'framer-motion';
import { ActionButton } from './ActionButton';
import { ExtraActions } from './ExtraActions';

export type ActionsBarProps = {
  size: number;
  action: Selection;
  disabled: boolean;
  canUndo: boolean;
  canRedo: boolean;
  canReset: boolean;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onHelp: () => void;
  setAction: (action: Selection) => void;
};

export const ActionsBar: FC<ActionsBarProps> = ({
  size,
  action,
  disabled,
  canUndo,
  canRedo,
  canReset,
  onReset,
  onUndo,
  onRedo,
  onHelp,
  setAction,
}) => {
  const theme = useTheme();
  const [showExtraActions, setShowExtraActions] = useState(false);

  useEffect(() => {
    // if disabled, close all menus
    if (disabled) {
      setShowExtraActions(false);
    }
  }, [disabled]);

  const animation = {
    style: {
      position: 'absolute' as const,
      bottom: 20 + size * 2,
    },
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: {
      duration: 0.3,
    },
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      position={'relative'}
      mt={10}
      mb={2}
    >
      <AnimatePresence>
        {showExtraActions && (
          <motion.div {...animation}>
            <ExtraActions
              canUndo={canUndo}
              canRedo={canRedo}
              canReset={canReset}
              onReset={onReset}
              onUndo={onUndo}
              onRedo={onRedo}
              size={size}
              onHelp={onHelp}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Box
        sx={{
          display: 'flex',
          pt: 1,
          pb: 1.5,
          px: 3,
          borderRadius: borderRadius,
          backgroundColor: 'white',
          boxShadow: boxShadow,
          gap: size * 0.1,
        }}
      >
        <ActionButton
          disabled={disabled}
          active={action === Selection.Square}
          size={size}
          onClick={() => setAction(Selection.Square)}
          Icon={Square}
        />
        <ActionButton
          disabled={disabled}
          active={action === Selection.Cross}
          size={size}
          onClick={() => setAction(Selection.Cross)}
          Icon={Clear}
          IconProps={{ color: theme.palette.error.main }}
        />
        <ActionButton
          disabled={disabled}
          active={action === Selection.Empty}
          size={size}
          onClick={() => setAction(Selection.Empty)}
          Icon={SquareOutlined}
        />
        <ActionButton
          circular
          disabled={disabled}
          size={size}
          onClick={() => setShowExtraActions((prev) => !prev)}
          Icon={MoreHoriz}
        />
      </Box>
    </Box>
  );
};
