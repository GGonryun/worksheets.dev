import {
  Grid4x4,
  GridGoldenratio,
  QuestionMark,
  StarBorderOutlined,
  KeyboardReturn,
} from '@mui/icons-material';
import {
  borderRadius,
  tabletBoxShadow,
  dokaBoxShadow,
} from '@worksheets/ui-games';
import { BonusPricing, GridAction } from '../../../util/types';
import { FC } from 'react';
import { ActionButton } from './ActionButton';
import { Box, useTheme } from '@mui/material';

export type BonusActionsProps = {
  size: number;
  tokens: number;
  prices: BonusPricing;
  action: GridAction;
  onBack: () => void;
  onHelp: () => void;
  onBucket: () => void;
  onCrosshair: () => void;
  onStar: () => void;
};
export const BonusActions: FC<BonusActionsProps> = ({
  size,
  tokens,
  prices,
  action,
  onBack,
  onHelp,
  onBucket,
  onCrosshair,
  onStar,
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
        active={action === 'bucket'}
        onClick={onBucket}
        disabled={tokens < prices.bucket}
        circular
        size={size}
        label={prices.bucket?.toString() ?? 9999}
        LabelProps={{ color: theme.palette.error.main }}
        Icon={Grid4x4}
      />
      <ActionButton
        active={action === 'crosshair'}
        onClick={onCrosshair}
        disabled={tokens < prices.crosshair}
        circular
        size={size}
        label={prices.crosshair?.toString() ?? 9999}
        LabelProps={{ color: theme.palette.error.main }}
        Icon={GridGoldenratio}
      />
      <ActionButton
        onClick={onHelp}
        circular
        size={size}
        label="Help"
        Icon={QuestionMark}
      />
      <ActionButton
        onClick={onStar}
        circular
        size={size}
        label={`${tokens}`}
        LabelProps={{ color: theme.palette.success.main }}
        Icon={StarBorderOutlined}
      />
      <ActionButton
        onClick={onBack}
        circular
        size={size}
        label="Back"
        Icon={KeyboardReturn}
      />
    </Box>
  );
};
