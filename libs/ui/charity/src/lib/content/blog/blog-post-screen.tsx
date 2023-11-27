import { Container, Paper } from '@mui/material';
import { FC } from 'react';
import { PostHeader } from './post-header';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { PostBody } from './post-body/post-body';
import { JoinNewsletterBox } from './join-newsletter-box';
import { blogAuthors } from '../../../data/authors';

export type BlogPostScreenProps = {
  metadata: MarkdownMetadata;
  content: string;
};

export const BlogPostScreen: FC<BlogPostScreenProps> = ({
  metadata,
  content,
}) => {
  const author = blogAuthors[metadata.authorId];
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderTopRightRadius: '16px',
          borderTopLeftRadius: '16px',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          p: { xs: 2, sm: 4 },
        }}
      >
        <PostHeader
          title={metadata.title}
          coverImage={metadata.coverImage}
          date={metadata.date}
          author={author}
        />
        <PostBody content={content} />
      </Paper>
      <Paper
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: (theme) => theme.palette.grey[200],
          p: { xs: 2, sm: 4 },
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
        }}
      >
        <JoinNewsletterBox />
      </Paper>
    </Container>
  );
};
