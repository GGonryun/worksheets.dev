import TextField from '@mui/material/TextField';
import { FC } from 'react';

export const taglineFieldId = 'tagline';

export const TaglineField: FC<{ error: string | undefined }> = ({ error }) => (
  <TextField
    id={taglineFieldId}
    error={Boolean(error)}
    size="small"
    required
    label="Tagline"
    placeholder="My awesome game is awesome!"
    helperText={error ?? 'A short tagline for your game, max 100 characters'}
  />
);
