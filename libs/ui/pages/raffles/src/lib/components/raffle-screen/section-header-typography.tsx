import { styled, Typography, TypographyProps } from '@mui/material';
import { JSXElementConstructor } from 'react';

export const SectionHeaderTypography = styled<
  JSXElementConstructor<TypographyProps>
>((props) => (
  <Typography
    variant="body3"
    fontWeight={500}
    textTransform="uppercase"
    color="text.primary"
    {...props}
  />
))({
  textDecorationColor: 'inherit',
});
