import { appRouter } from '@worksheets/trpc/ide/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateOpenApiDocument } from 'trpc-openapi';

const url =
  process.env.BASE_URL ||
  process.env.OAUTH_BASE_URL ||
  process.env.NEXT_PUBLIC_HOST ||
  'https://localhost:4200';

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Worksheets API',
  description: 'OpenAPI compliant REST API built using tRPC with Next.js',
  version: '1.0.0',
  baseUrl: `${url}/api`,
  docsUrl: `${url}/docs`,
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
