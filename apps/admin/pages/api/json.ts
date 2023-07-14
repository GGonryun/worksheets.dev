import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from '@worksheets/trpc/admin/server';

const adminUrl = SERVER_SETTINGS.WEBSITES.ADMIN_URL();
const docsUrl = SERVER_SETTINGS.WEBSITES.DOCS_URL();

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: 'Worksheets Admin API',
  description:
    'Execute administrative operations against the worksheets system',
  version: '1.0.0',
  baseUrl: `${adminUrl}/api`,
  docsUrl: `${docsUrl}`,
  tags: ['executions', 'reapers'],
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
