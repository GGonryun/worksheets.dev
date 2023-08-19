import { BoxProps, Box } from '@mui/material';
import { ReactNode } from 'react';

export const Flex: React.FC<
  Pick<
    BoxProps,
    | 'alignItems'
    | 'justifyContent'
    | 'gap'
    | 'p'
    | 'pt'
    | 'pb'
    | 'py'
    | 'px'
    | 'pr'
    | 'pl'
    | 'width'
    | 'height'
    | 'sx'
  > & {
    children: ReactNode;
    column?: boolean;
    wrap?: boolean;
  }
> = ({ children, column: col, wrap, ...rest }) => (
  <Box
    display="flex"
    flexDirection={col ? 'column' : 'row'}
    alignItems={col ? undefined : 'center'}
    flexWrap={wrap ? 'wrap' : undefined}
    {...rest}
  >
    {children}
  </Box>
);
