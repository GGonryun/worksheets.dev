import TextField from '@mui/material/TextField';
import { FC } from 'react';

export const titleFieldId = 'title';

export const TitleField: FC<{ error: string | undefined }> = ({ error }) => (
  <TextField
    id={titleFieldId}
    error={Boolean(error)}
    size="small"
    required
    label="Title"
    placeholder="My Awesome Game"
    helperText={
      error ?? 'A user friendly title for your game, max 50 characters'
    }
  />
);
