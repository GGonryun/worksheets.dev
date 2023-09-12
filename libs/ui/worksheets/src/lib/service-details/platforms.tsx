import {
  FlashOffOutlined,
  PowerOutlined,
  NotInterested,
  PersonAddOutlined,
  RefreshOutlined,
  CheckCircle,
  ErrorOutline,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardHeader,
  Typography,
  Link,
  CardContent,
  CardActions,
  ButtonProps,
  Tooltip,
  Button,
  Chip,
  Switch,
  CardActionArea,
} from '@mui/material';
import { ConnectionStatuses } from '@worksheets/schemas-connections';
import {
  GetServiceDetailsResponse,
  ServiceProvider,
} from '@worksheets/schemas-services';
import { trpc } from '@worksheets/trpc/ide';
import { TinyLogo } from '@worksheets/ui-basic-style';
import {
  isConnected,
  statusColor,
  statusIcon,
  statusLabel,
} from '@worksheets/ui/connections';

export const PlatformSelectionTab: React.FC<GetServiceDetailsResponse> = ({
  service,
  providers,
  configuration,
}) => {
  const utils = trpc.useContext();
  const selectProvider = trpc.services.selectProvider.useMutation();

  const handleSelection = async (providerId: string) => {
    await selectProvider.mutateAsync({ serviceId: service.id, providerId });
    utils.services.details.invalidate({ serviceId: service.id });
  };

  const handleUninstall = async (providerId: string) => {
    await selectProvider.mutateAsync({
      serviceId: service.id,
      providerId: '',
    });
    utils.services.details.invalidate({ serviceId: service.id });
  };

  const handleSwitchClick = async () => {
    alert('TODO: handle toggle switch');
    utils.services.details.invalidate({ serviceId: service.id });
  };

  return (
    <Box width="100%" display="flex" gap={1}>
      {providers.map((provider) => (
        <Box width={200} key={provider.id}>
          <IntegrationProviderCard
            selected={false} // TODO
            enabled={configuration?.enabled}
            provider={provider}
            onToggle={() => handleSwitchClick()}
            onInstall={() => handleSelection(provider.id)}
            onUninstall={() => handleUninstall(provider.id)}
          />
        </Box>
      ))}
    </Box>
  );
};

