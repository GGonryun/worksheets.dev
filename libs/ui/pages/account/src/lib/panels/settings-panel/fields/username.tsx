import TextField from '@mui/material/TextField';

import { useBasicInformationFormContext } from '../context/hook';

export const UsernameField = () => {
  const { values, errors, setFieldValue } = useBasicInformationFormContext();

  const id = 'username';
  const value = values[id];
  const error = errors[id];

  return (
    <TextField
      id={id}
      required
      error={Boolean(error)}
      variant="standard"
      placeholder="Enter your username"
      label="Username"
      value={value}
      onChange={(e) => setFieldValue(id, e.target.value)}
      helperText={
        error ||
        'Your username is used as your display name across Charity Games.'
      }
      InputLabelProps={{ shrink: true }}
    />
  );
};
