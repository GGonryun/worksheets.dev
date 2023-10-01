import { Theme } from '@mui/material';

export const letter = (index: number) => `letter-${index}`;

export const border = (theme: Theme) => `2px solid ${theme.palette.grey[600]}`;

export const thinBorder = (theme: Theme) =>
  `1px solid ${theme.palette.grey[600]}`;
