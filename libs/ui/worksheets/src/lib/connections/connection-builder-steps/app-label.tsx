import { Box } from '@mui/material';
import { GetApplicationResponse } from '../../shared/types';
import { TinyLogo } from '../../shared/tiny-logo';

export const AppLabel: React.FC<{ app: GetApplicationResponse }> = ({
  app,
}) => (
  <Box display="flex" alignItems="center" gap={1}>
    {app?.name && app?.logo && <TinyLogo label={app.name} src={app.logo} />}
    <Box>{app?.name}</Box>
  </Box>
);
