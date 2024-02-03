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
        '& p, ul': {
          margin: 0,
        },
        '& h6, h5, h4, h3, h2, h1': {
          marginTop: 2,
          marginBottom: 1,
        },
        a: {
          color: 'inherit',
          textDecoration: 'underline',
        },
        '& li': {
          marginTop: 0,
          pl: 0.5,
        },
        ...sx,
      }}
    >
      <Box dangerouslySetInnerHTML={{ __html: text }} component="span" />
    </Box>
  );
};
