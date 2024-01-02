import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { FormFields, FormFieldsKeys, useFormContext } from '../context';
import { DetailedListItemText } from '../detailed-list-item-text';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TextField, TextFieldProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const EmbedOptions: FC = () => {
  const { values } = useFormContext();
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
  const { values, errors } = useFormContext();

  const shouldShow = values['viewport'] === 'fixed';
  const value = values['dimensions'];
  const error = errors['dimensions'];

  return (
    <Box display={shouldShow ? 'block' : 'none'}>
      <Box display="flex" alignItems="center" gap={1}>
        <DimensionInputField
          dimension="width"
          error={Boolean(error)}
          value={value?.width ?? 0}
        />
        <CloseIcon sx={{ fontSize: '14px' }} color="action" />
        <DimensionInputField
          dimension="height"
          error={Boolean(error)}
          value={value?.height ?? 0}
        />
      </Box>
      <FormHelperText error={Boolean(error)}>{error}</FormHelperText>
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
  const { errors, values } = useFormContext();

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

      <Select id={id} size="small" defaultValue={'automatic'} value={value}>
        <MenuItem dense value={'responsive'}>
          <DetailedListItemText
            primary="Responsive"
            secondary=" &#8212; Your game is responsive and will adapt to any viewport size."
          />
        </MenuItem>
        <MenuItem dense value={'fixed'}>
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

const SupportedDevicesOptions = () => (
  <EmbedOption
    id="supportedDevices"
    label="Supported Devices"
    description="Your game will be playable on all devices by default. If your game is not compatible with certain devices, you can uncheck them here."
    options={[
      { label: 'Computer & Laptop', value: 'computer' },
      { label: 'Mobile & Tablet', value: 'mobile' },
    ]}
  />
);

const SupportedOrientationsOptions = () => (
  <EmbedOption
    visible={(fields) =>
      fields.viewport === 'responsive' && fields.supportedDevices['mobile']
    }
    id="supportedOrientations"
    label="Supported Orientations"
    description="Select all orientations that your game supports. This only applies to mobile and tablet devices."
    options={[
      { label: 'Portrait', value: 'portrait' },
      { label: 'Landscape', value: 'landscape' },
    ]}
  />
);

type EmbedOptionProps<
  T extends Extract<
    FormFieldsKeys,
    'supportedDevices' | 'supportedOrientations'
  >
> = {
  visible?: (fields: FormFields) => boolean;
  id: T;
  label: string;
  description: string;
  options: { label: string; value: keyof FormFields[T] }[];
};

function EmbedOption<
  T extends Extract<
    FormFieldsKeys,
    'supportedDevices' | 'supportedOrientations'
  >
>({
  label,
  description,
  options,
  id,
  visible = () => true,
}: EmbedOptionProps<T>) {
  const { errors, values, setFieldValue } = useFormContext();

  const error = errors[id];
  const value = values[id];

  return (
    <FormControl
      component="fieldset"
      id={id}
      sx={{
        display: visible(values) ? 'block' : 'none',
      }}
    >
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
      <FormHelperText
        sx={{ p: 0, m: 0, display: error ? 'block' : 'none' }}
        error={Boolean(error)}
      >
        {error}
      </FormHelperText>
      <FormGroup sx={{ pl: 2 }}>
        {options.map((option) => (
          <FormControlLabel
            value={option.value}
            control={
              <Checkbox
                size="small"
                sx={{ padding: '4px' }}
                checked={Boolean(value[option.value])}
                onChange={(e) => {
                  const newValues = {
                    ...value,
                    [option.value]: e.target.checked,
                  };
                  setFieldValue(id, newValues);
                }}
              />
            }
            label={option.label}
            slotProps={{
              typography: { variant: 'body2' },
            }}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
