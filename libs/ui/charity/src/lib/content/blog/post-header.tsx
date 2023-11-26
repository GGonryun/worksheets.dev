import { FC } from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import { ResponsiveImage } from '../../images';
import { BlogAuthor } from '../../../types/author';

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
  return (
    <Box display="flex" flexDirection="column" gap={2} pb={2}>
      <Typography variant="h3">{title}</Typography>

      <ResponsiveImage alt={`${title} cover`} src={coverImage} />

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
          <Image alt={author.name} src={author.avatar} fill />
        </Box>
        <Typography variant="h6" ml={2}>
          {author.name}
        </Typography>
      </Box>

      <Typography variant="body3">{date}</Typography>
    </Box>
  );
};
