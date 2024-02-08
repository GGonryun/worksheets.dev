import { Box, styled } from '@mui/material';

export const TopPunchOut = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-0.3rem',
  left: '-0.9rem',
  boxSizing: 'border-box',
  height: '1rem',
  width: '1.6rem',
  borderRadius: '0 0 1.6rem 1.6rem',
  backgroundColor: theme.palette.background['solid-blue'],
}));

export const BottomPunchOut = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '-0.3rem',
  left: '-0.9rem',
  boxSizing: 'border-box',
  height: '1rem',
  width: '1.6rem',
  borderRadius: '1.6rem 1.6rem 0 0',
  backgroundColor: theme.palette.background['solid-blue'],
}));

export const LeftPunchOut = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-0.9rem',
  right: '-0.3rem',
  boxSizing: 'border-box',
  height: '1.6rem',
  width: '1rem',
  borderRadius: '1.6rem 0 0 1.6rem',
  backgroundColor: theme.palette.background['solid-blue'],
}));

export const RightPunchOut = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-0.9rem',
  left: '-0.3rem',
  boxSizing: 'border-box',
  height: '1.6rem',
  width: '1rem',
  borderRadius: '0 1.6rem 1.6rem 0',
  backgroundColor: theme.palette.background['solid-blue'],
}));
