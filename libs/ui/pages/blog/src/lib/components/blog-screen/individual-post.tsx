import { Box, Link, Typography } from '@mui/material';
import { ResponsiveImage } from '@worksheets/ui/components/images';
import { printDate } from '@worksheets/util/time';
import { MarkdownMetadata } from '@worksheets/util-markdown';

import { getAuthor } from '../../util/getAuthor';
import { AuthorBox } from './author-box';

export const IndividualPost: React.FC<{ post: MarkdownMetadata }> = ({
  post,
}) => {
  const postUrl = `/blog/${post.slug}`;

  return (
    <Box
      key={post.slug}
      display="flex"
      flexDirection="column"
      color="inherit"
      gap={2}
      flex={1}
    >
      <Box component={Link} href={postUrl} position="relative" width="100%">
        <ResponsiveImage src={post.coverImage} alt={post.title} />
      </Box>
      <Box>
        <Typography
          component={Link}
          href={postUrl}
          color="inherit"
          underline="hover"
          typography={{ xs: 'h6', sm: 'h5' }}
          fontWeight={500}
          gutterBottom
        >
          {post.title}
        </Typography>
        <Typography>{printDate(post.date)}</Typography>
      </Box>
      <Typography>{post.excerpt}</Typography>
      <AuthorBox author={getAuthor(post.authorId)} />
    </Box>
  );
};
