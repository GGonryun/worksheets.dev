import { Box, Container, Paper, Typography } from '@mui/material';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { FC } from 'react';

import { JoinNewsletterBox } from '../shared/join-newsletter-box';
import { FeaturedPost } from './featured-post';
import { SupportingPosts } from './supporting-posts';

export type BlogScreenProps = {
  posts: MarkdownMetadata[];
};

const FEATURED_POSTS = 5;

export const BlogScreen: FC<BlogScreenProps> = ({ posts }) => {
  const featured = posts.slice(0, FEATURED_POSTS);

  return (
    <Container
      component={Box}
      maxWidth="lg"
      py={4}
      color="text.arcade"
      display="flex"
      flexDirection="column"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: { xs: 'center', sm: 'space-between' },
          alignItems: { xs: 'center', sm: 'baseline' },
          gap: { xs: 2, sm: 8 },
        }}
      >
        <Typography variant="h1" component="h1">
          Blog.
        </Typography>
        <Typography fontWeight={600} textAlign={{ xs: 'center', sm: 'left' }}>
          Learn more about the latest news and updates from the Charity Games
          team.
        </Typography>
      </Box>
      <br />
      <br />
      <FeaturedPost post={featured[0]} />
      <br />
      <br />
      <SupportingPosts posts={featured.slice(1)} />
      <br />
      <br />
      <Paper
        component={Box}
        display="flex"
        flexDirection="column"
        gap={{ xs: 2, sm: 4 }}
        p={{ xs: 2, sm: 4 }}
        sx={{
          color: 'text.arcade',
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
        }}
      >
        <JoinNewsletterBox />
      </Paper>
    </Container>
  );
};
