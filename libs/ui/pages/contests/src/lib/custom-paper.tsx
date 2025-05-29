import { Paper, styled } from '@mui/material';

export const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 4,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));
