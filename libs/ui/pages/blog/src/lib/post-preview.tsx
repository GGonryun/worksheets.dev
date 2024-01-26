import { ArrowRightAlt } from '@mui/icons-material';
import { Box, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import { blogAuthors } from '@worksheets/data-access/charity-games';
import { CoverImage } from '@worksheets/ui/components/images';
import { Flex } from '@worksheets/ui-core';
import { printDate } from '@worksheets/util/time';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { FC } from 'react';

export const PostPreview: FC<MarkdownMetadata> = ({
  title,
  excerpt,
  coverImage,
  date,
  authorId,
  tags,
  slug,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const trimmedExcerpt = excerpt.slice(0, 150) + '...';
  const url = `/blog/${slug}`;
  const author = blogAuthors[authorId];
  const authorUrl = `/about#${author.id}`;
  const prettyDate = printDate(date);

  return (
    <Flex spaceBetween fullWidth gap={4}>
      <Flex
        column
        gap={1}
        sx={{
          color: 'text.arcade',
        }}
      >
        <Typography variant="h5">
          <Link href={url} color="inherit">
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
                color="warning.main"
                variant="body3"
                key={tag}
                fontStyle="italic"
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
