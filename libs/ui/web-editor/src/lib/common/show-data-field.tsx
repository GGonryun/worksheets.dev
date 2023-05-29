import styles from './show-data-field.module.css';
import { Box, Divider, TextField } from '@mui/material';

export type ShowDataFieldProps = { label?: string; text: string };
export function ShowDataField({ label, text }: ShowDataFieldProps) {
  return (
    <Box display="flex" flexDirection="column">
      {label && <Divider sx={{ pb: 1 }}>{label}</Divider>}

      <TextField
        InputProps={{
          className: styles['text'],
          classes: { disabled: styles['text'], root: styles['text'] },
        }}
        disabled
        value={text}
        multiline
        minRows={1}
        maxRows={8}
      />
    </Box>
  );
}
