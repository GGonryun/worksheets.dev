import { TRPCError } from '@trpc/server';
import { ApplicationMethodExecutor, ApplicationExecutors } from '../framework';

export const search: ApplicationMethodExecutor<'giphy', 'search'> = async ({
  context,
  input,
}) => {
  const { query, limit, offset, lang, randomId, rating } = input;
  // fetch request to giphy api
  // return response
  const options = new URLSearchParams({
    api_key: context.apiKey,
    limit: limit?.toString() ?? '5',
  });

  if (query) options.append('q', query);
  if (offset) options.append('offset', offset.toString());
  if (lang) options.append('lang', lang);
  if (randomId) options.append('random_id', randomId);
  if (rating) options.append('rating', rating);

  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?${options.toString()}`
  );

  if (!response.ok) {
    const text = await response.text();
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `GIPHY API request failed ${response.status}`,
      cause: text,
    });
  }

  const json = await response.json();

  return {
    data:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json.data.map((d: any) => ({
        id: d.id,
        type: d.type,
        url: d.url,
        slug: d.slug,
        bitlyUrl: d.bitly_url,
        embedUrl: d.embed_url,
        username: d.username,
        source: d.source,
        title: d.title,
        rating: d.rating,
        sourceTld: d.source_tld,
        sourcePostUrl: d.source_post_url,
      })),
    pagination: {
      totalCount: json.pagination.total_count,
      count: json.pagination.count,
      offset: json.pagination.offset,
    },
    meta: {
      status: json.meta.status,
      msg: json.meta.msg,
      responseId: json.meta.response_id,
    },
  };
};

export const giphy: ApplicationExecutors<'giphy'> = {
  search,
};
