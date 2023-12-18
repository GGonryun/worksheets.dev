import { Box, Link, Typography } from '@mui/material';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { FC } from 'react';
import { urls } from '@worksheets/ui-games';
import { Flex, useDeviceSize } from '@worksheets/ui-core';
import { ArrowRightAlt } from '@mui/icons-material';
import { printDate } from '@worksheets/util/time';
import { blogAuthors } from '@worksheets/data-access/charity-games';
import { CoverImage } from '@worksheets/ui/images';

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
  const prettyDate = printDate(date);

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
            {prettyDate} by{' '}
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
      <Box height={130} minWidth={{ xs: 0, md: 275 }} position="relative">
        {!isMobile && (
          <CoverImage priority src={coverImage} alt={`${title} image`} />
        )}
      </Box>
    </Flex>
  );
};
