import { SidecarLayout } from '../../shared/sidecar-layout';
import { ApplicationInformation } from './application-information';
import { SidecarTitle } from './sidecar-title';
import { ConnectionForm } from './connection-form';
import { Footer } from './footer';
import { useRouter } from 'next/router';
import { trpc } from '@worksheets/trpc/ide';

export const ConnectionSidecar: React.FC<{
  appId?: string;
}> = ({ appId }) => {
  const { push } = useRouter();

  const { data: details, isLoading } = trpc.connections.getDetails.useQuery(
    {
      appId: appId ?? '',
    },
    { enabled: !!appId }
  );

  const handleClose = () => {
    push(`/connections`);
  };

  if (!details || isLoading) return null;

  return (
    <SidecarLayout
      open={Boolean(appId)}
      width={'600px'}
      onClose={handleClose}
      title={<SidecarTitle connection={details} onClose={handleClose} />}
      section1={<ApplicationInformation connection={details} />}
      section2={<ConnectionForm details={details} />}
      section3={<Footer details={details} />}
    />
  );
};
