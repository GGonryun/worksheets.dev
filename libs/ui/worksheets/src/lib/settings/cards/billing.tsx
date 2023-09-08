import {
  Box,
  Button,
  ButtonProps,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  LinearProgressProps,
  Link,
  Palette,
  Paper,
  Tooltip,
  TooltipProps,
  Typography,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { trpc } from '@worksheets/trpc/ide';
import { HelpOutlineOutlined, RefreshOutlined } from '@mui/icons-material';
import { calculatePercentage } from '@worksheets/util/numbers';
import { SettingsCardPayments } from './payments';
import { prettyPrintMilliseconds } from '@worksheets/util/time';
import { OpenInNewTabLink } from '@worksheets/ui/common';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { UserOverview } from '@worksheets/schemas-user';
export const SettingsCardBilling: React.FC<{
  overview: UserOverview;
}> = ({ overview }) => {
  const utils = trpc.useContext();

  const isUserEnabled = overview?.quotas.enabled;

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
                href={SERVER_SETTINGS.WEBSITES.DOCS_URL('/pricing')}
                target="_blank"
                endIcon={<OpenInNewIcon fontSize={'small'} />}
              >
                Pricing
              </Button>
            </Box>
            <Divider />
          </Box>

          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h6">Execution Quotas</Typography>
            <Typography variant="body2">
              This quota reset every cycle. Need more?{' '}
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
                  '/docs/overview#method-calls'
                )}`}
                label="Daily Executions"
                tooltip="Your execution quota reset every month."
                current={overview?.quotas.executions.current}
                maximum={overview?.quotas.executions.resetTo}
                unit="executions remaining"
                colorOnEmpty="error"
              />
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h6">API Tokens</Typography>
            <Typography variant="body2">
              API Tokens give automated systems or other users access to your
              resources. Protect these tokens like passwords.{' '}
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
                  '/docs/api/overview#api-tokens'
                )}`}
                label="Total API tokens"
                tooltip="You will not be able to create new tokens if you exceed this limit."
                current={overview?.counts.tokens}
                maximum={overview?.limits.tokens}
                unit="maximum tokens"
                colorOnFull="error"
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
                  tooltip="The systems rate limit (1 min) for method processing. If this rate limit is reached, new methods will fail to execute."
                  caption={'100 method executions every minute'}
                />
              </Box>
            </Box>
          </Box>
        </Box>
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
      <Link
        href={`${SERVER_SETTINGS.WEBSITES.DOCS_URL('/contact-us')}`}
        target="_blank"
      >
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
