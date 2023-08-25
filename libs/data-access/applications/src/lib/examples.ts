import { TRPCError } from '@trpc/server';
import { AnyApplication, AnyMethod } from '@worksheets/apps-core';
import {
  MethodSampleData,
  ApplicationRegistrySampleData,
  sampleData,
} from '@worksheets/apps-sample-data';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import {
  ListApplicationMethodDetailsResponse,
  MethodExampleData,
  commonErrorSchema,
} from '@worksheets/schemas-applications';
import { convertZodSchemaToJsonSchema } from '@worksheets/util-json';
import { z } from '@worksheets/zod';

export const createMethodExamples = (
  app: AnyApplication,
  method: AnyMethod
): ListApplicationMethodDetailsResponse[number]['examples'] => ({
  request: {
    schema: createRequestSchema({
      app,
      method,
    }),
    examples: [
      format(
        getMethodInputSampleData({
          appId: app.appId,
          methodId: method.methodId,
        })
      ),
    ],
  },
  response: {
    '200': {
      description: 'A successful response',
      schema: createResponseSchema(method),
      examples: [
        format(
          getMethodOutputSampleData({
            appId: app.appId,
            methodId: method.methodId,
          })
        ),
      ],
    },
    // TODO: introduce better error handling and migrate status code descriptions to each provider and remove this.
    ...errorResponses,
  },
  code: {
    curl: createCurlExample({ appId: app.appId, methodId: method.methodId }),
  },
});

const createRequestSchema = ({
  app,
  method,
}: {
  app: AnyApplication;
  method: AnyMethod;
}) => {
  return convertZodSchemaToJsonSchema(
    z.object({
      context: app.context,
      input: method.input,
    })
  );
};

const createResponseSchema = (method: AnyMethod) => {
  return convertZodSchemaToJsonSchema(
    z.object({
      data: method.output,
    })
  );
};

const format = (input: unknown) => {
  if (input == null) return '';
  return JSON.stringify(input, null, 4);
};

const createCurlExample = ({
  appId,
  methodId,
}: {
  appId: string;
  methodId?: string;
}) => {
  if (!methodId) return '';

  const lines = JSON.stringify(
    {
      input: getMethodInputSampleData({ appId, methodId }),
      context: getAppContextSampleData(appId),
    },
    null,
    2
  ).split('\n');

  const input = lines
    .map((line, i) => (i != lines.length - 1 ? `${line} \\` : line))
    .join('\n');

  return `
curl --request POST '${SERVER_SETTINGS.WEBSITES.API_URL()}/v1/call/${appId}/${methodId}'  \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer <WORKSHEETS_API_KEY>' \\
-d ${input || format({})}
`.trim();
};

/** All of these methods fetch sample data */
const getApp = (
  appId: string
): MethodSampleData<AnyApplication> | undefined => {
  const key = appId as keyof ApplicationRegistrySampleData;
  return sampleData[key] as unknown as MethodSampleData<AnyApplication>;
};

const getAppContextSampleData = (appId: string) => {
  return getApp(appId)?.context;
};

