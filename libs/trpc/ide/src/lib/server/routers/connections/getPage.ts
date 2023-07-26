import { privateProcedure } from '../../procedures';
import {
  getConnectionsPageRequestSchema,
  getConnectionsPageResponseSchema,
} from '@worksheets/schemas-connections';
export default privateProcedure
  .input(getConnectionsPageRequestSchema)
  .output(getConnectionsPageResponseSchema)
  .query(() => {
    return [
      {
        appId: 'google',
        name: 'Google Apps',
        logo: 'https://storage.googleapis.com/worksheets-test-app-logos/logo-gmail-png-gmail-icon-download-png-and-vector-1.png',
        description:
          'Connect your Google account to access your Google Drive files in Worksheets.',
        status: 'active',
      },
      {
        appId: 'google',
        name: 'Google Apps',
        logo: 'https://storage.googleapis.com/worksheets-test-app-logos/logo-gmail-png-gmail-icon-download-png-and-vector-1.png',
        description:
          'Connect your Google account to access your Google Drive files in Worksheets.',
        status: 'uninstalled',
      },
      {
        appId: 'google',
        name: 'Google Apps',
        logo: 'https://storage.googleapis.com/worksheets-test-app-logos/logo-gmail-png-gmail-icon-download-png-and-vector-1.png',
        description:
          'Connect your Google account to access your Google Drive files in Worksheets.',
        status: 'error',
      },
      {
        appId: 'google',
        name: 'Google Apps',
        logo: 'https://storage.googleapis.com/worksheets-test-app-logos/logo-gmail-png-gmail-icon-download-png-and-vector-1.png',
        description:
          'Connect your Google account to access your Google Drive files in Worksheets.',
        status: 'warning',
      },
      {
        appId: 'google',
        name: 'Google Apps',
        logo: 'https://storage.googleapis.com/worksheets-test-app-logos/logo-gmail-png-gmail-icon-download-png-and-vector-1.png',
        description:
          'Connect your Google account to access your Google Drive files in Worksheets.',
        status: 'disabled',
      },
    ];
  });
