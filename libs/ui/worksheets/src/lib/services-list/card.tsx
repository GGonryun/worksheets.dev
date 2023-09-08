import {
  ChipProps,
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Chip,
  CardContent,
  Typography,
  useTheme,
  Tooltip,
  alpha,
} from '@mui/material';
import {
  ConnectedServiceDescription,
  ServiceStatus,
} from '@worksheets/schemas-services';
import { ApplicationBasics } from '@worksheets/schemas-applications';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { useProjectUrls } from '@worksheets/ui-projects';

const statusLabels: Record<ServiceStatus, string> = {
  connected: 'Connected',
  unstable: 'Unstable',
  uninstalled: 'Uninstalled',
  unknown: 'Unknown',
  disabled: 'Disabled',
};
const statusColors: Record<ServiceStatus, ChipProps['color']> = {
  connected: 'success',
  unstable: 'warning',
  uninstalled: 'default',
  unknown: 'default',
  disabled: 'secondary',
};

const statusTooltips: Record<ServiceStatus, string> = {
  connected: 'This service is connected and working as expected',
  unstable: 'This service is connected but unstable',
  uninstalled: 'This service is uninstalled, connect a provider to install it',
  unknown: 'This service is in an unknown state',
  disabled: 'This service is disabled',
};

export const ServiceCard: React.FC<ConnectedServiceDescription> = ({
  logo,
  title,
  subtitle,
  connection,
  providers,
  id,
}) => {
  const urls = useProjectUrls();
  return (
    <Box sx={{ width: 180 }}>
      <Card variant="outlined">
        <CardActionArea href={urls.app.project.service(id)}>
          <CardHeader
            sx={{ px: 2, pt: 2, pb: 0, m: 0 }}
            avatar={<TinyLogo src={logo} label={title} borderless area={30} />}
            action={
              <Tooltip
                title={statusTooltips[connection.status]}
                placement="top"
              >
                <Chip
                  label={statusLabels[connection.status]}
                  size="small"
                  color={statusColors[connection.status]}
                />
              </Tooltip>
            }
          />
          <CardContent sx={{ px: 2, m: 0 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
            >
              <Typography variant="body1" fontWeight={900}>
                {title}
              </Typography>
            </Box>
            <Typography
              color="text.secondary"
              variant="body2"
              fontSize={12}
              sx={{ height: 50, overflow: 'scroll' }}
            >
              {subtitle}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} height={30}>
              {providers.map((app) => (
                <ProviderIcon
                  key={app.id}
                  app={app}
                  selected={app.id === connection.appId}
                />
              ))}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

const ProviderIcon: React.FC<{ selected: boolean; app: ApplicationBasics }> = ({
  selected,
  app,
}) => {
  const theme = useTheme();
  const color = selected ? theme.palette.success.dark : theme.palette.grey[400];
  const label = selected ? 'Connected' : 'Not connected';
  const border = selected ? `1.5px solid ${color}` : `1px solid ${color}`;
  const backgroundColor = selected
    ? alpha(theme.palette.success.light, 0.1)
    : theme.palette.grey[200];

  return (
    <Box
      sx={{
        border,
        borderRadius: '5px',
        p: 0.25,
        backgroundColor,
      }}
    >
      <TinyLogo
        label={`${label} (${app.name})`}
        src={app.logo}
        key={app.id}
        borderless
      />
    </Box>
  );
};
