import { Box, BoxProps, styled } from '@mui/material';

export const Column = styled((props: BoxProps) => (
  <Box className="column" {...props} />
))({
  display: 'flex',
  flexDirection: 'column',
});
