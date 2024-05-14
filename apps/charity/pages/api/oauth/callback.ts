import { TRPCError } from '@trpc/server';
import { prisma } from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { OAuthService } from '@worksheets/services/integrations';
import { OAuthIntegrationProvider } from '@worksheets/util/integrations';
import { isString } from '@worksheets/util/strings';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  console.info('Received OAuth callback request', request.query);
  if (!isString(request.query.state)) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'State is required in response.',
    });
  }

  const integration = await prisma.integration.findFirst({
    where: {
      id: request.query.state,
    },
  });

  if (!integration) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Integration does not exist',
    });
  }

  const oauth = new OAuthService(
    prisma,
    integration.provider as OAuthIntegrationProvider
  );
  try {
    const redirectTo = await oauth.secure({
      code: request.query.code as string,
      error: request.query.error as string | undefined,
      integration,
    });
    response.redirect(redirectTo);
  } catch (error) {
    console.error(
      'An unexpected error occurred while securing integration',
      error
    );

    response.redirect(routes.oauth.error.path());
  }
};

export default handler;
