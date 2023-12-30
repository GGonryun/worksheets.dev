import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const SubtitleText = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2rem',
  },
}));
