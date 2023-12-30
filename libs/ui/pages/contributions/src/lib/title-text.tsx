import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const TitleText = styled(Typography)(({ theme }) => ({
  lineHeight: 1,
  fontSize: '2rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.5rem',
  },
}));
