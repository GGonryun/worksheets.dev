import { BLOG_BASE_URL } from '@worksheets/ui/env';
import { BlogQueryParams } from '@worksheets/util/enums';

import { routeBuilder } from '../util';

const createRoute = routeBuilder(BLOG_BASE_URL);

export const blogRoutes = {
  baseUrl: BLOG_BASE_URL,
  home: createRoute({
    path: '/',
  }),
  articles: createRoute({
    path: '/blog',
    query: BlogQueryParams,
  }),
  article: createRoute({
    path: '/blog/[slug]',
  }),
  author: createRoute({
    path: '/blog/author/[authorId]',
  }),
};
