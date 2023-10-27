import { Author } from '@worksheets/util-markdown';
import { FC } from 'react';
import { PostTitle } from './PostTitle';
import Image from 'next/image';
import { Box } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { ParagraphText, SecondarySmallHeaderText } from '../Typography';

export type PostHeaderProps = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export const PostHeader: FC<PostHeaderProps> = ({
  title,
  coverImage,
  date,
  author,
}) => {
  return (
    <Flex column gap={4}>
      <PostTitle>{title}</PostTitle>

      <Image
        alt="Mountains"
        src={coverImage}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }} // optional
      />
      <Flex>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            width: 64,
            height: 64,
            borderRadius: '50%',
          }}
        >
          <Image alt={author.name} src={author.picture} fill />
        </Box>
        <SecondarySmallHeaderText ml={2}>
          {author.name}
        </SecondarySmallHeaderText>
      </Flex>
      <ParagraphText>{date}</ParagraphText>
    </Flex>
  );
};
