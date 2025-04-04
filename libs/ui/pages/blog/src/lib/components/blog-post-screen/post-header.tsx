import { ArrowLeft } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { blogRoutes } from '@worksheets/routes';
import { FillImage, ResponsiveImage } from '@worksheets/ui/components/images';
import { printDate } from '@worksheets/util/time';
import { BlogAuthor } from '@worksheets/util/types';
import { FC } from 'react';

type PostHeaderProps = {
  title: string;
  coverImage: string;
  date: string;
  author: BlogAuthor;
};

export const PostHeader: FC<PostHeaderProps> = ({
  title,
  coverImage,
  date,
  author,
}) => {
  const prettyDate = printDate(date);

  return (
    <Box display="flex" flexDirection="column" gap={2} pb={2}>
      <Button
        variant="arcade"
        color="error"
        startIcon={<ArrowLeft fontSize="inherit" />}
        href={blogRoutes.articles.path()}
        sx={{
          width: 'fit-content',
          px: { xs: 1, sm: 2 },
          py: { xs: 0.5, sm: 0.75 },
        }}
      >
        <Typography fontWeight={700}>All Posts</Typography>
      </Button>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2rem', sm: '3rem' },
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          my: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ResponsiveImage priority alt={`${title} cover`} src={coverImage} />
      </Box>

      <Box display="flex" alignItems="center">
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            width: 64,
            height: 64,
            borderRadius: '50%',
          }}
        >
          <FillImage alt={author.name} src={author.avatar} />
        </Box>
        <Box ml={2}>
          <Typography variant="h6">{author.name}</Typography>
          <Typography variant="body3">{prettyDate}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
