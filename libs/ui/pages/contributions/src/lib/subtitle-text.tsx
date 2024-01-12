import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const SubtitleText = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2rem',
  },
}));
