import { Paper, styled } from '@mui/material';

export const CustomPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background['solid-blue'],
  background: theme.palette.background['gradient-blue'],
  gap: theme.spacing(1),
  padding: theme.spacing(4),
}));
