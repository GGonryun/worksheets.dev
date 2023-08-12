import {
  FlashOffOutlined,
  FlashOnOutlined,
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
  IconButton,
  Typography,
  Link,
  CardContent,
  CardActions,
  ButtonProps,
  Tooltip,
  Button,
  Chip,
} from '@mui/material';
import { ConnectionStatuses } from '@worksheets/schemas-connections';
import {
  statusLabel,
  statusColor,
  statusIcon,
  isActive,
} from '../connections-list/state-maps';
import { TinyLogo } from '../shared/tiny-logo';
import {
  GetServiceDetailsResponse,
  ServiceProvider,
} from '@worksheets/schemas-services';
import Grid from '@mui/material/Unstable_Grid2';
import { trpc } from '@worksheets/trpc/ide';

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
  return (
    <Grid container spacing={2} width="100%">
      {providers.map((provider) => (
        <Grid xs={10} sm={5} md={4} lg={3} xl={2} key={provider.id}>
          <IntegrationProviderCard
            selected={configuration?.providerId === provider.id}
            provider={provider}
            onInstall={() => handleSelection(provider.id)}
            onUninstall={() => handleUninstall(provider.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const IntegrationProviderCard: React.FC<{
  selected?: boolean;
  provider: ServiceProvider;
  onInstall: () => void;
  onUninstall: () => void;
}> = ({ provider, selected, onInstall, onUninstall }) => (
  <Card
    elevation={4}
    square
    sx={(theme) =>
      selected
        ? {
            border: `3px solid ${theme.palette.info.light}`,
          }
        : {}
    }
  >
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
      action={
        selected ? (
          <IconButton size="small" onClick={() => onUninstall()}>
            <FlashOffOutlined color="inherit" fontSize="small" />
          </IconButton>
        ) : null
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
        gap={2}
      >
        <IntegrationCardContent selected={selected} status={provider.status} />
      </Box>
    </CardContent>
    <CardActions>
      <IntegrationCardButton
        onInstall={() => onInstall()}
        selected={selected}
        status={provider.status}
      />
    </CardActions>
  </Card>
);

const integrationCardColors: Record<ConnectionStatuses, ButtonProps['color']> =
  {
    active: 'info',
    error: 'info',
    warning: 'info',
    disabled: 'info',
    uninstalled: 'inherit',
    unknown: 'inherit',
  };

const integrationCardButtonTooltips: Record<ConnectionStatuses, string> = {
  active: 'Your connection is active.',
  error: 'Your connection needs attention',
  warning: 'Your connection needs attention',
  uninstalled: 'Connect this app to your account to enable it.',
  disabled: 'Enable your account to use this app.',
  unknown: 'Failed to fetch integration provider status',
};

const IntegrationCardButton: React.FC<{
  selected?: boolean;
  status: ConnectionStatuses;
  onInstall: () => void;
}> = ({ status, selected, onInstall }) => (
  <>
    {selected && (
      <Tooltip title={integrationCardButtonTooltips[status]}>
        <span style={{ width: '100%' }}>
          <Button
            variant="contained"
            fullWidth
            size="small"
            color={integrationCardColors[status]}
            sx={{
              cursor: 'default',
            }}
            disabled={!isActive[status]}
            disableRipple
            disableFocusRipple
            disableElevation
            disableTouchRipple
            startIcon={<FlashOnOutlined />}
          >
            Connected
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
    {!selected && status === 'uninstalled' && (
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
}> = ({ status, selected }) => (
  <>
    {selected && (
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body2">Status:</Typography>
        <Chip
          label={statusLabel[status]}
          color={statusColor[status]}
          size="small"
          icon={statusIcon[status]}
        />
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
    {status === 'uninstalled' && (
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
