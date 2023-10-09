import { BoxProps, Box } from '@mui/material';
import { ReactNode } from 'react';

export type FlexProps = Pick<
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
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'width'
  | 'height'
  | 'minWidth'
  | 'minHeight'
  | 'maxWidth'
  | 'maxHeight'
  | 'sx'
  | 'flex'
  | 'onClick'
  | 'flexDirection'
  | 'position'
  | 'zIndex'
  | 'className'
  | 'display'
> & {
  id?: string;
  children: ReactNode;
  column?: boolean;
  grow?: boolean;
  wrap?: boolean;
  spaceBetween?: boolean;
  fullWidth?: boolean;
  centered?: boolean;
  fill?: boolean;
};

export const Flex: React.FC<FlexProps> = ({
  children,
  column: col,
  wrap,
  spaceBetween,
  grow,
  id,
  fullWidth,
  centered,
  fill,
  ...rest
}) => (
  <Box
    id={id}
    display="flex"
    flexDirection={col ? 'column' : 'row'}
    alignItems={centered ? 'center' : col ? undefined : 'center'}
    flexWrap={wrap ? 'wrap' : undefined}
    justifyContent={
      centered ? 'center' : spaceBetween ? 'space-between' : undefined
    }
    flexGrow={grow ? 1 : undefined}
    width={fill || fullWidth ? '100%' : undefined}
    height={fill ? '100%' : undefined}
    {...rest}
  >
    {children}
  </Box>
);
