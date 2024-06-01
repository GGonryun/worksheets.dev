import { IntegrationProvider } from '@prisma/client';
import React from 'react';

import { OAuthIntegration } from '../base/oauth-integration';

export const YouTubeIntegration: React.FC = () => {
  return (
    <OAuthIntegration
      title={'YouTube'}
      provider={IntegrationProvider.YOUTUBE}
    />
  );
};
