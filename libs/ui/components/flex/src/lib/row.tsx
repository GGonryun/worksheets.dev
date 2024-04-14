import { Box, BoxProps, styled } from '@mui/material';

export const Row = styled((props: BoxProps) => (
  <Box className="row" alignItems={'center'} {...props} />
))({
  display: 'flex',
  flexDirection: 'row',
});
