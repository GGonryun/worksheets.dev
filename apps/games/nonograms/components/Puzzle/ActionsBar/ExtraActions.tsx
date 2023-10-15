import {
  CachedOutlined,
  Undo,
  Redo,
  StarBorderOutlined,
} from '@mui/icons-material';
import {
  borderRadius,
  tabletBoxShadow,
  dokaBoxShadow,
} from '@worksheets/ui-games';
import { FC } from 'react';
import { ActionButton } from './ActionButton';
import { Box, useTheme } from '@mui/material';

export type ExtraActionsProps = {
  size: number;
  tokens: number;
  canUndo: boolean;
  canRedo: boolean;
  canReset: boolean;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onBonus: () => void;
};
export const ExtraActions: FC<ExtraActionsProps> = ({
  size,
  tokens,
  canUndo,
  canRedo,
  canReset,
  onUndo,
  onRedo,
  onReset,
  onBonus,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        right: size,
        py: 1,
        px: 3,
        borderRadius: borderRadius,
        backgroundColor: 'white',
        boxShadow: `${tabletBoxShadow}, ${dokaBoxShadow}`,
        gap: size * 0.15,
        display: 'flex',
        zIndex: 10,
      }}
    >
      <ActionButton
        circular
        size={size}
        disabled={!canReset}
        onClick={onReset}
        label="Reset"
        Icon={CachedOutlined}
      />
      <ActionButton
        circular
        disabled={!canUndo}
        size={size}
        onClick={onUndo}
        label="Undo"
        Icon={Undo}
      />
      <ActionButton
        circular
        disabled={!canRedo}
        size={size}
        onClick={onRedo}
        label="Redo"
        Icon={Redo}
      />
      <ActionButton
        circular
        size={size}
        label={`${tokens}`}
        onClick={onBonus}
        LabelProps={{ color: theme.palette.success.main }}
        Icon={StarBorderOutlined}
      />
    </Box>
  );
};
