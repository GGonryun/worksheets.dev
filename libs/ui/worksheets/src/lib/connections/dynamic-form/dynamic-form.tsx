import { Box, Button, Divider, Tooltip, Typography } from '@mui/material';
import { SettingSummary } from '@worksheets/apps/framework';
import { FormFieldsResponse } from '../../shared/types';
import { SharedTextField } from '../../shared/shared-text-field';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LinkIcon from '@mui/icons-material/LinkOutlined';
import LinkOffIcon from '@mui/icons-material/LinkOffOutlined';
import { Fragment } from 'react';
import { TinyToggle } from '../../shared/tiny-toggle';
declare global {
  interface Window {
    oauthcallback: undefined | (() => void);
  }
}

export const DynamicSettingsForm: React.FC<{
  fields?: FormFieldsResponse;
  settings: Record<string, unknown>;
  disabled?: boolean;
  // input is key/value pair of the updated property.
  onFieldUpdate: (field: FormFieldsResponse[number], newValue: unknown) => void;
}> = ({ fields, settings, onFieldUpdate, disabled }) => {
  return (
    <Box>
      {fields?.map((field, index) => {
        return (
          <Fragment key={index}>
            {field.type !== 'token' && index === 0 && <Divider />}

            <MethodSettingInputField
              disabled={disabled}
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
  disabled?: boolean;
  value: T;
  onChange: (newValue: T) => void;
};

type FlagInputFieldProps = InputField<boolean> & SettingSummary;

function FlagInputField({
  disabled,
  label,
  value,
  onChange,
}: FlagInputFieldProps) {
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
        <TinyToggle disabled={disabled} value={value} onChange={onChange} />
      </Box>
    </Box>
  );
}

type TokenInputFieldProps = InputField<string> & SettingSummary;

function TokenInputField({
  label,
  disabled,
  value = '',
  onChange,
  required,
}: TokenInputFieldProps) {
  return (
    <Box py={1}>
      <SharedTextField
        disabled={disabled}
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

function OAuthInputField({
  disabled,
  required,
  value,
  onChange,
}: OAuthInputFieldProps) {
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
              disabled={disabled}
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
