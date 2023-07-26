import { Box } from '@mui/material';
import { SidecarLayout } from '../../shared/sidecar-layout';
import { SupportBox } from './support-box';
import { UninstallBox } from './uninstall-box';
import { ApplicationInformation } from './application-information';
import { SidecarTitle } from './sidecar-title';
import { ConnectionForm } from './connection-form';
import { Footer } from './footer';
//

export const ConnectionSidecar: React.FC<{
  appId?: string;
}> = ({ appId }) => {
  return (
    <SidecarLayout
      open={Boolean(appId)}
      width={'600px'}
      onClose={function (): void {
        throw new Error('Function not implemented.');
      }}
      title={<SidecarTitle />}
      section1={<ApplicationInformation />}
      section2={<ConnectionForm />}
      section3={<Footer />}
    />
  );
};
