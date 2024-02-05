import { Box, Link, Typography } from '@mui/material';
import { CoverImage } from '@worksheets/ui/components/images';
import { BlogAuthor } from '@worksheets/util/types';
import { FC } from 'react';

export const AuthorBox: FC<{ author: BlogAuthor }> = ({ author }) => {
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
