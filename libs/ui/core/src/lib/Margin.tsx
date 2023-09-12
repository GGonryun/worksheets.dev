import { BoxProps, Box } from '@mui/material';

export const Margin: React.FC<
  Pick<BoxProps, 'children'> & {
    top?: string | number;
    left?: string | number;
    right?: string | number;
    bottom?: string | number;
    x?: string | number;
    y?: string | number;
    all?: string | number;
  }
> = ({ top, left, right, bottom, x, y, all, children }) => (
  <Box
    margin={all}
    marginTop={top}
    marginBottom={bottom}
    marginLeft={left}
    marginRight={right}
    marginX={x}
    marginY={y}
  >
    {children}
  </Box>
);
