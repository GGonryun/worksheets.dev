import { TreeItem } from '@mui/lab';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { SettingSummary } from '@worksheets/apps/framework';
import { useState } from 'react';
import { request, useUser } from '@worksheets/auth/client';
import { GetSettingsResponse } from '../../../../api/settings/get';
import { PostSettingsResponse } from '../../../../api/settings/post';
import { warn } from '@worksheets/ui/common';

declare global {
  interface Window {
    oauthcallback: undefined | (() => void);
  }
}

export type MethodSettingsFormProps = {
  settings: SettingSummary[];
  path: string;
};

export function MethodSettingsForm({
  settings,
  path,
}: MethodSettingsFormProps) {
  const { user } = useUser();
  const settingsUrl = `/api/settings?methodPath=${path}`;
  const { data = {} } = request.query.usePrivate<GetSettingsResponse>(
    settingsUrl,
    user
  );
  const mutate = request.query.useMutate();
  const command = request.command.private(user);

  const handleSettingsUpdate = (propertyKey: string, value?: unknown) => {
    command<PostSettingsResponse>('/api/settings', 'POST', {
      path: path,
      key: propertyKey,
      value: value,
    })
      .then((r) => {
        const url = r.url;
        // if a url was returned when attempting to update settings, then the user is trying to setup oauth so we need to redirect.
        if (url) {
          // assign the completion callback.
          window.oauthcallback = () => {
            // clear the callback.
            window.oauthcallback = undefined;
            mutate(settingsUrl);
          };
          // open window.
          const win = window.open(url, '_blank');
          if (!win)
            return console.error('failed to open a new tab during oauth flow');
          win.focus();
        } else {
          mutate(settingsUrl);
        }
      })
      .catch(warn('failed to update settings'));
  };
  return (
    <>
      {settings.map((setting, index) => (
        <Box key={index} borderLeft="1px solid grey">
          <TreeItem
            nodeId={uuidv4()}
            label={
              <Box display="flex">
                <Box>{setting.label}</Box>
                {setting.required && <Box color="red">*</Box>}
              </Box>
            }
          >
            <MethodSettingInputField
              {...setting}
              value={data[setting.key]}
              onChange={(value) => {
                handleSettingsUpdate(setting.key, value);
              }}
            />
          </TreeItem>
        </Box>
      ))}
    </>
  );
}

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
      <OAuthInputField {...(props as MethodSettingInputFieldProps<unknown>)} />
    );

  return <Box>unknown method setting input field {props.type}</Box>;
}

type InputField<T> = {
  value: T;
  onChange: (newValue: T) => void;
};
type FlagInputFieldProps = InputField<boolean> & SettingSummary;

function FlagInputField({ value, onChange, required }: FlagInputFieldProps) {
  return (
    <Box display="flex" alignItems="center" pl={2} gap={2}>
      {required && <Divider>required</Divider>}
      <Checkbox
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
        size="small"
        disableRipple
      />
      <Typography fontSize={12}>{value ? 'on' : 'off'}</Typography>
    </Box>
  );
}
type TokenInputFieldProps = InputField<string> & SettingSummary;

function TokenInputField({
  value = '',
  onChange,
  required,
}: TokenInputFieldProps) {
  const [text, setText] = useState('');
  const isClearing = value && !text;
  const isSetting = !value;
  const isUpdating = value !== text;
  return (
    <Box display="flex" flexDirection="column" gap={1} p={1}>
      {required && <Divider>required</Divider>}
      <TextField
        size="small"
        placeholder={value}
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          event.stopPropagation();
          event.preventDefault();
        }}
      />
      <Button
        size="small"
        fullWidth
        disabled={!isUpdating}
        variant="outlined"
        color={isClearing ? 'error' : isSetting ? 'success' : 'warning'}
        onClick={() => onChange(text)}
      >
        {isClearing ? 'clear' : isSetting ? 'save' : 'update'}
      </Button>
    </Box>
  );
}

type OAuthInputFieldProps = InputField<unknown> & SettingSummary;

function OAuthInputField({ label, value, onChange }: OAuthInputFieldProps) {
  const connected = !!value;
  return (
    <Box>
      <Button
        onClick={() => onChange({ connected })}
        variant="contained"
        color={connected ? 'warning' : 'success'}
      >
        {connected ? 'Reconnect' : 'Connect'} {label}
      </Button>
    </Box>
  );
}
