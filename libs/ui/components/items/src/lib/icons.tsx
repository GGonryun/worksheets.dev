import {
  FavoriteBorder,
  PanToolAltOutlined,
  QuestionMark,
  Remove,
  SellOutlined,
  Shuffle,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { ClockExclamation, Sword } from '@worksheets/icons/dazzle';
import { ItemRarity } from '@worksheets/prisma';
import { RARITY_GRADIENT, RARITY_LETTER } from '@worksheets/util/types';
import React, { FC, ReactNode } from 'react';

// TODO: add more icons for sharable items and consumables

const IconLayout: FC<{ gradient: string; children: ReactNode }> = ({
  gradient,
  children,
}) => (
  <Box
    sx={{
      lineHeight: 0,
      backgroundColor: (theme) => theme.palette.warning.main,
      background: gradient,
      borderRadius: '32px',
      p: '3px',
      border: (theme) => `2px solid ${theme.palette.background.paper}`,
    }}
  >
    {children}
  </Box>
);

export const SellableItemIcon: React.FC<{ size: number }> = ({ size }) => (
  // beige gradient
  <IconLayout gradient="linear-gradient(to top, #c79081 0%, #dfa579 100%)">
    <SellOutlined
      color="white"
      sx={{
        fontSize: size,
      }}
    />
  </IconLayout>
);

export const ConsumableItemIcon: React.FC<{ size: number }> = ({ size }) => (
  // blue gradient
  <IconLayout gradient="radial-gradient(circle at 10% 20%, rgb(59, 149, 237) 0%, rgb(7, 91, 173) 90%)">
    <PanToolAltOutlined
      color="white"
      sx={{
        fontSize: size,
      }}
    />
  </IconLayout>
);

export const BattleItemIcon: React.FC<{ size: number }> = ({ size }) => (
  // green gradient
  <IconLayout gradient="linear-gradient(to top, #0ba360 0%, #3cba92 100%)">
    <Sword
      color="white"
      sx={{
        fontSize: size,
      }}
    />
  </IconLayout>
);

export const HeartItemIcon: React.FC<{ size: number }> = ({ size }) => (
  // pink gradient
  <IconLayout gradient="linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)">
    <FavoriteBorder
      color="white"
      sx={{
        fontSize: size,
      }}
    />
  </IconLayout>
);

export const ShuffleItemIcon: React.FC<{ size: number }> = ({ size }) => (
  // purple gradient
  <IconLayout gradient="linear-gradient(109.6deg, rgba(119, 44, 232, 0.68) 11.5%, rgb(119, 44, 232) 91.2%)">
    <Shuffle
      color="white"
      sx={{
        fontSize: size,
      }}
    />
  </IconLayout>
);

export const QuestionMarkIcon: React.FC<{ size: number }> = ({ size }) => (
  <IconLayout
    gradient="linear-gradient(
    90deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
)"
  >
    <QuestionMark
      color="white"
      sx={{
        fontSize: size,
      }}
    />
  </IconLayout>
);

export const ExpiringItemIcon: React.FC<{ size: number }> = ({ size }) => (
  // red gradient
  <IconLayout gradient="linear-gradient(0deg, rgb(149, 5, 4),rgb(253, 19, 61))">
    <ClockExclamation
      color="white"
      sx={{
        fontSize: size,
      }}
    />
  </IconLayout>
);

export const RemoveItemIcon: React.FC<{ size: number }> = ({ size }) => (
  <IconLayout gradient="linear-gradient(0deg, rgb(149, 5, 4),rgb(253, 19, 61))">
    <Remove
      color="white"
      sx={{
        fontSize: size,
      }}
    />
  </IconLayout>
);

export const rarityIcon = (rarity: ItemRarity, size = 24) => {
  return (
    <Box
      sx={{
        lineHeight: 0,
        backgroundColor: (theme) => theme.palette.warning.main,
        background: RARITY_GRADIENT[rarity],
        borderRadius: '32px',
        textAlign: 'center',
        height: size,
        width: size,
        display: 'grid',
        placeItems: 'center',
        border: (theme) => `2px solid ${theme.palette.background.paper}`,
      }}
    >
      <Typography
        variant="caption"
        color="white.main"
        sx={{
          fontSize: size / 2,
          fontWeight: 700,
          display: 'block',
          lineHeight: 0,
        }}
      >
        {RARITY_LETTER[rarity]}
      </Typography>
    </Box>
  );
};
