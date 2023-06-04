import { Box, Divider, TextareaAutosize } from '@mui/material';

export type ShowDataFieldProps = { label?: string; text: string };
export function ShowDataField({ label, text }: ShowDataFieldProps) {
  return (
    <Box display="flex" flexDirection="column">
      {label && <Divider sx={{ pb: 1 }}>{label}</Divider>}

      <TextareaAutosize disabled value={text} maxRows={20} />
    </Box>
  );
}
