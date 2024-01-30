/**
 * A super tiny library for converting the basics of markdown to HTML.
 */

import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';

export type DangerousHTML = string;

export const HTMLinator: FC<{ text: DangerousHTML } & Pick<BoxProps, 'sx'>> = ({
  text,
  sx,
}) => {
  return (
    <Box
      sx={{
        fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
        '& p, h6, h5, h4, h3, h2, h1, ul': {
          margin: 0,
        },
        a: {
          color: 'inherit',
          textDecoration: 'underline',
        },
        '& li': {
          margin: 0,
          pl: 2,
        },
        ...sx,
      }}
    >
      <Box dangerouslySetInnerHTML={{ __html: text }} component="span" />
    </Box>
  );
};
