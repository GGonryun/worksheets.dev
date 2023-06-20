import {
  Box,
  Button,
  ButtonProps,
  Chip,
  Divider,
  LinearProgress,
  Link,
  Palette,
  Paper,
  Switch,
  Tooltip,
  TooltipProps,
  Typography,
} from '@mui/material';
import { SharedTextField } from '../shared/shared-text-field';
import { ReactNode, useEffect, useState } from 'react';
import { PageLayout } from '../page-layout';
import { v4 as uuidv4 } from 'uuid';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const SETTINGS_CARD_WIDTH = '100%';
export function SettingsPage() {
  return (
    <PageLayout title={'Settings'}>
      <Box p={3}>
        <Typography variant="h5">General Settings</Typography>
      </Box>
      <Box px={3} display="flex" gap={3} flexWrap={'wrap'}>
        <SettingsCardTextField
          title={'Your identifier'}
          readonly
          caption={'This is how we identify you in our system.'}
          helperText="You can't change this value."
          value={uuidv4()}
        />
        <SettingsCardTextField
          title={'Your name'}
          caption={'Please enter a display name you are comfortable with.'}
          helperText="Display name is limited to 48 characters at most."
          value={'Miguel Campos'}
        />
        <SettingsCardTextField
          title={'Your email'}
          readonly
          caption={'The email address you use to log into your account.'}
          helperText="You can't change this value."
          value={'miguel@worksheets.dev'}
        />
        <SettingsCardTextField
          sensitive
          title={'Your password'}
          caption={
            "Enter a password for your account, we'll send you an email to verify."
          }
          helperText="Please use 60 characters at most, and at least 8 characters, numbers, and symbols."
          value={''}
        />
      </Box>
      <Box p={3}>
        <Typography variant="h5">Your plan</Typography>
      </Box>
      <Box px={3}>
        <SettingsCardPlans plan="free" />
      </Box>

      <Box p={3}>
        <SettingsCardPayments />
      </Box>
      <Box p={3}>
        <Typography variant="h5">Access tokens</Typography>
      </Box>
      <Box px={3}>
        <SettingsCardAccessTokens />
      </Box>
      <Box p={3}>
        <Typography variant="h5">Delete your account</Typography>
      </Box>
      <Box px={3} pb={5}>
        <SettingsCardGeneric
          color="error"
          title={'Delete all your data'}
          caption={
            'Permanently remove your account and all of its contents.  This action cannot be undone.'
          }
        >
          <Box display="flex" justifyContent="flex-end" pt={2}>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => alert("TODO: support 'delete account' feature")}
            >
              Delete account
            </Button>
          </Box>
        </SettingsCardGeneric>
      </Box>
    </PageLayout>
  );
}

export const SettingsCardAccessTokens: React.FC = () => (
  <SettingsCardGeneric
    title={'Tokens'}
    caption="These tokens provide other applications with access to your account. We will never ask for tokens to your account. Secure them as you would secure your password."
  >
    <Paper variant="outlined" sx={{ mt: 1, p: 1 }}>
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="body2" fontWeight={900}>
          Create new token
        </Typography>
        <Divider />
        <Typography variant="caption">
          Please provide a distinct name for your token.
        </Typography>
        <Divider />
        <Box> TODO: Create token builder</Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption">
            Learn more about{' '}
            <Link href="/pricing" target="_blank">
              access tokens <OpenInNewIcon color="primary" fontSize={'small'} />
              .
            </Link>
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => alert("TODO: support 'add new token' feature")}
            >
              Add new token
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  </SettingsCardGeneric>
);

export const SettingsCardPayments: React.FC = () => (
  <SettingsCardGeneric
    title={'Payment method'}
    caption={
      'You have not added any cards. Click the button below to add a new payment method.'
    }
  >
    <Box display="flex" justifyContent="flex-end" pt={2}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => alert("TODO: support 'add new card' feature")}
      >
        Add new card
      </Button>
    </Box>
  </SettingsCardGeneric>
);

export const SettingsCardPlans: React.FC<{ plan: 'free' | 'premium' }> = ({
  plan,
}) => (
  <Box width={SETTINGS_CARD_WIDTH}>
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
            footer="0 / 10 ws (0%)"
            percentage={0}
          />
          <QuotaPanel
            category="connections"
            label="Total connections"
            footer="0 / 50 cs (0%)"
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
            label="Processor dilation"
            tooltip="The impact of a minute on processing time. A 0.5 time dilation value would reduces processing costs by half."
            caption={'1.0 x minute'}
          />
          <LimitPanel
            color="success"
            label="System processing"
            tooltip="The current processing capabilities of the system. Reduced capabilities will result in impacts to processing time."
            caption={'1.0 x minute'}
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
    <Paper sx={{ p: 2, width: '100%' }} variant="outlined">
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

export const SettingsCardTextField: React.FC<{
  title: string;
  value?: string;
  helperText?: string;
  caption?: string;
  readonly?: boolean;
  sensitive?: boolean;
  onUpdate?: (value: string) => void;
}> = ({
  sensitive,
  title,
  caption,
  helperText,
  readonly,
  value: defaultValue,
  onUpdate,
}) => {
  const [value, setValue] = useState('');
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setValue(defaultValue ?? '');
  }, [defaultValue]);

  useEffect(() => {
    setDirty(value !== defaultValue);
  }, [value, defaultValue]);

  const updateValue = (newValue: string) => {
    setValue(newValue);
  };

  const handleCancel = () => {
    setValue(defaultValue ?? '');
  };

  const handleSave = () => {
    onUpdate && onUpdate(value);
  };

  return (
    <Box width={SETTINGS_CARD_WIDTH}>
      <Paper
        elevation={6}
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{caption}</Typography>
        <SharedTextField
          type={sensitive ? 'password' : 'text'}
          disabled={readonly}
          value={value}
          helperText={helperText}
          onChange={(value) => updateValue(value.target.value)}
        />
        <Box display="flex" justifyContent="flex-end" gap={2}>
          {!readonly && dirty && (
            <Button
              sx={{ fontWeight: 900 }}
              size="small"
              color="inherit"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
          {!readonly && (
            <Button
              onClick={handleSave}
              disabled={!dirty}
              variant="contained"
              size="small"
            >
              Save
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export const SettingsCardGeneric: React.FC<{
  title: string;
  caption?: string;
  children?: ReactNode;
  color?: ButtonProps['color'];
}> = ({ color, title, caption, children }) => {
  const pickBorder = (palette: Palette) => {
    const border = (c: string) => `1px solid ${c}`;
    switch (color) {
      case 'error':
        return border(palette.error.main);
      case 'primary':
        return border(palette.primary.main);
      case 'secondary':
        return border(palette.secondary.main);
      case 'info':
        return border(palette.info.main);
      case 'success':
        return border(palette.success.main);
      case 'warning':
        return border(palette.warning.main);
      case 'inherit':
        return border(palette.text.primary);
      default:
        return 'none';
    }
  };
  return (
    <Box width={SETTINGS_CARD_WIDTH}>
      <Paper
        elevation={6}
        sx={({ palette }) => ({
          border: pickBorder(palette),
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        })}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{caption}</Typography>
        {children}
      </Paper>
    </Box>
  );
};
