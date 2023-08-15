import { TRPCError } from '@trpc/server';
import { ApplicationExecutors, ApplicationMethodExecutor } from '../framework';
import { InferApplicationContext } from '@worksheets/apps-registry';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertRawToMessage = (raw: any) => ({
  sid: raw.account_sid,
  dateCreated: raw.date_created,
  dateUpdated: raw.date_updated,
  dateSent: raw.date_sent,
  body: raw.body,
  errorCode: raw.error_code,
  errorMessage: raw.error_message,
  numMedia: raw.num_media,
  numSegments: raw.num_segments,
  status: raw.status,
  from: raw.from,
  to: raw.to,
  uri: raw.uri,
});

const fetcher = async ({
  context,
  request: { route, method },
  query,
  body,
}: {
  context: InferApplicationContext<'twilio'>;
  request: { route: 'Messages.json'; method: 'POST' | 'GET' };
  query?: URLSearchParams;
  body?: URLSearchParams;
}) => {
  const base = `https://api.twilio.com/2010-04-01/Accounts/${context.sid}/${route}`;
  const url = query ? `${base}?${query.toString()}` : base;

  const requestOptions: RequestInit = {
    method,
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${context.sid}:${context.token}`
      ).toString('base64')}`,
    },
  };

  if (body) {
    requestOptions.body = body;
  }

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    const text = await response.text();
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Twilio API returned an error: ${response.status}`,
      cause: text,
    });
  }
  return await response.json();
};

export const createMessage: ApplicationMethodExecutor<
  'twilio',
  'createMessage'
> = async ({ context, input }) => {
  const result = await fetcher({
    context,
    request: { route: 'Messages.json', method: 'POST' },
    body: new URLSearchParams({
      From: context.phone,
      To: input.to,
      Body: input.body,
    }),
  });

  return convertRawToMessage(result);
};

export const listMessages: ApplicationMethodExecutor<
  'twilio',
  'listMessages'
> = async ({ context, input }) => {
  const query = new URLSearchParams({
    PageSize: input.pageSize?.toString() ?? '25',
  });

  if (input.to) query.set('To', input.to);
  if (input.from) query.set('From', input.from);
  if (input.dateSent) query.set('DateSent', input.dateSent);

  const result = await fetcher({
    context,
    request: { route: 'Messages.json', method: 'GET' },
    query,
  });

  return {
    pageSize: result.page_size,
    messages: result.messages.map(convertRawToMessage),
  };
};

export const twilio: ApplicationExecutors<'twilio'> = {
  createMessage,
  listMessages,
};
