/**
 * A super tiny library for converting the basics of markdown to HTML.
 */

import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';

export type MicroMarkdownText = string;

export const MicroMarkdown: FC<
  { text: MicroMarkdownText } & Pick<BoxProps, 'sx'>
> = ({ text, sx }) => {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: convertMicroMarkdown(text) }}
      component="span"
      sx={{
        a: {
          textDecoration: 'underline',
        },
        ...sx,
      }}
    ></Box>
  );
};

export const convertMicroMarkdown = (text: string) => {
  const bold = convertBold(text);
  const italics = convertItalics(bold);
  const underline = convertUnderline(italics);
  const strikethrough = convertStrikethrough(underline);
  const code = convertCode(strikethrough);
  const links = convertLinks(code);

  return links;
};
// convert bold markdown to bold text
const convertBold = (text: string) => {
  return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
};

const convertItalics = (text: string) => {
  return text.replace(/\*(.*?)\*/g, '<i>$1</i>');
};

const convertUnderline = (text: string) => {
  return text.replace(/__(.*?)__/g, '<u>$1</u>');
};

const convertStrikethrough = (text: string) => {
  return text.replace(/~~(.*?)~~/g, '<s>$1</s>');
};

const convertCode = (text: string) => {
  return text.replace(/`(.*?)`/g, '<code>$1</code>');
};

const convertLinks = (text: string) => {
  return text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
};
