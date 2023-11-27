import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { FillImage, ResponsiveImage } from '../../images';
import { BlogAuthor } from '../../../types/author';
import { printDate } from '@worksheets/util/time';
import { ArrowLeft } from '@mui/icons-material';

export type PostHeaderProps = {
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
        variant="contained"
        color="error"
        startIcon={<ArrowLeft fontSize="inherit" />}
        href="/blog"
        sx={{
          width: 'fit-content',
          borderRadius: 8,
          px: { xs: 1, sm: 2 },
          py: { xs: 0.5, sm: 0.75 },
        }}
      >
        All Posts
      </Button>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '2rem', sm: '3rem' },
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          my: { xs: 2, sm: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ResponsiveImage
          priority
          alt={`${title} cover`}
          src={coverImage}
          style={{
            maxWidth: 600,
          }}
        />
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
        <Typography variant="h6" ml={2}>
          {author.name}
        </Typography>
      </Box>

      <Typography variant="body3">{prettyDate}</Typography>
    </Box>
  );
};
