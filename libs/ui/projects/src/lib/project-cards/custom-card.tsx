import { Card, lighten, styled } from '@mui/material';

export const cardHeight = 200;
export const CustomCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  '&:hover': {
    backgroundColor: lighten(theme.palette.primary.light, 0.9),
    '& h6': {
      textDecoration: 'underline',
    },
  },
}));
