import { IntegrationProvider } from '@prisma/client';
import React from 'react';

import { OAuthIntegration } from '../base/oauth-integration';

export const TwitterIntegration: React.FC = () => {
  return (
    <OAuthIntegration
      title={'X (Twitter)'}
      provider={IntegrationProvider.TWITTER}
    />
  );
};
