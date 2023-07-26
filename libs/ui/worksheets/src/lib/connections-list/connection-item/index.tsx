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
} from '@mui/material';
import { TinyLogo } from '../../shared/tiny-logo';
import { ConnectionItemButton } from './button';
import {
  ConnectionDetails,
  ConnectionStatuses,
} from '@worksheets/schemas-connections';

const tooltipText: Record<ConnectionStatuses, string> = {
  active: 'Disable your connection',
  disabled: 'Enable your connection',
  error: 'Your connection is not working properly.',
  warning: 'Your connection is not working properly.',
  uninstalled: 'Connect your account',
  unknown: '',
};

export const ConnectionItem: React.FC<ConnectionDetails> = ({
  name,
  logo,
  description,
  status,
}) => {
  const tooltip = tooltipText[status ?? 'unknown'];

  return (
    <Card elevation={4} square>
      <CardHeader
        sx={{ pt: 3, px: 3, pb: 0 }}
        avatar={
          <Box display="flex" gap={1} alignItems="center">
            <TinyLogo label={name} src={logo} area={28} />
          </Box>
        }
        action={
          <Tooltip title={tooltip} placement="top">
            <span>
              <Switch
                inputProps={{ 'aria-label': 'Switch demo' }}
                size="small"
                checked={status === 'active'}
                disabled={status !== 'active' && status !== 'disabled'}
              />
            </span>
          </Tooltip>
        }
      />
      <CardContent>
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
          <ConnectionItemButton status={status} />
        </Box>
      </CardActions>
    </Card>
  );
};
