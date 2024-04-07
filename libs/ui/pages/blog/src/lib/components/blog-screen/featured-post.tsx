import { ArrowRightAlt } from '@mui/icons-material';
import { Box, Button, Link, Paper, Typography } from '@mui/material';
import { blogRoutes } from '@worksheets/routes';
import { ResponsiveImage } from '@worksheets/ui/components/images';
import { printDate } from '@worksheets/util/time';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { FC } from 'react';

import { getAuthor } from '../../util/getAuthor';
import { AuthorBox } from './author-box';

export const FeaturedPost: FC<{ post: MarkdownMetadata }> = ({ post }) => {
  const author = getAuthor(post.authorId);
  const postUrl = blogRoutes.article.path({
    params: { slug: post.slug },
  });

  return (
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
      <Box
        component={Link}
        href={postUrl}
        position="relative"
        height="100%"
        width="100%"
        borderRadius={4}
        overflow="hidden"
      >
        <ResponsiveImage src={post.coverImage} alt={post.title} />
      </Box>
      <Box
        display="flex"
        alignItems="flex-start"
        gap={4}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Box display="flex" flex={1} flexDirection="column" gap={1}>
          <Typography
            component={Link}
            underline="hover"
            color="inherit"
            typography={{ xs: 'h5', sm: 'h4' }}
            href={postUrl}
          >
            {post.title}
          </Typography>

          <Typography fontSize="1.25rem">{printDate(post.date)}</Typography>
        </Box>
        <Box
          display="flex"
          flex={1.25}
          flexDirection="column"
          gap={{ xs: 4, sm: 2 }}
        >
          <Typography>{post.excerpt}</Typography>
          <AuthorBox author={author} />
        </Box>
      </Box>
      <Box display="flex" alignSelf="flex-end" p={1}>
        <Button
          variant="arcade"
          color="success"
          endIcon={<ArrowRightAlt />}
          href={postUrl}
        >
          Continue Reading
        </Button>
      </Box>
    </Paper>
  );
};
