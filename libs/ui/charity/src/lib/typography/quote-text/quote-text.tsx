import { Box } from '@mui/material';
import { FC } from 'react';
import { ParagraphText } from '../paragraph-text';

export const QuoteText: FC<{ text: string; author: string }> = ({
  text,
  author,
}) => {
  return (
    <Box>
      <ParagraphText fontStyle={'italic'} fontWeight={500}>
        {text}
      </ParagraphText>
      <ParagraphText pl={4}>- {author}</ParagraphText>
    </Box>
  );
};