const IntegrationProviderCard: React.FC<{
  selected?: boolean;
  provider: ServiceProvider;
  enabled?: boolean;
  onToggle: () => void;
  onInstall: () => void;
  onUninstall: () => void;
}> = ({ provider, selected, onInstall, onUninstall, onToggle, enabled }) => (
  <Card
    variant="outlined"
    sx={(theme) =>
      selected
        ? {
            border: `2px solid ${theme.palette.info.light}`,
          }
        : {}
    }
  >
    <CardActionArea disableRipple disableTouchRipple sx={{ cursor: 'default' }}>
      <CardHeader
        sx={{ pb: 1, mb: 0 }}
        avatar={
          <TinyLogo
            src={provider.logo}
            label={provider.name}
            borderless
            area={32}
          />
        }
        title={
          <>
            <Typography variant="body1" fontWeight={900}>
              {provider.name}
            </Typography>
            <Link href={`/connections/${provider.id}`}>
              <Typography variant="caption">View connection</Typography>
            </Link>
          </>
        }
      />
      <CardContent sx={{ height: '100px', pb: 0.25 }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          gap={1}
        >
          <IntegrationCardContent
            onToggle={onToggle}
            enabled={enabled}
            selected={selected}
            status={provider.status}
          />
        </Box>
      </CardContent>
      <CardActions>
        <IntegrationCardButton
          onUninstall={() => onUninstall()}
          onInstall={() => onInstall()}
          selected={selected}
          status={provider.status}
        />
      </CardActions>
    </CardActionArea>
  </Card>
);

const integrationCardColors: Record<ConnectionStatuses, ButtonProps['color']> =
  {
    active: 'error',
    error: 'error',
    warning: 'error',
    disabled: 'error',
    pending: 'inherit',
    unknown: 'inherit',
  };

const integrationCardButtonTooltips: Record<ConnectionStatuses, string> = {
  active: 'Remove your current connection.',
  error: 'Your connection needs attention',
  warning: 'Your connection needs attention',
  pending: 'Connect this app to your account to enable it.',
  disabled: 'Enable your account to use this app.',
  unknown: 'Failed to fetch integration provider status',
};

const IntegrationCardButton: React.FC<{
  selected?: boolean;
  status: ConnectionStatuses;
  onInstall: () => void;
  onUninstall: () => void;
}> = ({ status, selected, onInstall, onUninstall }) => (
  <>
    {selected && (
      <Tooltip title={integrationCardButtonTooltips[status]}>
        <span style={{ width: '100%' }}>
          <Button
            variant="outlined"
            fullWidth
            size="small"
            color={integrationCardColors[status]}
            disabled={!isConnected[status]}
            startIcon={<FlashOffOutlined />}
            onClick={() => onUninstall()}
          >
            Disconnect
          </Button>
        </span>
      </Tooltip>
    )}
    {!selected && status === 'active' && (
      <Button
        onClick={() => onInstall()}
        variant="outlined"
        fullWidth
        size="small"
        color="primary"
        startIcon={<PowerOutlined />}
      >
        Select Account
      </Button>
    )}
    {!selected &&
      (status === 'warning' || status === 'error' || status === 'disabled') && (
        <Tooltip
          title="This connection cannot be used. Visit the connection page to fix it."
          placement="top"
        >
          <span style={{ width: '100%' }}>
            <Button
              variant="outlined"
              fullWidth
              size="small"
              color="warning"
              disabled
              startIcon={<NotInterested />}
            >
              Select Account
            </Button>
          </span>
        </Tooltip>
      )}
    {!selected && status === 'pending' && (
      <Tooltip
        title="Connect this app to your account to enable it for selection."
        placement="top"
      >
        <span style={{ width: '100%' }}>
          <Button
            variant="outlined"
            fullWidth
            size="small"
            color="primary"
            startIcon={<PersonAddOutlined />}
            disabled
          >
            Select Account
          </Button>
        </span>
      </Tooltip>
    )}

    {!selected && status === 'unknown' && (
      <Button
        variant="outlined"
        fullWidth
        size="small"
        sx={(theme) => ({
          color: theme.palette.text.secondary,
          borderColor: theme.palette.text.secondary,
          '&:hover': {
            color: theme.palette.text.primary,
            borderColor: theme.palette.text.primary,
          },
        })}
        startIcon={<RefreshOutlined />}
      >
        Refresh Status
      </Button>
    )}
  </>
);

const IntegrationCardContent: React.FC<{
  selected?: boolean;
  status: ConnectionStatuses;
  onToggle: () => void;
  enabled?: boolean;
}> = ({ status, selected, onToggle, enabled }) => {
  return (
    <>
      {selected && (
        <Box display="flex" flexDirection="column" gap={1}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2">Status</Typography>
            <Chip
              label={enabled ? statusLabel[status] : 'Disabled'}
              color={enabled ? statusColor[status] : 'secondary'}
              size="small"
              icon={statusIcon[status]}
            />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2">Enabled?</Typography>
            <Tooltip
              title={enabled ? 'Disable this endpoint' : 'Enable this endpoint'}
            >
              <span>
                <Switch
                  onClick={() => onToggle()}
                  size="small"
                  checked={enabled}
                />
              </span>
            </Tooltip>
          </Box>
        </Box>
      )}
      {!selected && status === 'active' && (
        <Box display="flex" alignItems="center" gap={1}>
          <CheckCircle color="success" fontSize="small" />
          <Typography variant="body2">Connection available</Typography>
        </Box>
      )}

      {(status === 'error' || status === 'warning') && (
        <Box display="flex" alignItems="center" gap={1}>
          <ErrorOutline color="error" fontSize="small" />
          <Typography variant="body2">Connection unstable</Typography>
        </Box>
      )}
      {status === 'disabled' && (
        <Box display="flex" alignItems="center" gap={1}>
          <ErrorOutline color="error" fontSize="small" />
          <Typography variant="body2">Connection disabled</Typography>
        </Box>
      )}
      {status === 'pending' && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            No accounts connected
          </Typography>
        </Box>
      )}
      {status === 'unknown' && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            Failed to fetch integration provider status.
          </Typography>
        </Box>
      )}
    </>
  );
};
