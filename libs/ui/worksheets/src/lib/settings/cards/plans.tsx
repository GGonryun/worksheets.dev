import {
  Box,
  Button,
  ButtonProps,
  Chip,
  Divider,
  LinearProgress,
  Link,
  Paper,
  Switch,
  Tooltip,
  TooltipProps,
  Typography,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

export const SettingsCardPlans: React.FC<{ plan: 'free' | 'premium' }> = ({
  plan,
}) => (
  <Box width="100%">
    <Paper
      elevation={6}
      sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1 }}
    >
      <Typography variant="h6">Plan</Typography>
      <Box display="flex" flexWrap="wrap" alignItems="baseline" gap={0.5}>
        <Typography variant="body2">You are on the</Typography>
        {plan === 'premium' ? (
          <Chip color="success" label="premium" size="small" />
        ) : (
          <Chip color="primary" label="hobby" size="small" />
        )}
        <Typography variant="body2">
          plan. Free of charge.{' '}
          <Link href="/pricing" target="_blank">
            Learn more <OpenInNewIcon color="primary" fontSize={'small'} />.
          </Link>
        </Typography>
      </Box>
      <Divider />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">
          Current period (May 18 - Jun 17)
        </Typography>
        <Button
          size="small"
          variant="contained"
          href="/usage"
          target="_blank"
          endIcon={<OpenInNewIcon fontSize={'small'} />}
        >
          Usage
        </Button>
      </Box>
      <Divider />
      <Box display="flex" flexDirection="column" gap={1}>
        <Box py={1}>
          <Typography>Quotas</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" gap={1}>
          <QuotaPanel
            category="processing-time"
            label="Processing time"
            footer="0 / 1,000 min (0%)"
            percentage={0}
          />
          <QuotaPanel
            category="logging"
            label="Logs retained"
            footer="0 / 10,000 lgs (0%)"
            percentage={0}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" gap={1}>
          <QuotaPanel
            category="worksheets"
            label="Total worksheets"
            footer="0 / 10 wsh (0%)"
            percentage={0}
          />
          <QuotaPanel
            category="connections"
            label="Total connections"
            footer="0 / 50 con (0%)"
            percentage={0}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" gap={1}>
          <QuotaPanel
            category="access-tokens"
            label="Access tokens"
            footer="0 / 5 tkn (0%)"
            percentage={0}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" gap={1}>
        <Box py={1}>
          <Typography>Limits</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" gap={1}>
          <LimitPanel
            color="success"
            label="Max scheduled"
            tooltip="Your limit of scheduled executions. Executions will not enter the processing queue."
            caption={'45 tasks in queue'}
          />
          <LimitPanel
            color="success"
            label="Max concurrency"
            tooltip="Your limit of concurrently running executions. Executions will remain in the processing queue until a slot is available."
            caption={'10 concurrent tasks'}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" gap={1}>
          <LimitPanel
            color="success"
            label="Hourly rate limit"
            tooltip="Your hourly limit of scheduled executions."
            caption={'100 tasks per hour'}
          />
          <LimitPanel
            color="success"
            label="Burst rate limit"
            tooltip="Your burst limit (5 min) of scheduled executions."
            caption={'25 tasks per burst'}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" gap={1}>
          <LimitPanel
            color="inherit"
            label="Time dilation"
            tooltip="The impact of a minute on processing time. A value of 0.5 would reduce processing costs by half. A value of 2.0 would double processing costs."
            caption={'(1.0) time'}
          />
          <LimitPanel
            color="inherit"
            label="System efficiency"
            tooltip="The current cost of processing for a minute, as the system improves your average cost of operations will decrease."
            caption={'(0.01) speed'}
          />
        </Box>
        <Box display="flex" justifyContent="flex-start">
          <LimitPanel
            color="success"
            label="System processing"
            tooltip="The current processing capabilities of the entire worksheets task system."
            caption={'100 x tasks per minute'}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" gap={1}>
        <Box py={1} display="flex" gap={1} alignItems="center">
          <Typography>Overclock</Typography>
          <Tooltip title="Temporarily increase your limits at the cost of increasing your processing multiplier">
            <InfoIcon fontSize="small" color="primary" />
          </Tooltip>
        </Box>
        <Box display="flex" gap={1} alignItems="center">
          <Switch
            onChange={() =>
              alert("TODO: add support for 'overclocking' a personal account.")
            }
          />
          <Typography variant="caption">
            <b>Warning:</b> Overclocking will increasing your spending
            significantly.{' '}
            <Link href="/docs/overclocking" target="_blank">
              Learn more <OpenInNewIcon color="primary" fontSize={'small'} />.
            </Link>
          </Typography>
        </Box>
      </Box>
    </Paper>
  </Box>
);

export const LimitPanel: React.FC<{
  label: string;
  caption: string;
  tooltip?: TooltipProps['title'];
  color?: ButtonProps['color'];
}> = ({ label, tooltip, caption, color }) => {
  return (
    <Tooltip
      disableHoverListener={tooltip == null}
      title={tooltip}
      placement="top"
    >
      <Paper sx={{ p: 2, width: '100%' }} variant="outlined">
        <Box display="flex" flexDirection="column" gap={1}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" fontWeight={900}>
              {label}
            </Typography>
            {color === 'success' ? (
              <CheckCircleIcon color={color} fontSize="small" />
            ) : color === 'warning' || color === 'error' ? (
              <PauseCircleIcon color={color} fontSize="small" />
            ) : (
              <RemoveCircleIcon color={color} fontSize="small" />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {caption}
          </Typography>
        </Box>
      </Paper>
    </Tooltip>
  );
};

export const QuotaPanel: React.FC<{
  category: string;
  label: string;
  footer: string;
  percentage: number; // integer percent %{0-100}
}> = ({ category, label, footer, percentage }) => {
  return (
    <Paper sx={{ p: 2, width: '49.5%' }} variant="outlined">
      <Box display="flex" flexDirection="column" gap={1}>
        <Link
          sx={{ cursor: 'pointer' }}
          href={`/usage?category=${category}`}
          target="_blank"
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" fontWeight={900}>
              {label}
            </Typography>
            <NavigateNextOutlinedIcon fontSize="small" />
          </Box>
        </Link>
        <LinearProgress variant="determinate" value={percentage} />
        <Tooltip
          title={'Total resources consumed in current period'}
          placement="bottom-start"
        >
          <Typography variant="body2">{footer}</Typography>
        </Tooltip>
      </Box>
    </Paper>
  );
};
