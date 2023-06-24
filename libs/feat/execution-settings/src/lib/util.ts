import { ApplicationDefinition } from '@worksheets/apps/framework';
import { HandlerFailure } from '@worksheets/util/next';

export const closeRedirect = () => ({ url: '/oauth/close' });

export const errorRedirect = (message: string) => ({
  url: `/oauth/error?reason=${message}`,
});
