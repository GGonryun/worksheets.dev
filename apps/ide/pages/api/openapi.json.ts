import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { appRouter } from '@worksheets/trpc/ide/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateOpenApiDocument } from 'trpc-openapi';

const appUrl = SERVER_SETTINGS.WEBSITES.APP_URL();
const docsUrl = SERVER_SETTINGS.WEBSITES.DOCS_URL();

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Worksheets API',
  description: 'OpenAPI compliant REST API built using tRPC with Next.js',
  version: '1.0.0',
  baseUrl: `${appUrl}/api`,
  docsUrl: `${docsUrl}/docs`,
  tags: [
    'worksheets',
    'executions',
    'connections',
    'user',
    'templates',
    'applications',
    'logs',
    'reapers',
  ],
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
});

// Respond with our OpenAPI schema
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send(openApiDocument);
};

export default handler;
