import { FC } from 'react';
import { Box, BoxProps } from '@mui/material';

export const Fill: FC<Pick<BoxProps, 'children' | 'sx'>> = (props) => {
  return <Box width="100%" height="100%" {...props} />;
};
