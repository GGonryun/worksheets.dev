import { IntegrationProvider } from '@prisma/client';
import { trpc } from '@worksheets/trpc-charity';
import React from 'react';

import { Integration } from '../base/integration';

export const SteamIntegration: React.FC = () => {
  const provider = IntegrationProvider.STEAM;
  const user = trpc.user.integrations.apiKey.identity.useQuery(provider);
  const revoke = trpc.user.integrations.apiKey.revoke.useMutation();
  const authorize = trpc.user.integrations.apiKey.authorize.useMutation();

  return (
    <Integration
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
        isError: false,
        onConnect: async () => {
          const url = await authorize.mutateAsync(provider);
          window.open(url, '_blank');
        },
        onDisconnect: async () => {
          await revoke.mutateAsync(provider);
          await user.refetch();
        },
      }}
      title={'Steam Games'}
      provider={provider}
    />
  );
};
