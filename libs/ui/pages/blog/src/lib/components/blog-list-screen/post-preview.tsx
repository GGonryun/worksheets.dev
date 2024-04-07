import { ArrowRight } from '@mui/icons-material';
import { Box, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import { blogRoutes } from '@worksheets/routes';
import { CoverImage } from '@worksheets/ui/components/images';
import { Flex } from '@worksheets/ui-core';
import { blogAuthors } from '@worksheets/util/blog';
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
  const url = blogRoutes.article.path({ params: { slug } });
  const author = blogAuthors[authorId];
  const authorUrl = blogRoutes.author.path({
    params: { authorId },
  });
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
        <Typography
          typography={{ xs: 'body1', sm: 'h6', md: 'h5' }}
          fontWeight={{ xs: 700, sm: 700 }}
        >
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
                component={Link}
                href={blogRoutes.articles.path({
                  query: {
                    tag,
                  },
                })}
                color="warning.main"
                variant="body3"
                key={tag}
                fontStyle="italic"
                sx={{
                  textDecoration: 'underline',
                  textDecorationColor: 'inherit',
                }}
              >
                #{tag}
              </Typography>
            ))}
          </Flex>
        </Flex>
        <Link href={url} underline="none" color="inherit">
          <Typography
            display="inline"
            typography={{ xs: 'body2', sm: 'body1' }}
          >
            {trimmedExcerpt}
          </Typography>{' '}
          <Typography
            typography={{ xs: 'body2', sm: 'body1' }}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'underline',
              fontWeight: '500',
              fontStyle: 'italic',
            }}
          >
            Continue Reading
            <ArrowRight color="inherit" sx={{ mb: -0.5 }} />
          </Typography>
        </Link>
      </Flex>
      <Box
        component={Link}
        href={url}
        height={130}
        minWidth={{ xs: 0, md: 275 }}
        position="relative"
      >
        {!isMobile && (
          <CoverImage priority src={coverImage} alt={`${title} image`} />
        )}
      </Box>
    </Flex>
  );
};
