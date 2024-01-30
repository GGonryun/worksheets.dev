import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const IconBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
}));
