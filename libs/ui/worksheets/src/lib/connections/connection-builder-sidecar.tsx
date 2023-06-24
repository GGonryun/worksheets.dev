import { ConnectionBuilderSteps } from './connection-builder-steps';
import { SidecarLayout } from '../shared/sidecar-layout';
import { trpc } from '@worksheets/trpc/ide';
export const ConnectionBuilderSidecar: React.FC<{
  id: string;
  open: boolean;
  onClose: () => void;
}> = ({ id, open, onClose }) => {
  const { data: apps } = trpc.applications.list.useQuery(
    {
      customizable: true,
    },
    { enabled: open }
  );

  return (
    <SidecarLayout
      title="Create a new connection"
      open={open}
      onClose={onClose}
    >
      <ConnectionBuilderSteps
        connectionId={id}
        apps={apps ?? []}
        onClose={onClose}
      />
    </SidecarLayout>
  );
};
