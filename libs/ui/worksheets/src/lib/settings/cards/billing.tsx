import {
  Box,
  Button,
  ButtonProps,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  LinearProgress,
  LinearProgressProps,
  Link,
  Palette,
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
import { useUser } from '@worksheets/util/auth/client';
import { trpc } from '@worksheets/trpc/ide';
import { HelpOutlineOutlined, RefreshOutlined } from '@mui/icons-material';
import { calculatePercentage } from '@worksheets/util/numbers';
import { SettingsCardPayments } from './payments';
import { prettyPrintMilliseconds } from '@worksheets/util/time';
import { OpenInNewTabLink } from '@worksheets/ui/common';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
export const SettingsCardBilling: React.FC<{ plan: 'free' | 'premium' }> = ({
  plan,
}) => {
  const { user } = useUser();
  const utils = trpc.useContext();
  const { data: overview, isLoading } = trpc.user.overview.useQuery(undefined, {
    enabled: !!user,
  });

  const isUserEnabled = overview?.quotas.enabled;

  if (isLoading) {
    return (
      <Box width="100%">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box width="100%">
      <Paper
        elevation={6}
        sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1 }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" flexDirection="column" gap={0.5}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              py={1}
              pb={2}
            >
              <Typography variant="h4">Billing</Typography>
              <IconButton
                onClick={() => utils.user.overview.invalidate()}
                color="primary"
              >
                <RefreshOutlined />
              </IconButton>
            </Box>
            {isUserEnabled ? (
              <EnabledUserHeader plan={overview?.meta.plan} />
            ) : (
              <DisabledUserHeader />
            )}
            <Divider />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">
                Current period ({overview?.meta.cycle})
              </Typography>
              <Button
                size="small"
                variant="contained"
                href="/metrics"
                target="_blank"
                endIcon={<OpenInNewIcon fontSize={'small'} />}
              >
                Metrics
              </Button>
            </Box>
            <Divider />
          </Box>

          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h6">Processing Quotas</Typography>
            <Typography variant="body2">
              These quotas reset every cycle. Need more?{' '}
              <OpenInNewTabLink fontSize={14} href="/contact-us">
                Contact us
              </OpenInNewTabLink>{' '}
              to increase your personal limits.
            </Typography>
            <Box display="flex" justifyContent="space-between" gap={1}>
              <RatiosBlock
                href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL(
                  '/docs/overview#processing-time'
                )}`}
                label="Processing time"
                tooltip="The maximum amount of processing allowed. This is the sum of all processing time across all worksheet executions and method calls."
                current={overview?.quotas.processingTime.current}
                maximum={overview?.quotas.processingTime.resetTo}
                time
                unit="remaining"
                colorOnEmpty="error"
              />
              <RatiosBlock
                href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL(
                  '/docs/overview#method-calls'
                )}`}
                label="Method calls"
                tooltip="Your maximum amount of requests to external applications. This includes any individual method calls, as well as any worksheet executions that make external requests."
                current={overview?.quotas.methodCalls.current}
                maximum={overview?.quotas.methodCalls.resetTo}
                unit="calls remaining"
                colorOnEmpty="error"
              />
            </Box>
            <Box display="flex" justifyContent="space-between" gap={1}>
              <RatiosBlock
                href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL(
                  '/docs/overview#executions'
                )}`}
                label="Total executions"
                tooltip="The maximum amount of created executions. You cannot create new executions if you exceed this limit."
                current={overview?.quotas.executions.current}
                maximum={overview?.quotas.executions.resetTo}
                unit="executions remaining"
                colorOnEmpty="error"
              />
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h6">Execution Power</Typography>
            <Typography variant="body2">
              Limits on your processing and execution.{' '}
              <OpenInNewTabLink fontSize={14} href="/contact-us">
                Contact us
              </OpenInNewTabLink>{' '}
              to increase your personal processing power.
            </Typography>
            <Box display="flex" justifyContent="space-between" gap={1}>
              <RatiosBlock
                href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL(
                  '/docs/overview#executions'
                )}`}
                label="Queued executions"
                tooltip="You will not be able to execute new worksheets if you exceed this limit."
                current={overview?.counts.executions.queued}
                maximum={overview?.limits?.executions.queued}
                unit="queued executions"
                colorOnFull="error"
              />
              <RatiosBlock
                href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL(
                  '/docs/overview#executions'
                )}`}
                label="Concurrent processing"
                tooltip="You can queue up new worksheets if you exceed this limit, but we won't process them until a slot is available."
                current={overview?.counts.executions.running}
                maximum={overview?.limits?.executions.running}
                unit="active executions"
                colorOnFull="error"
              />
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h6">Operational Limits</Typography>
            <Typography variant="body2">
              Operational limits will prevent you from creating new resources if
              exceeded. You can still update existing resources.{' '}
              <OpenInNewTabLink
                fontSize={14}
                href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL('/contact-us')}`}
              >
                Contact us
              </OpenInNewTabLink>{' '}
              to increase your personal limits.
            </Typography>
            <Box display="flex" justifyContent="space-between" gap={1}>
              <RatiosBlock
                href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL(
                  '/docs/overview#worksheets'
                )}`}
                label="Total worksheets"
                tooltip="You will not be able to create new worksheets if you exceed this limit"
                current={overview?.counts.worksheets}
                maximum={overview?.limits.worksheets}
                unit="sheets"
                colorOnFull="error"
              />
              <RatiosBlock
                href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL(
                  '/docs/overview#connections'
                )}`}
                label="Total connections"
                tooltip="You will not be able to create new connections if you exceed this limit."
                current={overview?.counts.connections}
                maximum={overview?.limits.connections}
                unit="conns"
                colorOnFull="error"
              />
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h6">Secure API Tokens</Typography>
            <Typography variant="body2">
              API Tokens give automated systems or other users access to your
              resources. Protect these tokens like passwords.{' '}
              <OpenInNewTabLink fontSize={14} href="/contact-us">
                Contact us
              </OpenInNewTabLink>{' '}
              to increase your personal limits.
            </Typography>
            <Box display="flex" justifyContent="space-between" gap={1}>
              <RatiosBlock
                href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL(
                  '/docs/api/overview#api-tokens'
                )}`}
                label="Total API tokens"
                tooltip="You will not be able to create new tokens if you exceed this limit."
                current={overview?.counts.tokens}
                maximum={overview?.limits.tokens}
                unit="maximum tokens"
                colorOnFull="error"
              />
              <RatiosBlock
                href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL(
                  '/docs/api/overview#api-tokens'
                )}`}
                label="API token calls"
                tooltip="Limits the total amount of worksheets API calls your account can make. Worksheets.dev's API endpoints will ignore your requests if you exceed this limit."
                current={overview?.quotas.tokenUses.current}
                maximum={overview?.quotas.tokenUses.resetTo}
                unit="remaining calls"
                colorOnEmpty="error"
              />
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={1}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="h6">System Health</Typography>
              <Box display="flex" justifyContent="space-between" gap={1}>
                <QuotaBlock
                  color="success"
                  label="Operations"
                  tooltip="The system is currently healthy and accepting new requests."
                  caption={'healthy'}
                />
                <QuotaBlock
                  color="success"
                  label="Rate limit"
                  tooltip="The systems rate limit (1 min) for execution processing. If this rate limit is reached, new tasks will be queued until the rate limit is reset."
                  caption={
                    '25 worksheet executions every minute or 100 minutes of processing time every 1 minutes.'
                  }
                />
              </Box>

              <Box display="flex" justifyContent="space-between" gap={1}>
                <QuotaBlock
                  color="inherit"
                  label="Time dilation"
                  tooltip="The impact of a minute on processing time. A value of 0.5 would reduce processing costs by half. A value of 2.0 would double processing costs."
                  caption={'(1.0) time'}
                />
                <QuotaBlock
                  color="inherit"
                  label="System efficiency"
                  tooltip="The current cost of processing for a minute, as the system improves your average cost of operations will decrease."
                  caption={'(0.01) speed'}
                />
              </Box>
              <Box display="flex" justifyContent="flex-start">
                <QuotaBlock
                  color="success"
                  label="System processing"
                  tooltip="The current processing limitations of the entire worksheets task system."
                  caption={'100 x processing-minutes every minute'}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <OverclockButton overclocked={overview?.quotas.overclocked} />
      </Paper>
      <Box py={3} pb={6}>
        <SettingsCardPayments />
      </Box>
    </Box>
  );
};

