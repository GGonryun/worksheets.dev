import { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { printBytes } from '@worksheets/util/numbers';
import { CircularProgress } from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useFileName } from '@worksheets/ui-core';
import WarningIcon from '@mui/icons-material/Warning';

type FileStatus = 'uploading' | 'uploaded' | 'error';

export const GameFile: FC<{
  url?: string;
  size?: number;
  status: FileStatus;
  error: string;
  onDelete: () => Promise<void>;
}> = ({ url, size, status, error, onDelete }) => {
  const { file } = useFileName(url ?? '/unknown.zip');

  return (
    <Box
      sx={{
        position: 'relative',
        border: (theme) => `1px solid ${theme.palette.divider}`,

        borderRadius: (theme) => theme.shape.borderRadius / 3,
        padding: (theme) => theme.spacing(1, 2),
      }}
    >
      <Button
        variant="text"
        onClick={async () => await onDelete()}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: (theme) => theme.spacing(0, 1),
          margin: 0,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderTop: 'none',
          borderRight: 'none',
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 0,
          textTransform: 'none',
          fontSize: (theme) => theme.typography.body3.fontSize,
          fontFamily: (theme) => theme.typography.body3.fontFamily,
          color: (theme) => theme.palette.error.main,
        }}
      >
        Delete File
      </Button>
      <Box display="flex" alignItems="center" gap={2}>
        {fileStatusIcon[status]}
        <Box>
          <Box display="flex" gap={0.5} alignItems="baseline">
            <Typography variant="body2" fontWeight={700}>
              {file}
            </Typography>
            {!!size && (
              <Typography variant="body3" color="text.primary">
                &#183; {printBytes(size)}
              </Typography>
            )}
          </Box>
          <Box display="flex" gap={0.5} alignItems="center">
            <Typography
              variant="body3"
              color={error ? 'error.main' : 'text.secondary'}
            >
              {error || fileStatusLabel[status]}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const fileStatusIcon: Record<FileStatus, ReactNode> = {
  uploading: <CircularProgress size={28} sx={{ px: '4px' }} />,
  uploaded: <CheckCircleOutlinedIcon fontSize="large" color="success" />,
  error: <WarningIcon fontSize="large" color="error" />,
};

const fileStatusLabel: Record<FileStatus, string> = {
  uploading: 'Uploading...',
  uploaded: 'Upload Successful',
  error: 'Failed to upload file. Please try again.',
};
