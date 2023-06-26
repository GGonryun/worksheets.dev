import React from 'react';
import { Box, Typography, Tooltip, Button, Divider } from '@mui/material';
import { CodeEditor } from '@worksheets/ui/code-editor';
import FormatPaintIcon from '@mui/icons-material/FormatPaintOutlined';
import ReportIcon from '@mui/icons-material/Report';
import ReplayIcon from '@mui/icons-material/Replay';

export const JSONEditor: React.FC<{
  value: string;
  title?: string;
  onChange?: (newValue: string) => void;
  onCopy?: () => void;
  onFormat?: () => void;
  onReset?: () => void;
  error?: string;
  caption?: string;
  hideActiveLine?: boolean;
}> = ({
  title,
  value,
  onChange,
  onFormat,
  onReset,
  onCopy,
  error,
  caption,
  hideActiveLine,
}) => {
  const calculateHeight = () => `calc(100% - ${!error ? 48 : 78}px)`;

  return (
    <Box width="100%" height="100%">
      {title && (
        <Box
          height="48px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" sx={{ pl: 2 }}>
            {title}
          </Typography>
          <Box display="flex" alignItems="center" gap={2} pr={3}>
            {onChange && (
              <Tooltip
                placement="top"
                title="Visually enchance a JSON (JavaScript Object Notation) string"
              >
                <span>
                  <Button
                    startIcon={<FormatPaintIcon />}
                    size="small"
                    variant="text"
                    onClick={onFormat}
                  >
                    Format
                  </Button>
                </span>
              </Tooltip>
            )}
            {onReset && (
              <Tooltip
                placement="top"
                title="Reset your current changes back to the starting inputs."
              >
                <span>
                  <Button
                    startIcon={<ReplayIcon />}
                    size="small"
                    variant="contained"
                    onClick={onReset}
                  >
                    Reset
                  </Button>
                </span>
              </Tooltip>
            )}
          </Box>
        </Box>
      )}
      {title && <Divider />}

      <CodeEditor
        hideActiveLineHighlighter={hideActiveLine}
        onCopy={onCopy}
        caption={caption}
        height={calculateHeight()}
        width="100%"
        value={value ?? ''}
        disabled={!onChange}
        onChange={(value) => onChange && onChange(value)}
        mode={'json'}
        theme={'light'}
      />
      {error && (
        <Box display="flex" alignItems="center" height={'30px'} gap={0.5}>
          <Box height="100%">
            <ReportIcon color="error" fontSize="small" />
          </Box>
          <Box height="100%">
            <Typography variant="caption" color="red">
              {error}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
