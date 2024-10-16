import { Box, Paper } from '@mui/material';
import { BlogAuthor } from '@worksheets/util/types';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { FC } from 'react';

import { JoinNewsletterBox } from '../shared/join-newsletter-box';
import { PostBody } from './post-body';
import { PostHeader } from './post-header';

export type BlogPostProps = {
  metadata: MarkdownMetadata;
  content: string;
  author: BlogAuthor;
};

export const BlogPost: FC<BlogPostProps> = ({ metadata, content, author }) => {
  return (
    <Box>
      <Paper
        sx={{
          color: (theme) => theme.palette.text.arcade,
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
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
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
          p: { xs: 2, sm: 4 },
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
        }}
      >
        <JoinNewsletterBox />
      </Paper>
    </Box>
  );
};
