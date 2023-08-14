import { TRPCError } from '@trpc/server';
import { ApplicationExecutors, ApplicationMethodExecutor } from '../framework';

export const search: ApplicationMethodExecutor<'tenor', 'search'> = async ({
  context,
  input,
}) => {
  const params = new URLSearchParams({
    key: context.key,
    ar_range: 'all',
  });

  if (context.clientKey) params.append('client_key', context.clientKey);
  if (input.query) params.append('q', input.query);
  if (input.limit) params.append('limit', input.limit.toString());
  if (input.position) params.append('pos', input.position);

  const response = await fetch(
    `https://tenor.googleapis.com/v2/search?${params.toString()}`
  );

  if (!response.ok) {
    const text = await response.text();
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Tenor API returned an error: ${response.status}`,
      cause: text,
    });
  }
  const json = await response.json();
  console.log(json);
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    results: json.results.map((result: any) => ({
      id: result.id,
      title: result.title,
      url: result.url,
      itemUrl: result.itemurl,
      description: result.content_description ?? '',
      hasAudio: result.hasaudio,
      mediaFormats: result.media_formats,
      tags: result.tags,
    })),
    next: json.next,
  };
};

export const tenor: ApplicationExecutors<'tenor'> = {
  search,
};
