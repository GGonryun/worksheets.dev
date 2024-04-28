import { alpha, styled, Typography, TypographyProps } from '@mui/material';

export const Banner = styled((props: TypographyProps) => (
  <Typography variant="body2" {...props} />
))(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 900,
  color: theme.palette.text.red.light,
  padding: theme.spacing(0.25, 0.5),
  backgroundColor: alpha(theme.palette.background['solid-blue'], 0.1),
}));
