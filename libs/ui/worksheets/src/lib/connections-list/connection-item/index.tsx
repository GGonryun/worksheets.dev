import {
  Card,
  CardHeader,
  Box,
  Tooltip,
  Switch,
  CardContent,
  Typography,
  Divider,
  CardActions,
  Paper,
  SwitchProps,
} from '@mui/material';
import { TinyLogo } from '../../shared/tiny-logo';
import { ConnectionItemButton } from './button';
import {
  ConnectionDetails,
  ConnectionStatuses,
} from '@worksheets/schemas-connections';
import { useRouter } from 'next/router';
import { isActive, isConnected } from '../state-maps';
import { trpc } from '@worksheets/trpc/ide';
import { useState } from 'react';

const tooltipText: Record<ConnectionStatuses, string> = {
  active: 'Disable your connection',
  disabled: 'Enable your connection',
  error: 'Your connection is not working properly.',
  warning: 'Your connection is not working properly.',
  uninstalled: 'Connect your account',
  unknown: '',
};

const switchColors: Record<ConnectionStatuses, SwitchProps['color']> = {
  active: 'success',
  disabled: 'primary',
  error: 'error',
  warning: 'warning',
  uninstalled: 'primary',
  unknown: 'default',
};

export const ConnectionItem: React.FC<
  ConnectionDetails & { loading?: boolean }
> = ({ appId, name, logo, description, status, loading }) => {
  const [isLoadingToggleState, setIsLoadingToggleState] = useState(false);
  const { push } = useRouter();
  const tooltip = tooltipText[status ?? 'unknown'];

  const utils = trpc.useContext();
  const toggle = trpc.connections.toggleStatus.useMutation();

  const handleToggleConnection = async () => {
    setIsLoadingToggleState(true);
    await toggle.mutateAsync({ appId });
    await utils.connections.getDetails.invalidate({ appId });
    await utils.connections.getPage.invalidate();
    setIsLoadingToggleState(false);
  };

  return (
    <Card elevation={4} square>
      <Paper
        square
        elevation={2}
        sx={(theme) => ({ backgroundColor: theme.palette.grey[100] })}
      >
        <CardHeader
          sx={{ p: 1 }}
          avatar={
            <Paper square variant="outlined" sx={{ p: 0.25 }}>
              <TinyLogo borderless label={name} src={logo} area={28} />
            </Paper>
          }
          action={
            <Box pt={1} px={1}>
              <Tooltip title={tooltip} placement="top">
                <span>
                  <Switch
                    color={switchColors[status]}
                    onClick={handleToggleConnection}
                    inputProps={{ 'aria-label': 'Switch demo' }}
                    size="small"
                    checked={isActive[status]}
                    disabled={isLoadingToggleState || !isConnected[status]}
                  />
                </span>
              </Tooltip>
            </Box>
          }
        />
      </Paper>
      <Divider />
      <CardContent sx={{ pt: 1, mt: 0, height: 150, overflow: 'scroll' }}>
        <Box>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <ConnectionItemButton
            status={status}
            loading={loading}
            onClick={() => {
              push(`/connections/${appId}`);
            }}
          />
        </Box>
      </CardActions>
    </Card>
  );
};
