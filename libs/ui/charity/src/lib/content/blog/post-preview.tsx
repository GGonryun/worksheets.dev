import { Link, Typography } from '@mui/material';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { FC } from 'react';
import { urls } from '@worksheets/ui-games';
import { Flex, useDeviceSize } from '@worksheets/ui-core';
import Image from 'next/image';
import { ArrowRightAlt } from '@mui/icons-material';
import { blogAuthors } from '../../../data/authors';

export const PostPreview: FC<MarkdownMetadata> = ({
  title,
  excerpt,
  coverImage,
  date,
  authorId,
  tags,
  slug,
}) => {
  const { isMobile } = useDeviceSize();
  const trimmedExcerpt = excerpt.slice(0, 150) + '...';
  const url = urls.relative.blog + '/' + slug;
  const author = blogAuthors[authorId];
  const authorUrl = urls.relative.about + '#' + author.id;

  return (
    <Flex spaceBetween fullWidth gap={4}>
      <Flex column gap={1}>
        <Typography variant="h5">
          <Link href={url} color="error.main">
            {title}
          </Link>
        </Typography>
        <Flex wrap gap={0.5}>
          <Typography variant="body3" sx={{ pr: 4 }}>
            {date} by{' '}
            <Link color="inherit" href={authorUrl}>
              {author.name}
            </Link>
          </Typography>
          <Flex gap={1}>
            {tags.map((tag) => (
              <Typography
                variant="body3"
                key={tag}
                fontStyle="italic"
                color="error.main"
              >
                #{tag}
              </Typography>
            ))}
          </Flex>
        </Flex>
        <Link href={url} underline="none" color="inherit">
          <Typography sx={{ display: 'inline' }}>{trimmedExcerpt}</Typography>{' '}
          <Typography
            sx={{
              display: 'inline-flex',
              gap: 0.5,
              textDecoration: 'underline',
              fontWeight: '500',
              color: (theme) => theme.palette.grey[700],
              fontStyle: 'italic',
            }}
          >
            Continue Reading
            <ArrowRightAlt color="inherit" />
          </Typography>
        </Link>
      </Flex>
      {!isMobile && (
        <Image
          src={coverImage}
          alt={`${title} image`}
          height={130}
          width={225}
        />
      )}
    </Flex>
  );
};
