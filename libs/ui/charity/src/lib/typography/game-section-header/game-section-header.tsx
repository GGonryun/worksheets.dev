import { Typography, styled } from '@mui/material';

export const GameSectionHeader = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(24),
  fontFamily: theme.typography.dangrek.fontFamily,
  fontWeight: 700,
  margin: theme.spacing(2, 0, 0, 1),
  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.pxToRem(32),
  },
}));
