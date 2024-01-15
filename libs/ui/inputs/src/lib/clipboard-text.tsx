import { ContentCopy } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export const ClipboardText: React.FC<{
  text: string;
  label: string;
  helperText?: string;
  onCopy?: () => void;
}> = ({ text, label, helperText, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    onCopy && onCopy();
  };

  return (
    <TextField
      fullWidth
      size="small"
      label={label}
      value={text}
      helperText={
        copied ? (
          <Typography variant="body3" color="success.main" fontWeight={700}>
            Copied to clipboard!
          </Typography>
        ) : (
          helperText
        )
      }
      onChange={(e) => {
        // Ignore input
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleCopyToClipboard} edge="end" size="small">
              <ContentCopy />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
