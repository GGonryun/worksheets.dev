/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Favorite,
  FavoriteBorder,
  Star,
  StarBorder,
  SvgIconComponent,
} from '@mui/icons-material';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Rating,
  RatingProps,
  Select,
  SelectProps,
  Slider,
  SliderProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';
import { PaletteColor } from '@worksheets/ui/theme';
import { RatingFieldIcon } from '@worksheets/util/tasks';

const BaseHelperText: React.FC<{ required?: boolean } & BaseFieldProps> = ({
  required,
  err,
  description,
}) => {
  return (
    <FormHelperText
      required={required}
      error={!!err}
      sx={{
        visibility: err || description ? 'visible' : 'hidden',
      }}
    >
      {err || description || 'placeholder'}
    </FormHelperText>
  );
};

type BaseFieldProps = {
  description?: string;
  err?: string; // because error is a reserved prop.
};

export const BaseTextField: React.FC<
  Omit<TextFieldProps, 'size' | 'helperText' | 'FormHelperTextProps'> &
    BaseFieldProps
> = ({ description, err, ...props }) => {
  return (
    <TextField
      error={!!err}
      size="small"
      helperText={err ? err : description ? description : 'placeholder'}
      FormHelperTextProps={{
        required: props.required,
        error: !!err,
        sx: {
          visibility: err || description ? 'visible' : 'hidden',
        },
      }}
      {...props}
      value={props.value ?? ''}
    />
  );
};

export const BaseSelectField: React.FC<
  SelectProps & BaseFieldProps & { options: string[]; label: string }
> = ({ options, label, err, description, ...props }) => {
  const labelId = `${props.id}-label`;
  return (
    <FormControl error={!!err} fullWidth size="small">
      <InputLabel id={labelId} required={props.required}>
        {label}
      </InputLabel>
      <Select
        {...props}
        id={props.id}
        labelId={labelId}
        label={label}
        value={props.value ?? ''}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <BaseHelperText
        required={props.required}
        err={err}
        description={description}
      />
    </FormControl>
  );
};

export const BaseChoiceField: React.FC<
  {
    label: string;
    required?: boolean;
    options: string[];
  } & BaseFieldProps &
    RadioGroupProps
> = ({ required, label, options, description, err, ...props }) => {
  const formLabelId = `${props.id}-label`;
  return (
    <FormControl error={!!err} size="small">
      <FormLabel id={formLabelId} required={required} component="legend">
        {label}
      </FormLabel>
      <RadioGroup
        aria-labelledby={formLabelId}
        name={props.id}
        {...props}
        value={props.value ?? ''}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio sx={{ py: 0.5 }} size="small" />}
            label={option}
          />
        ))}
      </RadioGroup>
      <BaseHelperText required={required} err={err} description={description} />
    </FormControl>
  );
};

export const BaseMultipleChoiceField: React.FC<
  {
    id: string;
    label: string;
    required?: boolean;
    options: string[];
    value: string[];
    onChange: (value: string[]) => void;
  } & BaseFieldProps
> = ({ id, err, label, required, options, value, onChange }) => {
  const formLabelId = `${id}-label`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;
    // if the value is already in the array, remove it.
    if (value.includes(target)) {
      onChange(value.filter((v) => v !== target));
    } else {
      onChange([...value, target]);
    }
  };
  return (
    <FormControl error={!!err} size="small">
      <FormLabel id={formLabelId} required={required} component="legend">
        {label}
      </FormLabel>
      <FormGroup id={id} aria-labelledby={formLabelId}>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                size="small"
                sx={{ py: 0.75 }}
                checked={value.includes(option)}
                onChange={handleChange}
                value={option}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
      <BaseHelperText required={required} err={err} />
    </FormControl>
  );
};

export const BaseSliderField: React.FC<
  SliderProps &
    BaseFieldProps & {
      required?: boolean;
      label: string;
    }
> = ({ description, err, required, label, ...props }) => {
  const formLabelId = `${props.id}-label`;
  return (
    <Column>
      <FormLabel
        error={!!err}
        required={required}
        id={formLabelId}
        component="legend"
      >
        {label}
      </FormLabel>
      <Box sx={{ mx: 1 }}>
        <Slider
          min={0}
          max={100}
          step={10}
          marks
          name={props.id}
          aria-labelledby={formLabelId}
          {...props}
          value={props.value ?? 0}
        />
      </Box>
      <BaseHelperText required={required} err={err} description={description} />
    </Column>
  );
};

const FILLED_ICON_MAP: Record<RatingFieldIcon, SvgIconComponent> = {
  STAR: Star,
  HEART: Favorite,
};

const EMPTY_ICON_MAP: Record<RatingFieldIcon, SvgIconComponent> = {
  STAR: StarBorder,
  HEART: FavoriteBorder,
};

const ICON_COLOR_MAP: Record<RatingFieldIcon, PaletteColor | 'inherit'> = {
  STAR: 'inherit',
  HEART: 'secondary',
};

export const BaseRatingField: React.FC<
  {
    label: string;
    required?: boolean;
    icon: RatingFieldIcon;
  } & BaseFieldProps &
    Omit<RatingProps, 'icon'>
> = ({ icon, required, label, err, description, ...props }) => {
  const formLabelId = `${props.id}-label`;
  const FilledIcon = FILLED_ICON_MAP[icon];
  const EmptyIcon = EMPTY_ICON_MAP[icon];
  const iconColor = ICON_COLOR_MAP[icon];
  return (
    <Column>
      <FormLabel
        error={!!err}
        required={required}
        id={formLabelId}
        component="legend"
      >
        {label}
      </FormLabel>
      <Rating
        name={props.id}
        aria-labelledby={formLabelId}
        {...props}
        value={props.value ?? 0}
        icon={<FilledIcon color={iconColor} fontSize="inherit" />}
        emptyIcon={<EmptyIcon fontSize="inherit" />}
      />
      <BaseHelperText required={required} err={err} description={description} />
    </Column>
  );
};
