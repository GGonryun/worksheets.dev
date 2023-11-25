import { Container } from '@mui/material';
import {
  ParagraphText,
  PrimaryLink,
  SubHeaderText,
} from '@worksheets/ui-charity';
import { urls } from '@worksheets/ui-games';

export const BlogErrorPage = () => (
  <Container sx={{ py: 3 }}>
    <SubHeaderText>
      This page doesn&apos;t exist. Sorry about that!
    </SubHeaderText>
    <ParagraphText sx={{ pt: 3 }}>
      I don&apos;t know what you were looking for, but it&apos;s not here. Maybe
      you can find it on the{' '}
      <PrimaryLink href={urls.relative.blog}>Blog</PrimaryLink>?
    </ParagraphText>
  </Container>
);
