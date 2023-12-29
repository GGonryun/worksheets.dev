import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { FC, useState } from 'react';

export const ClipboardText: FC<{ url: string }> = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  return (
    <TextField
      fullWidth
      multiline
      rows={2}
      size="small"
      value={url}
      helperText={
        copied && (
          <Typography variant="body3" color="success.main" fontWeight={700}>
            Copied to clipboard!
          </Typography>
        )
      }
      onChange={(e) => {
        // Ignore input
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleCopyToClipboard}
              aria-label="toggle password visibility"
              edge="end"
            >
              <ContentCopyIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
