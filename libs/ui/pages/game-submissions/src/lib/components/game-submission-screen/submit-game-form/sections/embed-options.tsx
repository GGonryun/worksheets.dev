import CloseIcon from '@mui/icons-material/Close';
import { TextField, TextFieldProps } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { checkboxGroup } from '@worksheets/util/arrays';
import { GameSubmissionFormKeys } from '@worksheets/util/types';
import React, { FC } from 'react';

import { useGameSubmissionFormContext } from '../../../form-context';
import { DetailedListItemText } from '../detailed-list-item-text';

export const EmbedOptions: FC = () => {
  const { values } = useGameSubmissionFormContext();
  const hasProjectType = values.projectType != null;

  return (
    <Box
      display={hasProjectType ? 'flex' : 'none'}
      flexDirection="column"
      gap={2}
    >
      <Typography variant="h5" mb={-1}>
        Embed Options
      </Typography>

      <ViewportDimensionsSelect />

      <ManuallySetSizeOptions />

      <SupportedDevicesOptions />

      <SupportedOrientationsOptions />
    </Box>
  );
};

const ManuallySetSizeOptions: FC = () => {
  const { values, errors, setFieldValue } = useGameSubmissionFormContext();
  const widthId = 'viewportWidth';
  const heightId = 'viewportHeight';

  const shouldShow = values['viewport'] === 'FIXED';
  const heightValue = values[heightId];
  const heightError = errors[heightId];
  const widthValue = values[widthId];
  const widthError = errors[widthId];

  return (
    <Box display={shouldShow ? 'block' : 'none'}>
      <Box display="flex" alignItems="center" gap={1}>
        <DimensionInputField
          dimension="width"
          error={Boolean(widthError)}
          value={widthValue ?? 0}
          onChange={(e) => setFieldValue(widthId, Number(e.target.value))}
        />
        <CloseIcon sx={{ fontSize: '14px' }} color="action" />
        <DimensionInputField
          dimension="height"
          error={Boolean(heightError)}
          value={heightValue ?? 0}
          onChange={(e) => setFieldValue(heightId, Number(e.target.value))}
        />
      </Box>
      <FormHelperText error={Boolean(heightError || widthError)}>
        {heightError}
        {widthError ? ' ' : ''}
        {widthError}
      </FormHelperText>
    </Box>
  );
};

const DimensionInputField: FC<
  {
    dimension: 'width' | 'height';
    unit?: 'px';
  } & Omit<TextFieldProps, 'size' | 'inputMode' | 'type' | 'sx'>
> = ({ dimension, unit = 'px', ...props }) => {
  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <Typography
        variant="caption"
        color={props.error ? 'error.main' : 'text.secondary'}
        textTransform="capitalize"
        fontWeight={900}
      >
        {dimension}
      </Typography>
      <TextField
        {...props}
        size="small"
        inputMode="numeric"
        type="number"
        sx={{
          width: 90,
        }}
      />
      <Typography variant="caption" color="text.secondary" fontWeight={900}>
        {unit}
      </Typography>
    </Box>
  );
};

const ViewportDimensionsSelect: FC = () => {
  const { errors, values, setFieldValue } = useGameSubmissionFormContext();

  const id = 'viewport';
  const label = 'Viewport Dimensions';

  const error = errors[id];
  const value = values[id];

  return (
    <FormControl fullWidth>
      <FormHelperText sx={{ p: 0, m: 0, mb: '2px' }}>
        <Box
          component="span"
          fontWeight={900}
          color={error ? 'error.main' : 'text.secondary'}
        >
          {label}
        </Box>{' '}
        &#8212; Your game should be playable on all view ports by default. If
        your game requires a static viewport size, select the appropriate
        option.
      </FormHelperText>

      <Select
        id={id}
        size="small"
        defaultValue={'RESPONSIVE'}
        value={value}
        error={Boolean(error)}
        onChange={(e) => {
          const value = e.target.value as (typeof values)['viewport'];

          setFieldValue(id, value);
        }}
      >
        <MenuItem dense value={'RESPONSIVE'}>
          <DetailedListItemText
            primary="Responsive"
            secondary=" &#8212; Your game is responsive and will adapt to any viewport size."
          />
        </MenuItem>
        <MenuItem dense value={'FIXED'}>
          <DetailedListItemText
            primary="Manually Set"
            secondary=" &#8212; Set a static viewport size for your game."
          />
        </MenuItem>
      </Select>
      <FormHelperText error={Boolean(error)}>{error}</FormHelperText>
    </FormControl>
  );
};

