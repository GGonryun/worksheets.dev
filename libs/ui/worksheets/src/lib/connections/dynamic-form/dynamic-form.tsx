import { Box, Button, Divider, Tooltip, Typography } from '@mui/material';
import { SettingSummary } from '@worksheets/apps/framework';
import { FormFieldsResponse } from '../../shared/types';
import { SharedTextField } from '../../shared/shared-text-field';
import OnCircleIcon from '@mui/icons-material/Circle';
import OffCircleIcon from '@mui/icons-material/CircleOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LinkIcon from '@mui/icons-material/LinkOutlined';
import LinkOffIcon from '@mui/icons-material/LinkOffOutlined';
import { Fragment } from 'react';
declare global {
  interface Window {
    oauthcallback: undefined | (() => void);
  }
}

export const DynamicSettingsForm: React.FC<{
  fields?: FormFieldsResponse;
  settings: Record<string, unknown>;
  // input is key/value pair of the updated property.
  onFieldUpdate: (field: FormFieldsResponse[number], newValue: unknown) => void;
}> = ({ fields, settings, onFieldUpdate }) => {
  return (
    <Box>
      {fields?.map((field, index) => {
        return (
          <Fragment key={index}>
            {field.type !== 'token' && index === 0 && <Divider />}

            <MethodSettingInputField
              key={field.id}
              label={field.name}
              type={field.type}
              required={field.required}
              value={settings[field.id]}
              onChange={(newValue: unknown) => {
                onFieldUpdate(field, newValue);
              }}
            />
            {field.type !== 'token' && <Divider />}
          </Fragment>
        );
      })}
    </Box>
  );
};

/** OLD STUFF */
export type MethodSettingsFormProps = {
  settings: FormFieldsResponse;
  path: string;
};

type MethodSettingInputFieldProps<T> = SettingSummary & InputField<T>;

export function MethodSettingInputField(
  props: MethodSettingInputFieldProps<unknown>
) {
  if (props.type === 'flag')
    return (
      <FlagInputField {...(props as MethodSettingInputFieldProps<boolean>)} />
    );

  if (props.type === 'token')
    return (
      <TokenInputField {...(props as MethodSettingInputFieldProps<string>)} />
    );
  if (props.type === 'oauth')
    return (
      <OAuthInputField {...(props as MethodSettingInputFieldProps<boolean>)} />
    );

  return <Box>unknown method setting input field {props.type}</Box>;
}

type InputField<T> = {
  value: T;
  onChange: (newValue: T) => void;
};

type FlagInputFieldProps = InputField<boolean> & SettingSummary;

function FlagInputField({ label, value, onChange }: FlagInputFieldProps) {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        pl={2}
        gap={2}
        maxWidth="50%"
        justifyContent="space-between"
      >
        <Box>
          <Typography>{label}</Typography>
        </Box>
        <Button
          sx={{ p: 0, m: 0 }}
          variant="text"
          size="small"
          onClick={() => onChange(!value)}
          startIcon={
            value ? (
              <OnCircleIcon fontSize="small" color="primary" />
            ) : (
              <OffCircleIcon fontSize="small" color="primary" />
            )
          }
        >
          <Box width="32px">{value ? 'on' : 'off'}</Box>
        </Button>
      </Box>
    </Box>
  );
}

type TokenInputFieldProps = InputField<string> & SettingSummary;

function TokenInputField({
  label,
  value = '',
  onChange,
  required,
}: TokenInputFieldProps) {
  return (
    <Box py={1}>
      <SharedTextField
        label={label}
        required={required}
        placeholder={value}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </Box>
  );
}

type OAuthInputFieldProps = InputField<boolean> & SettingSummary;

function OAuthInputField({ required, value, onChange }: OAuthInputFieldProps) {
  const connected = !!value;

  return (
    <Box
      maxWidth="70%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <Typography variant="body2">Tokens</Typography>
        <Typography variant="body2" color="error">
          {required ? '*' : ''}
        </Typography>
      </Box>
      <Box>
        <Tooltip
          title="This action may impact worksheets in progress"
          disableHoverListener={!connected}
          placement="top"
        >
          <span>
            <Button
              sx={{ m: 0 }}
              size="small"
              onClick={() => onChange(connected)}
              variant="text"
              startIcon={
                connected ? (
                  <LinkOffIcon fontSize="small" color="inherit" />
                ) : (
                  <LinkIcon fontSize="small" color="inherit" />
                )
              }
              endIcon={<OpenInNewIcon fontSize="small" color="inherit" />}
              color={connected ? 'error' : 'primary'}
            >
              {connected ? 'Disconnect' : 'Connect'}
            </Button>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
}
