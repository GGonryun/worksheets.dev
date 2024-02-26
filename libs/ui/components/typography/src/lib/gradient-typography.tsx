import { Theme, Typography, TypographyProps } from '@mui/material';
import { SystemCssProperties } from '@mui/system';

export const GradientTypography: React.FC<
  Pick<
    TypographyProps,
    | 'typography'
    | 'textTransform'
    | 'children'
    | 'fontWeight'
    | 'letterSpacing'
    | 'textAlign'
    | 'gutterBottom'
    | 'component'
  > &
    Pick<SystemCssProperties<Theme>, 'background' | 'color'>
> = ({ background, color, ...props }) => (
  <Typography
    {...props}
    sx={{
      color,
      background,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}
  />
);