const SupportedDevicesOptions = () => {
  const { errors, values, setFieldValue } = useGameSubmissionFormContext();
  const id = 'devices';

  const error = errors[id];
  const value = values[id];

  const label = 'Supported Devices';
  const description =
    'Your game will be playable on all devices by default. If your game is not compatible with certain devices, you can uncheck them here.';

  const hasError = Boolean(error);

  const options = [
    { label: 'Computer & Laptop', value: 'COMPUTER' as const },
    { label: 'Mobile & Tablet', value: 'MOBILE' as const },
  ];

  return (
    <EmbedOption id={id} visible>
      <EmbedOptionHeader
        label={label}
        description={description}
        error={hasError}
      />

      <EmbedOptionErrorText error={error} />

      <EmbedOptionCheckboxGroup>
        {options.map((option) => (
          <EmbedOptionCheckbox
            key={option.label}
            label={option.label}
            value={option.value}
            checked={value.includes(option.value)}
            onChange={(checked) => {
              setFieldValue(id, checkboxGroup(value, option.value, checked));
            }}
          />
        ))}
      </EmbedOptionCheckboxGroup>
    </EmbedOption>
  );
};

const SupportedOrientationsOptions = () => {
  const { errors, values, setFieldValue } = useGameSubmissionFormContext();
  const id = 'orientations';

  const error = errors[id];
  const value = values[id];

  const visible =
    values.viewport === 'RESPONSIVE' && values.devices.includes('MOBILE');

  const label = 'Supported Orientations';
  const description =
    'Select all orientations that your game supports. This only applies to mobile and tablet devices.';

  const hasError = Boolean(error);

  const options = [
    { label: 'Portrait', value: 'PORTRAIT' as const },
    { label: 'Landscape', value: 'LANDSCAPE' as const },
  ];

  return (
    <EmbedOption id={id} visible={visible}>
      <EmbedOptionHeader
        label={label}
        description={description}
        error={hasError}
      />

      <EmbedOptionErrorText error={error} />

      <EmbedOptionCheckboxGroup>
        {options.map((option) => (
          <EmbedOptionCheckbox
            key={option.label}
            label={option.label}
            value={option.value}
            checked={value.includes(option.value)}
            onChange={(checked) => {
              setFieldValue(id, checkboxGroup(value, option.value, checked));
            }}
          />
        ))}
      </EmbedOptionCheckboxGroup>
    </EmbedOption>
  );
};

const EmbedOption: FC<{
  id: Extract<GameSubmissionFormKeys, 'devices' | 'orientations'>;
  visible: boolean;
  children: React.ReactNode;
}> = ({ id, visible, children }) => (
  <FormControl
    component="fieldset"
    id={id}
    sx={{
      display: visible ? 'block' : 'none',
    }}
  >
    {children}
  </FormControl>
);

const EmbedOptionHeader: React.FC<{
  label: string;
  description: string;
  error: boolean;
}> = ({ label, description, error }) => (
  <FormHelperText sx={{ p: 0, m: 0 }}>
    <Box
      color={error ? 'error.main' : 'text.secondary'}
      component="span"
      fontWeight={900}
    >
      {label}
    </Box>{' '}
    &#8212; {description}
  </FormHelperText>
);

const EmbedOptionErrorText: React.FC<{ error: string }> = ({ error }) => (
  <FormHelperText
    sx={{ p: 0, m: 0, display: error ? 'block' : 'none' }}
    error={Boolean(error)}
  >
    {error}
  </FormHelperText>
);

const EmbedOptionCheckboxGroup: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <FormGroup sx={{ pl: 2 }}>{children}</FormGroup>;

const EmbedOptionCheckbox: React.FC<{
  label: string;
  value: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, value, checked, onChange }) => (
  <FormControlLabel
    key={label}
    value={value}
    control={
      <Checkbox
        size="small"
        sx={{ padding: '4px' }}
        checked={checked}
        onChange={(e) => {
          const checked = e.target.checked;

          onChange(checked);
        }}
      />
    }
    label={label}
    slotProps={{
      typography: { variant: 'body2' },
    }}
  />
);
