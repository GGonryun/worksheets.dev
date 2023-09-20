import { BoxProps, Box } from '@mui/material';

export const Spacing: React.FC<
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
    // The order is important, this allows the user to override the margin with more specific selectors
    margin={all}
    marginX={x}
    marginY={y}
    marginTop={top}
    marginBottom={bottom}
    marginLeft={left}
    marginRight={right}
  >
    {children}
  </Box>
);
