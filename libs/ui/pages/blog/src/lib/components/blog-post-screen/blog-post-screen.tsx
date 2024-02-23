import { Container, Paper } from '@mui/material';
import { BlogAuthor } from '@worksheets/util/types';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { FC } from 'react';

import { JoinNewsletterBox } from '../shared/join-newsletter-box';
import { PostBody } from './post-body';
import { PostHeader } from './post-header';

export type BlogPostScreenProps = {
  metadata: MarkdownMetadata;
  content: string;
  author: BlogAuthor;
};

export const BlogPostScreen: FC<BlogPostScreenProps> = ({
  metadata,
  content,
  author,
}) => {
  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Paper
        sx={{
          backgroundColor: (theme) =>
            theme.palette.background['transparent-blue'],
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
          borderTop: (theme) => `1px solid ${theme.palette.white.main}`,
          backgroundColor: (theme) =>
            theme.palette.background['transparent-blue'],
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
