import { Square, Clear, SquareOutlined, MoreHoriz } from '@mui/icons-material';
import { borderRadius } from '@worksheets/ui-games';
import { Box, useTheme } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { BonusPricing, GridAction } from '../../../util/types';
import { boxShadow } from '../../../util/styles';
import { AnimatePresence, motion } from 'framer-motion';
import { ActionButton } from './ActionButton';
import { BonusActions } from './BonusActions';
import { ExtraActions } from './ExtraActions';

export type ActionsBarProps = {
  size: number;
  tokens: number;
  action: GridAction;
  prices: BonusPricing;
  disabled: boolean;
  canUndo: boolean;
  canRedo: boolean;
  canReset: boolean;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
  setAction: (action: GridAction) => void;
};

export const ActionsBar: FC<ActionsBarProps> = ({
  size,
  action,
  tokens,
  prices,
  disabled,
  canUndo,
  canRedo,
  canReset,
  onReset,
  onUndo,
  onRedo,
  setAction,
}) => {
  const theme = useTheme();
  const [showExtraActions, setShowExtraActions] = useState(false);
  const [showBonuses, setShowBonuses] = useState(false);

  useEffect(() => {
    // if disabled, close all menus
    if (disabled) {
      setShowExtraActions(false);
      setShowBonuses(false);
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
              tokens={tokens}
              size={size}
              onBonus={() => {
                setShowExtraActions(false);
                setShowBonuses(true);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showBonuses && (
          <motion.div {...animation}>
            <BonusActions
              action={action}
              prices={prices}
              tokens={tokens}
              size={size}
              onBack={() => {
                setShowExtraActions(true);
                setShowBonuses(false);
                setAction('draw');
              }}
              onCrosshair={() => {
                setAction('crosshair');
              }}
              onBucket={() => {
                setAction('bucket');
              }}
              onHelp={() => {
                alert('TODO: show help modal');
              }}
              onStar={() => {
                alert('TODO: show star modal');
              }}
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
          gap: size * 0.15,
        }}
      >
        <ActionButton
          disabled={disabled}
          active={action === 'draw'}
          size={size}
          onClick={() => setAction('draw')}
          Icon={Square}
        />
        <ActionButton
          disabled={disabled}
          active={action === 'mark'}
          size={size}
          onClick={() => setAction('mark')}
          Icon={Clear}
          IconProps={{ color: theme.palette.error.main }}
        />
        <ActionButton
          disabled={disabled}
          active={action === 'clear'}
          size={size}
          onClick={() => setAction('clear')}
          Icon={SquareOutlined}
        />
        <ActionButton
          circular
          disabled={disabled}
          size={size}
          onClick={() => {
            if (showBonuses) {
              setShowBonuses(false);
              if (action === 'bucket' || action === 'crosshair') {
                setAction('draw');
              }
            } else if (showExtraActions) {
              setShowExtraActions(false);
            } else {
              setShowExtraActions(true);
            }
          }}
          Icon={MoreHoriz}
        />
      </Box>
    </Box>
  );
};
