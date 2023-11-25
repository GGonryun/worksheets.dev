import { Box, styled } from '@mui/material';

export const PostPreviews = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));
