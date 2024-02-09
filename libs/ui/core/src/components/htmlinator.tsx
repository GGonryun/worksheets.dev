/**
 * A super tiny library for converting the basics of markdown to HTML.
 */

import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';

export type DangerousHTML = string;

export const HTMLinator: FC<
  ({ text: DangerousHTML } | { children: DangerousHTML }) &
    Pick<BoxProps, 'sx' | 'component'>
> = ({ sx, component, ...props }) => {
  let content = '';
  if ('text' in props) {
    content = props.text;
  } else if ('children' in props) {
    content = props.children;
  }
  return (
    <Box
      component={component ?? 'div'}
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
      <Box dangerouslySetInnerHTML={{ __html: content }} component="span" />
    </Box>
  );
};
