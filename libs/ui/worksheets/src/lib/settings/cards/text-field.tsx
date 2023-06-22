import { Box, Paper, Typography, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { SharedTextField } from '../../shared/shared-text-field';

export const SettingsCardTextField: React.FC<{
  title: string;
  value?: string;
  helperText?: string;
  caption?: string;
  readonly?: boolean;
  sensitive?: boolean;
  onUpdate?: (value: string) => void;
}> = ({
  sensitive,
  title,
  caption,
  helperText,
  readonly,
  value: defaultValue,
  onUpdate,
}) => {
  const [value, setValue] = useState('');
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setValue(defaultValue ?? '');
  }, [defaultValue]);

  useEffect(() => {
    setDirty(value !== defaultValue);
  }, [value, defaultValue]);

  const updateValue = (newValue: string) => {
    setValue(newValue);
  };

  const handleCancel = () => {
    setValue(defaultValue ?? '');
  };

  const handleSave = () => {
    onUpdate && onUpdate(value);
  };

  return (
    <Box width="100%">
      <Paper
        elevation={6}
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{caption}</Typography>
        <SharedTextField
          type={sensitive ? 'password' : 'text'}
          disabled={readonly}
          value={value}
          helperText={helperText}
          onChange={(value) => updateValue(value.target.value)}
        />
        <Box display="flex" justifyContent="flex-end" gap={2}>
          {!readonly && dirty && (
            <Button
              sx={{ fontWeight: 900 }}
              size="small"
              color="inherit"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
          {!readonly && (
            <Button
              onClick={handleSave}
              disabled={!dirty}
              variant="contained"
              size="small"
            >
              Save
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
