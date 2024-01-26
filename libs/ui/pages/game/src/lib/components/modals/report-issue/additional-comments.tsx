import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

export const AdditionalComments: FC<{
  comment: string;
  onChange: (text: string) => void;
}> = ({ comment, onChange }) => (
  <Box display="flex" flexDirection="column" gap={1}>
    <Typography variant="body1" id="report-comment-label">
      You may enter additional information that you feel is relevant to your
      report here.
    </Typography>
    <TextField
      size="small"
      fullWidth
      aria-labelledby="report-comment-label"
      id="report-comment"
      multiline
      rows={4}
      value={comment}
      onChange={(e) => onChange(e.target.value)}
    />
  </Box>
);
