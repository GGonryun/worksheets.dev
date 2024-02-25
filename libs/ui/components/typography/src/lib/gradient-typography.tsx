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
  > &
    Pick<SystemCssProperties<Theme>, 'background' | 'color'>
> = ({ background, color, ...props }) => (
  <Typography
    {...props}
    sx={{
      color: color,
      background: background,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}
  />
);
