import { Container, Divider, Paper, Typography } from '@mui/material';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { FC, Fragment } from 'react';

import { PostPreview } from './post-preview';
import { PostPreviews } from './post-previews';

export type BlogScreenProps = {
  posts: MarkdownMetadata[];
};

export const BlogScreen: FC<BlogScreenProps> = ({ posts }) => {
  // sort the posts by date.
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
          backgroundColor: (theme) =>
            theme.palette.background['transparent-blue'],
        }}
      >
        <Typography variant="h3" color="text.arcade">
          Blog
        </Typography>
        <br />
        <PostPreviews>
          {posts.map((post) => (
            <Fragment key={post.slug}>
              <Divider color="white" />
              <PostPreview {...post} />
            </Fragment>
          ))}
        </PostPreviews>
      </Paper>
    </Container>
  );
};
