import { ConnectionsFeatureWedge } from '@worksheets/ui/feature-wedges';

export const ConnectionsPage: React.FC<{ appId: string }> = ({ appId }) => {
  // TODO: add a feature flag for user's and return the connections list instead.
  return <ConnectionsFeatureWedge />;
};
