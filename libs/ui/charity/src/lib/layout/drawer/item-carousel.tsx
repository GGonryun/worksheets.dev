import { Box, styled } from '@mui/material';

export const ItemCarousel = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
  overflow: 'auto',
  padding: theme.spacing(1),
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));
