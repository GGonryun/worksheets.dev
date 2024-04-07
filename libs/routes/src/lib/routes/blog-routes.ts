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
    path: '/articles',
    query: BlogQueryParams,
  }),
  article: createRoute({
    path: '/articles/[slug]',
  }),
  author: createRoute({
    path: '/articles/author/[authorId]',
  }),
};
