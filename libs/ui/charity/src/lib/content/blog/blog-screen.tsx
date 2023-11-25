import { Container, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { BlogFilter } from './blog-filter';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { PostPreview } from './post-preview';
import { PostPreviews } from './post-previews';

export type BlogScreenProps = {
  posts: MarkdownMetadata[];
};

export const BlogScreen: FC<BlogScreenProps> = ({ posts }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 1, sm: 3 },
        }}
      >
        <Typography variant="h3">Blog</Typography>
        <br />
        <BlogFilter />
        <br />
        <PostPreviews>
          {posts.map((post) => (
            <PostPreview key={post.slug} {...post} />
          ))}
        </PostPreviews>
      </Paper>
    </Container>
  );
};
