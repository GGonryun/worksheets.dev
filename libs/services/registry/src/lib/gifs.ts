import { newService, newEndpoint } from '@worksheets/services-core';
import { z } from '@worksheets/zod';

const search = newEndpoint({
  id: 'search',
  title: 'Search',
  subtitle: 'Search for GIFs',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/gifs/search.svg',
  input: z.object({
    query: z.string(),
  }),
  output: z.object({
    gifs: z.array(
      z.object({
        id: z.string(),
        url: z.string(),
        title: z.string(),
        height: z.number(),
        width: z.number(),
      })
    ),
  }),
  providers: [],
});

export const gifs = newService({
  id: 'gifs',
  title: 'GIFs',
  subtitle: 'Search for GIFs',
  logo: 'https://storage.googleapis.com/worksheets-test-app-logos/services/gifs/gifs.svg',
  category: 'media',
  providers: [],
  endpoints: {
    search,
  },
});
