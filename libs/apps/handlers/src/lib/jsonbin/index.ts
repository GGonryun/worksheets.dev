import { TRPCError } from '@trpc/server';
import { ApplicationExecutors, ApplicationMethodExecutor } from '../framework';
import { InferApplicationContext } from '@worksheets/apps-registry';

const rootUrl = 'https://api.jsonbin.io/v3';

const processResponse = async (response: Response) => {
  if (!response.ok) {
    const text = await response.text();
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `JSONBIN API returned an unknown error: ${response.status}`,
      cause: text,
    });
  }

  return await response.json();
};

const createHeaders = (
  context: InferApplicationContext<'jsonbin'>,
  extra?: Record<string, string>
): Record<string, string> => ({
  ...extra,
  'X-Master-Key': `${context.masterKey}`,
});

const fetcher = async ({
  context,
  request: { endpoint, method },
  headers,
  body,
}: {
  context: InferApplicationContext<'jsonbin'>;
  request: { endpoint: string; method: 'GET' | 'POST' | 'PUT' | 'DELETE' };
  query?: URLSearchParams;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}) => {
  const url = `${rootUrl}${endpoint}`;

  const request: RequestInit = {
    method: method,
    headers: createHeaders(context, headers),
  };

  if (body) request.body = JSON.stringify(body);

  const response = await fetch(url, request);

  return await processResponse(response);
};

const createBin: ApplicationMethodExecutor<'jsonbin', 'createBin'> = async ({
  context,
  input,
}) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Bin-Private': input.private ? 'true' : 'false',
  };
  if (input.name) headers['X-Bin-Name'] = input.name;
  if (input.collectionId) headers['X-Collection-Id'] = input.collectionId;

  const json = await fetcher({
    context,
    request: {
      endpoint: `/b`,
      method: 'POST',
    },
    body: input.data,
    headers,
  });

  return {
    data: json.record,
    metadata: {
      id: json.metadata?.id ?? '',
      collectionId: json.metadata?.collectionId ?? '',
      createdAt: json.metadata?.createdAt ?? '',
      private: json.metadata?.private ?? true,
    },
  };
};

const readBin: ApplicationMethodExecutor<'jsonbin', 'readBin'> = async ({
  context,
  input,
}) => {
  const json = await fetcher({
    context,
    request: {
      endpoint: `/b/${input.binId}/latest`,
      method: 'GET',
    },
    headers: {
      'X-Bin-Meta': 'true',
    },
  });

  return {
    data: json.record,
    metadata: {
      id: json.metadata?.id ?? '',
      collectionId: json.metadata?.collectionId ?? '',
      createdAt: json.metadata?.createdAt ?? '',
      private: json.metadata?.private ?? true,
    },
  };
};

const updateBin: ApplicationMethodExecutor<'jsonbin', 'updateBin'> = async ({
  context,
  input,
}) => {
  const json = await fetcher({
    context,
    request: {
      endpoint: `/b/${input.binId}`,
      method: 'PUT',
    },
    body: input.data,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return {
    data: json.record,
    metadata: {
      id: json.metadata?.parentId ?? '',
      collectionId: json.metadata?.collectionId ?? '',
      createdAt: json.metadata?.createdAt ?? '',
      private: json.metadata?.private ?? true,
    },
  };
};

const listBins: ApplicationMethodExecutor<'jsonbin', 'listBins'> = async ({
  context,
  input,
}) => {
  const json = await fetcher({
    context,
    request: {
      endpoint: `/c/${input.collectionId ?? 'uncategorized'}/bins`,
      method: 'GET',
    },
    headers: {
      'X-Sort-Order': input.sortOrder ?? 'descending',
    },
  });

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bins: json.map((bin: any) => ({
      binId: bin.record,
      snippetMeta: bin.snippetMeta,
      private: bin.metadata?.private ?? true,
      createdAt: bin.metadata?.createdAt ?? '',
    })),
  };
};

const deleteBin: ApplicationMethodExecutor<'jsonbin', 'deleteBin'> = async ({
  context,
  input,
}) => {
  const json = await fetcher({
    context,
    request: {
      endpoint: `/b/${input.binId}`,
      method: 'DELETE',
    },
  });

  return {
    metadata: {
      id: json.metadata?.id ?? '',
      versionsDeleted: json.metadata?.versionsDeleted ?? 0,
    },
    message: json.message ?? 'Bin deleted successfully',
  };
};

export const jsonbin: ApplicationExecutors<'jsonbin'> = {
  createBin,
  readBin,
  updateBin,
  deleteBin,
  listBins,
};
