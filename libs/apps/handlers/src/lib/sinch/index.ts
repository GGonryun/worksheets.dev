import { TRPCError } from '@trpc/server';
import { ApplicationExecutors, ApplicationMethodExecutor } from '../framework';
import { InferApplicationContext } from '@worksheets/apps-registry';

const baseUrl = 'https://us.sms.api.sinch.com';
const apiPath = '/xms/v1/';

const processResponse = async (response: Response) => {
  if (!response.ok) {
    const text = await response.text();
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Sinch API returned an unknown error: ${response.status}`,
      cause: text,
    });
  }

  return await response.json();
};

export const createHeaders = (
  context: InferApplicationContext<'sinch'>
): Record<string, string> => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${context.apiToken}`,
});

const fetcher = async ({
  context,
  request: { endpoint, method },
  query,
  body,
}: {
  context: InferApplicationContext<'sinch'>;
  request:
    | { endpoint: '/batches' | '/batches/dry_run'; method: 'POST' }
    | { endpoint: '/batches'; method: 'GET' };
  query?: URLSearchParams;
  body?: Record<string, unknown>;
}) => {
  const base = `${baseUrl}${apiPath}${context.servicePlanId}${endpoint}`;
  const url = method === 'GET' && query ? `${base}?${query?.toString()}` : base;
  const request: RequestInit = {
    method: method,
    headers: createHeaders(context),
  };
  if (body) request.body = JSON.stringify(body);

  const response = await fetch(url, request);

  return await processResponse(response);
};

export const dryRunBatch: ApplicationMethodExecutor<
  'sinch',
  'dryRunBatch'
> = async ({ context, input }) => {
  const json = await fetcher({
    context,
    request: {
      endpoint: '/batches/dry_run',
      method: 'POST',
    },
    body: {
      from: input.from,
      to: input.to,
      body: input.body,
      parameters: input.parameters,
    },
  });

  return {
    numberOfMessages: json.number_of_messages,
    numberOfRecipients: json.number_of_recipients,
    perRecipient:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      json.per_recipient?.map((r: any) => ({
        recipient: r.recipient,
        messagePart: r.message_part,
        body: r.body,
        encoding: r.encoding,
      })) ?? [],
  };
};

export const sendBatch: ApplicationMethodExecutor<
  'sinch',
  'sendBatch'
> = async ({ context, input }) => {
  const json = await fetcher({
    context,
    request: {
      endpoint: '/batches',
      method: 'POST',
    },
    body: {
      from: input.from,
      to: input.to,
      body: input.body,
      parameters: input.parameters,
    },
  });

  return convertRawBatchResult(json);
};

export const listBatches: ApplicationMethodExecutor<
  'sinch',
  'listBatches'
> = async ({ context, input }) => {
  const query = new URLSearchParams();
  if (input.page) query.set('page', input.page.toString());
  if (input.pageSize) query.set('page_size', input.pageSize.toString());
  if (input.from) query.set('from', input.from);
  if (input.startDate) query.set('start_date', input.startDate.toString());
  if (input.endDate) query.set('end_date', input.endDate.toString());

  const json = await fetcher({
    context,
    request: {
      endpoint: '/batches',
      method: 'GET',
    },
    query,
  });

  return {
    page: json.page ?? 0,
    pageSize: json.page_size ?? 0,
    count: json.count ?? 0,
    batches: json.batches.map(convertRawBatchResult) ?? [],
  };
};

export const sinch: ApplicationExecutors<'sinch'> = {
  dryRunBatch,
  sendBatch,
  listBatches,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertRawBatchResult = (batch: any) => ({
  id: batch.id,
  to: batch.to,
  from: batch.from,
  body: batch.body,
  canceled: batch.canceled ?? false,
  createdAt: batch.created_at ?? '',
  modifiedAt: batch.modified_at ?? '',
  expireAt: batch.expire_at ?? '',
});
