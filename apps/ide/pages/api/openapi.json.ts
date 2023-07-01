import { appRouter } from '@worksheets/trpc/ide/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateOpenApiDocument } from 'trpc-openapi';

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Worksheets API',
  description: 'OpenAPI compliant REST API built using tRPC with Next.js',
  version: '1.0.0',
  baseUrl: 'http://localhost:4200/api',
  docsUrl: 'https://worksheets.dev/docs',
  tags: ['worksheets', 'executions', 'connections'],
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
