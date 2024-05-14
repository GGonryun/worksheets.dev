import { IntegrationProvider } from '@worksheets/prisma';

import { OAuthIntegration } from '../base/oauth-integration';

export const TwitchIntegration: React.FC = () => {
  return (
    <OAuthIntegration title="Twitch TV" provider={IntegrationProvider.TWITCH} />
  );
};
