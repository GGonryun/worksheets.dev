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
    | 'm'
    | 'mt'
    | 'mb'
    | 'mx'
    | 'my'
    | 'mr'
    | 'ml'
    | 'width'
    | 'height'
    | 'minWidth'
    | 'minHeight'
    | 'maxWidth'
    | 'maxHeight'
    | 'sx'
  > & {
    children: ReactNode;
    column?: boolean;
    grow?: boolean;
    wrap?: boolean;
    spaceBetween?: boolean;
    fullWidth?: boolean;
  }
> = ({
  children,
  column: col,
  wrap,
  spaceBetween,
  grow,
  fullWidth,
  ...rest
}) => (
  <Box
    display="flex"
    flexDirection={col ? 'column' : 'row'}
    alignItems={col ? undefined : 'center'}
    flexWrap={wrap ? 'wrap' : undefined}
    justifyContent={spaceBetween ? 'space-between' : undefined}
    flexGrow={grow ? 1 : undefined}
    width={fullWidth ? '100%' : undefined}
    {...rest}
  >
    {children}
  </Box>
);
