import { ArrowRightAlt } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';
import { blogRoutes } from '@worksheets/ui/routes';
import { MarkdownMetadata } from '@worksheets/util-markdown';

import { IndividualPost } from './individual-post';

export const SupportingPosts: React.FC<{ posts: MarkdownMetadata[] }> = ({
  posts,
}) => {
  return (
    <Paper
      component={Box}
      p={{ xs: 2, sm: 3, md: 4 }}
      display="flex"
      flexDirection="column"
      sx={{
        color: 'inherit',
        backgroundColor: (theme) =>
          theme.palette.background['transparent-blue'],
      }}
    >
      <Typography
        typography={{ xs: 'h5', sm: 'h4' }}
        component="h2"
        pb={{ xs: 2, sm: 4 }}
      >
        More Stories
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
        gap={{ xs: 12, sm: 4, md: 6, lg: 8 }}
      >
        {posts.map((post) => (
          <IndividualPost post={post} key={post.slug} />
        ))}
      </Box>
      <Box alignSelf="flex-end" p={1}>
        <Button
          variant="arcade"
          color="warning"
          href={blogRoutes.articles.path()}
          endIcon={<ArrowRightAlt />}
        >
          View All Posts
        </Button>
      </Box>
    </Paper>
  );
};
