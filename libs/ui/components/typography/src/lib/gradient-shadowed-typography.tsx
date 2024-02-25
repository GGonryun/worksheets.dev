import { Box, Theme, Typography, TypographyProps } from '@mui/material';
import { SystemCssProperties } from '@mui/system';
import React from 'react';

export const GradientShadowedTypography: React.FC<
  Pick<TypographyProps, 'typography' | 'textTransform' | 'children'> &
    Pick<SystemCssProperties<Theme>, 'background' | 'textShadow'>
> = (props) => (
  <Box
    sx={{
      position: 'relative',
    }}
  >
    <Typography
      textTransform={props.textTransform}
      typography={props.typography}
      sx={{
        position: 'absolute',
        textShadow: props.textShadow,
        zIndex: -1,
      }}
    >
      {props.children}
    </Typography>
    <Typography
      textTransform={props.textTransform}
      typography={props.typography}
      sx={{
        display: 'absolute',
        background: props.background,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        zIndex: 1,
      }}
    >
      {props.children}
    </Typography>
  </Box>
);
