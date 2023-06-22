import { ConnectionBuilderSteps } from './connection-builder-steps';
import { SidecarLayout } from '../shared/sidecar-layout';

export const ConnectionBuilderSidecar: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => (
  <SidecarLayout title="Create a new connection" open={open} onClose={onClose}>
    <ConnectionBuilderSteps
      onConnect={() => {
        alert('TODO: Create connection');
        onClose();
      }}
    />
  </SidecarLayout>
);
