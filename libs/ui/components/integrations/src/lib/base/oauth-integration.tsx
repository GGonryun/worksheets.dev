import { trpc } from '@worksheets/trpc-charity';
import { OAuthIntegrationProvider } from '@worksheets/util/integrations';
import React from 'react';

import { Integration } from './integration';

export const OAuthIntegration: React.FC<{
  title: string;
  provider: OAuthIntegrationProvider;
}> = ({ title, provider }) => {
  const user = trpc.user.integrations.oauth.identity.useQuery(provider);
  const authorize = trpc.user.integrations.oauth.authorize.useMutation();
  const revoke = trpc.user.integrations.oauth.revoke.useMutation();

  return (
    <Integration
      provider={provider}
      title={title}
      identity={user.data?.name}
      description={{
        isLoading: user.isLoading || user.isRefetching,
        isError: user.isError,
      }}
      action={{
        isLoading:
          user.isLoading ||
          user.isRefetching ||
          authorize.isLoading ||
          revoke.isLoading,
        isError: user.isError,
        onConnect: async () => {
          const url = await authorize.mutateAsync(provider);
          window.open(url, '_blank');
        },
        onDisconnect: async () => {
          await revoke.mutateAsync(provider);
          await user.refetch();
        },
      }}
    />
  );
};
