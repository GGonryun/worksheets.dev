import TextField from '@mui/material/TextField';

import { useBasicInformationFormContext } from '../context/hook';

export const BioField = () => {
  const { values, errors, setFieldValue } = useBasicInformationFormContext();
  const id = 'bio';

  const value = values[id];
  const error = errors[id];

  return (
    <TextField
      id={id}
      variant="standard"
      InputLabelProps={{ shrink: true }}
      placeholder="Tell us about yourself."
      label="Bio"
      multiline
      minRows={1}
      maxRows={4}
      helperText={error || 'A short bio about yourself.'}
      value={value ?? ''}
      onChange={(e) => setFieldValue(id, e.target.value)}
      error={Boolean(error)}
    />
  );
};
