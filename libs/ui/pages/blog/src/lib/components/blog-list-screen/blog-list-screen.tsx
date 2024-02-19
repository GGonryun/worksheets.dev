import { Clear } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import {
  Pagination,
  usePagination,
} from '@worksheets/ui/components/pagination';
import { blogRoutes } from '@worksheets/ui/routes';
import { MarkdownMetadata } from '@worksheets/util-markdown';
import { FC, Fragment } from 'react';

import { usePostFilter } from '../../hooks';
import { PostPreview } from './post-preview';
import { PostPreviews } from './post-previews';

export type BlogListScreenProps = {
  posts: MarkdownMetadata[];
  tag: string;
};

const BLOG_PAGE_SIZE = 10;

export const BlogListScreen: FC<BlogListScreenProps> = ({ posts, tag }) => {
  const data = usePostFilter(posts, tag);
  const { page, setPage, items, max, ref } = usePagination(
    data,
    BLOG_PAGE_SIZE
  );

  const handleSetPage = (page: number) => {
    setPage(page);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',

          p: { xs: 2, sm: 4 },
          gap: 4,
          backgroundColor: (theme) =>
            theme.palette.background['transparent-blue'],
        }}
      >
        <Box position="absolute" top={-128} ref={ref} visibility="hidden" />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          gap={1}
          flexWrap="wrap"
        >
          <Typography
            typography={{ xs: 'h5', sm: 'h4', md: 'h3' }}
            color="text.arcade"
          >
            Articles
          </Typography>
          {!!tag && (
            <Button
              size="small"
              variant="arcade"
              color="error"
              href={blogRoutes.articles.path()}
              startIcon={<Clear />}
            >
              Clear Filters
            </Button>
          )}
        </Box>
        <PostPreviews>
          {items.map((post) => (
            <Fragment key={post.slug}>
              <Divider color="white" />
              <PostPreview {...post} />
            </Fragment>
          ))}
        </PostPreviews>
        <Divider color="white" />
        <Pagination page={page} setPage={handleSetPage} pages={max} />
      </Paper>
    </Container>
  );
};