const getMethod = ({
  appId,
  methodId,
}: {
  appId: string;
  methodId: string;
}) => {
  const app = getApp(appId);
  if (!app) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `App not found: ${appId}`,
    });
  }

  const method = app[methodId];
  if (!method) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Method not found: ${methodId} on app: ${appId}`,
    });
  }
  return method;
};

export const getMethodInputSampleData = ({
  appId,
  methodId,
}: {
  appId: string;
  methodId?: string;
}) => {
  if (!methodId) return {};
  const method = getMethod({ appId, methodId });
  return method.input;
};

export const getMethodOutputSampleData = ({
  appId,
  methodId,
}: {
  appId: string;
  methodId?: string;
}) => {
  if (!methodId) return {};
  const method = getMethod({ appId, methodId });
  return method.output;
};

const errorResponses: Record<string, MethodExampleData> = {
  '400': {
    description:
      'A bad request containing invalid data. These errors should not be retried without first modifying the request.',
    schema: convertZodSchemaToJsonSchema(commonErrorSchema('BAD_REQUEST')),
    examples: [
      format({
        code: 'BAD_REQUEST',
        message:
          'Your request was invalid, modify some parameters and try again.',
      }),
    ],
  },
  '401': {
    description:
      'A request that is not authorized. An API Key is required or the current key has been revoked.',
    schema: convertZodSchemaToJsonSchema(commonErrorSchema('UNAUTHORIZED')),
    examples: [
      format({
        code: 'UNAUTHORIZED',
        message: 'Your request did not include an API key.',
      }),
      format({
        code: 'UNAUTHORIZED',
        message: 'Your request contained an invalid or malformed API key.',
      }),
      format({
        code: 'UNAUTHORIZED',
        message: 'Your API key has been revoked, please contact support.',
      }),
    ],
  },
  '403': {
    description:
      'A request that is forbidden. The user does not have access to the requested resource or the resource might not exist anymore.',
    schema: convertZodSchemaToJsonSchema(commonErrorSchema('FORBIDDEN')),
    examples: [
      format({
        code: 'FORBIDDEN',
        message: 'A provider specific reason for the error code will go here.',
      }),
    ],
  },
  '404': {
    description: 'A request that is not found.',
    schema: convertZodSchemaToJsonSchema(commonErrorSchema('NOT_FOUND')),
    examples: [
      format({
        code: 'NOT_FOUND',
        message: 'A provider specific reason for the error code will go here.',
      }),
    ],
  },
  '409': {
    description:
      'A request that failed due to a conflict. A common example is when a user tries to create a resource that already exists. Retrying the request will not resolve the issue.',
    schema: convertZodSchemaToJsonSchema(commonErrorSchema('CONFLICT')),
    examples: [
      format({
        code: 'CONFLICT',
        message:
          'Unable to process request. A modification has already been made to the resource.Do not try again.',
      }),
    ],
  },
  '412': {
    description:
      "A request that was performed with invalid state in memory or made a request assuming a state that has not been reached. A common example is when a user tries to update a resource that has been updated by another user since the user's last request. Another example is when a user tries to delete a resource that has already been deleted. A common solution is to try again. Unlike a 409, this request can be retried without modification.",
    schema: convertZodSchemaToJsonSchema(
      commonErrorSchema('PRECONDITION_FAILED')
    ),
    examples: [
      format({
        code: 'PRECONDITION_FAILED',
        message: 'A provider specific reason for the error code will go here.',
      }),
    ],
  },
  '429': {
    description:
      'A request that was rate limited. The user should try again after a delay. The delay can be determined by the Retry-After header. If no header is provided, it is safe to retry every 10 seconds.',
    schema: convertZodSchemaToJsonSchema(commonErrorSchema('RATE_LIMITED')),
    examples: [
      format({
        code: 'RATE_LIMITED',
        message: 'A provider specific reason for the error code will go here.',
      }),
    ],
  },
  '500': {
    description:
      'A request that failed due to an internal server error. This is a generic error code that should not be used unless the error is not covered by any other error code.',
    schema: convertZodSchemaToJsonSchema(
      commonErrorSchema('INTERNAL_SERVER_ERROR')
    ),
    examples: [
      format({
        code: 'INTERNAL_SERVER_ERROR',
        message:
          "Failed to process modification. Please try again. If the error persists, the user should contact the provider's support team.",
      }),
    ],
  },
  '503': {
    description:
      "A request that failed because our API is currently unavailable. The user should try again after a delay. Unlike a 429, the response will not include a Retry-After header. We recommend tracking our incident page until the problem is patched. If the error persists, the user should contact the provider's support team. ",
    schema: convertZodSchemaToJsonSchema(
      commonErrorSchema('SERVICE_UNAVAILABLE')
    ),
    examples: [
      format({
        code: 'SERVICE_UNAVAILABLE',
        message: 'A provider specific reason for the error code will go here.',
      }),
    ],
  },
};
