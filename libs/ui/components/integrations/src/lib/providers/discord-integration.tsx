import { IntegrationProvider } from '@worksheets/prisma';
import React from 'react';

import { OAuthIntegration } from '../base/oauth-integration';

export const DiscordIntegration: React.FC = () => {
  return (
    <OAuthIntegration title="Discord" provider={IntegrationProvider.DISCORD} />
  );
};
