/**
 * A super tiny library for converting the basics of markdown to HTML.
 */

import { Box, BoxProps } from '@mui/material';
import { FC } from 'react';

export type MarkdownText = string;

export const Markdown: FC<{ text: MarkdownText } & Pick<BoxProps, 'sx'>> = ({
  text,
  sx,
}) => {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: convertMicroMarkdown(text) }}
      component="span"
      sx={{
        fontFamily: (theme) => theme.typography.mPlus1p.fontFamily,
        h6: {
          mt: 2,
          mb: 1,
        },
        h5: {
          mt: 2,
          mb: 1,
        },
        h4: {
          mt: 2,
          mb: 1,
        },
        h3: {
          mt: 2,
          mb: 1,
        },
        h2: {
          mt: 2,
          mb: 1,
        },
        h1: {
          mt: 2,
          mb: 1,
        },
        a: {
          color: 'inherit',
          textDecoration: 'underline',
        },
        li: {
          pl: 2,
        },
        ...sx,
      }}
    />
  );
};

export const convertMicroMarkdown = (text: string) => {
  const bold = convertBold(text);
  const italics = convertItalics(bold);
  const underline = convertUnderline(italics);
  const strikethrough = convertStrikethrough(underline);
  const code = convertCode(strikethrough);
  const links = convertLinks(code);
  const headers4 = convertHeader4(links);
  const headers3 = convertHeader3(headers4);
  const headers2 = convertHeader2(headers3);
  const headers = convertHeaders(headers2);
  const lists = convertLists(headers);

  return lists;
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

const convertHeaders = (text: string) => {
  // only convert header 1 if it has a space before and after the #
  // this is to prevent converting # in other places like links
  return text.replace(/(\s#)(.*)/g, '<h1>$2</h1>');
};

const convertHeader2 = (text: string) => {
  return text.replace(/(##+)(.*)/g, '<h2>$2</h2>');
};

const convertHeader3 = (text: string) => {
  return text.replace(/(###)(.*)/g, '<h3>$2</h3>');
};

const convertHeader4 = (text: string) => {
  return text.replace(/(####)(.*)/g, '<h4>$2</h4>');
};

const convertLists = (text: string) => {
  // any - or * with whitespace before or after and replace the - or * with a <li>
  return text.replace(/(\s[-*]\s)(.*)/g, '<li>$2</li>');
};
