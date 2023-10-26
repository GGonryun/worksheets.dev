import { TypographyProps, Typography, styled, Box } from '@mui/material';
import { FC, JSXElementConstructor } from 'react';

export const HeaderText = styled<JSXElementConstructor<TypographyProps>>(
  (props) => <Typography variant={'h2'} {...props} />
)(({ theme }) => ({
  fontFamily: theme.typography.primary.fontFamily,
  fontWeight: 900,
  '@media(min-width: 600px)': {
    fontSize: '2.5rem',
  },
  '@media (max-width: 600px)': {
    fontSize: '2rem',
  },
}));

export const SubHeaderText = styled<JSXElementConstructor<TypographyProps>>(
  (props) => <Typography variant={'h4'} {...props} />
)(({ theme }) => ({
  fontFamily: theme.typography.primary.fontFamily,
  fontWeight: 900,
  '@media(min-width: 600px)': {
    fontSize: '1.75rem',
  },
  '@media (max-width: 600px)': {
    fontSize: '1.5rem',
  },
}));

export const ParagraphText = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.secondary.fontFamily,
  fontWeight: 400,
}));

export const SmallHeaderText = styled<JSXElementConstructor<TypographyProps>>(
  (props) => <Typography variant={'h6'} {...props} />
)(({ theme }) => ({
  fontFamily: theme.typography.primary.fontFamily,
  fontWeight: 900,
  '@media(min-width: 600px)': {
    fontSize: '1.2rem',
  },
  '@media (max-width: 600px)': {
    fontSize: '1.0rem',
  },
}));

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