export const QuotaBlock: React.FC<{
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

export const RatiosBlock: React.FC<{
  href: string;
  label: string;
  current: number | undefined;
  maximum: number | undefined;
  unit?: string;
  tooltip: string;
  time?: boolean;
  colorOnEmpty?: LinearProgressProps['color'];
  colorOnFull?: LinearProgressProps['color'];
  colorOnProgress?: LinearProgressProps['color'];
}> = ({
  href,
  tooltip,
  label,
  current,
  maximum,
  unit,
  time,
  colorOnFull,
  colorOnEmpty,
  colorOnProgress,
}) => {
  const percentage = calculatePercentage(current, maximum);
  const defaultColor = colorOnProgress ?? ('secondary' as const);

  const progressColor =
    percentage >= 100
      ? colorOnFull ?? defaultColor
      : percentage === 0
      ? colorOnEmpty ?? defaultColor
      : defaultColor;

  const borderColor = (palette: Palette) => {
    const color =
      percentage > 99
        ? colorOnFull
        : percentage === 0
        ? colorOnEmpty
        : colorOnProgress;

    if (percentage > 99 || percentage === 0) {
      switch (color) {
        case 'primary':
          return palette.primary.main;
        case 'secondary':
          return palette.secondary.main;
        case 'success':
          return palette.success.main;
        case 'warning':
          return palette.warning.main;
        case 'error':
          return palette.error.main;
        default:
          return palette.divider;
      }
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={(theme) => ({
        p: 2,
        width: '49.5%',
        borderColor: borderColor(theme.palette),
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      })}
    >
      <Box display="flex" flexDirection="column" gap={1}>
        <Link sx={{ cursor: 'pointer' }} href={href} target="_blank">
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" fontWeight={900}>
                {label}
              </Typography>
              <OpenInNewIcon fontSize="inherit" />
            </Box>
            <NavigateNextOutlinedIcon fontSize="small" />
          </Box>
        </Link>
        <LinearProgress
          variant="determinate"
          value={percentage}
          color={progressColor}
        />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body2">{`${
            time ? prettyPrintMilliseconds(current ?? 0) : current
          } / ${time ? prettyPrintMilliseconds(maximum ?? 0) : maximum} ${
            unit ?? ''
          }`}</Typography>
          <Tooltip title={tooltip} placement="top">
            <HelpOutlineOutlined fontSize="small" color="primary" />
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
};

const DisabledUserHeader: React.FC = () => (
  <Box display="flex" flexWrap="wrap" alignItems="baseline" gap={0.5}>
    <Typography variant="body2">You account is </Typography>
    <Chip color="error" label="disabled" size="small" />
    <Typography variant="body2">
      Reach out to{' '}
      <Link href="/contact-us" target="_blank">
        customer support
      </Link>{' '}
      or learn more{' '}
      <Link href="/pricing" target="_blank">
        about pricing and plans
      </Link>
      .
    </Typography>
  </Box>
);

const EnabledUserHeader: React.FC<{ plan?: string }> = ({ plan }) => (
  <Box display="flex" flexWrap="wrap" alignItems="baseline" gap={0.5}>
    <Typography variant="body2">You are on the</Typography>
    {plan === 'premium' ? (
      <Chip color="success" label="premium" size="small" />
    ) : (
      <Chip color="secondary" label="hobby" size="small" />
    )}
    <Typography variant="body2">
      plan. Free of charge.{' '}
      <OpenInNewTabLink href="/pricing">Learn more</OpenInNewTabLink>
    </Typography>
  </Box>
);

const OverclockButton: React.FC<{ overclocked?: boolean }> = ({
  overclocked,
}) => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Box py={1} display="flex" gap={1} alignItems="center">
        <Typography variant="h6">Overclock</Typography>
        <Tooltip title="Prioritizes your executions and allows system processing to temporarily exceed all operational limitations at a cost.">
          <InfoIcon fontSize="small" color="primary" />
        </Tooltip>
      </Box>
      <Box display="flex" gap={1} alignItems="center">
        <Switch
          checked={overclocked}
          onChange={() => {
            alert(
              'This feature is experimental. Overclocking will allow you to bypass all operational limitations but during this time you will significantly increase your spending. Contact customer support if you want to proceed.'
            );
          }}
        />
        <Typography variant="caption">
          <b>Warning:</b> Overclocking will increasing your spending
          significantly.{' '}
          <Link
            href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL(
              '/docs/api/overclocking'
            )}`}
            target="_blank"
          >
            Learn more <OpenInNewIcon color="primary" fontSize={'small'} />.
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
