import { Box, styled } from '@mui/material';

export const EdgeBlur = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: 120,
  bottom: 0,
  background:
    'linear-gradient(270deg, rgb(250, 203, 202) 20%, rgba(250, 203, 202, 0) 50%)',
  pointerEvents: 'none',
}));
