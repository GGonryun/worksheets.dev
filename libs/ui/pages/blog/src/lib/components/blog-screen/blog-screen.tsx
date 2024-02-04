import { ArrowRightAlt } from '@mui/icons-material';
import { Box, Button, Container, Link, Paper, Typography } from '@mui/material';
import { CoverImage, ResponsiveImage } from '@worksheets/ui/components/images';
import { BlogAuthorId, blogAuthors } from '@worksheets/util/blog';
import { printDate } from '@worksheets/util/time';
import { BlogAuthor } from '@worksheets/util/types';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { FC } from 'react';

const getAuthor = (authorId: BlogAuthorId): BlogAuthor => {
  return blogAuthors[authorId];
};

export type BlogScreenProps = {
  posts: MarkdownMetadata[];
};

const FEATURED_POSTS = 3;

export const BlogScreen: FC<BlogScreenProps> = ({ posts }) => {
  const featured = posts.slice(0, FEATURED_POSTS);

  return (
    <Container
      component={Box}
      maxWidth="lg"
      py={2}
      color="text.arcade"
      display="flex"
      flexDirection="column"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: { xs: 'center', sm: 'space-between' },
          alignItems: 'center',
          gap: { xs: 2, sm: 8 },
        }}
      >
        <Typography variant="h1" component="h1">
          Blog.
        </Typography>
        <Typography textAlign={{ xs: 'center', sm: 'left' }}>
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
    </Container>
  );
};

const FeaturedPost: FC<{ post: MarkdownMetadata }> = ({ post }) => {
  const author = getAuthor(post.authorId);
  const postUrl = `/blog/${post.slug}`;
  return (
    <Paper
      component={Box}
      display="flex"
      flexDirection="column"
      gap={{ xs: 4, sm: 6 }}
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
            variant="h3"
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

const SupportingPosts: FC<{ posts: MarkdownMetadata[] }> = ({ posts }) => {
  return (
    <Paper
      component={Box}
      p={2}
      display="flex"
      flexDirection="column"
      sx={{
        color: 'inherit',
        backgroundColor: (theme) =>
          theme.palette.background['transparent-blue'],
      }}
    >
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
        gap={{ xs: 12, sm: 4, md: 6, lg: 8 }}
        p={2}
      >
        {posts.map((post) => (
          <IndividualPost post={post} key={post.slug} />
        ))}
      </Box>
      <Box alignSelf="flex-end" p={1}>
        <Button
          variant="arcade"
          color="error"
          href="/blog"
          endIcon={<ArrowRightAlt />}
        >
          View All Posts
        </Button>
      </Box>
    </Paper>
  );
};

const IndividualPost: React.FC<{ post: MarkdownMetadata }> = ({ post }) => {
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
      <Typography
        component={Link}
        href={postUrl}
        color="inherit"
        underline="hover"
        variant="h4"
        fontWeight={500}
      >
        {post.title}
      </Typography>
      <Typography>{printDate(post.date)}</Typography>
      <Typography>{post.excerpt}</Typography>
      <AuthorBox author={getAuthor(post.authorId)} />
    </Box>
  );
};

const AuthorBox: FC<{ author: BlogAuthor }> = ({ author }) => {
  const authorUrl = `/blog/author/${author.id}`;

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2.5}
      component={Link}
      href={authorUrl}
      underline="hover"
      color="inherit"
    >
      <Box
        position="relative"
        height={64}
        width={64}
        borderRadius="50%"
        overflow="hidden"
      >
        <CoverImage src={author.avatar} alt={author.name} />
      </Box>
      <Typography variant="h6">{author.name}</Typography>
    </Box>
  );
};
