import { FC, ReactNode } from 'react';
import { FormFields } from '../../context';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { printRelativeDate } from '@worksheets/util/time';
import { printBytes } from '@worksheets/util/numbers';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { CircularProgress } from '@mui/material';
import { FileStatus } from '@worksheets/util/types';

export const GameFile: FC<{
  file: NonNullable<FormFields['gameFile']>;
  error: string;
  onDelete: () => Promise<void>;
}> = ({ file, error, onDelete }) => (
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
      {fileStatusIcon[file.status]}
      <Box>
        <Box display="flex" gap={0.5} alignItems="baseline">
          <Typography variant="body2" fontWeight={700}>
            {file.name}
          </Typography>
          <Typography variant="body3" color="text.primary">
            &#183; {printBytes(file.size)}
          </Typography>
        </Box>
        <Box display="flex" gap={0.5} alignItems="center">
          <Typography
            variant="body3"
            color={error ? 'error.main' : 'text.secondary'}
          >
            {error || fileStatusLabel[file.status]}
          </Typography>
          <Typography
            variant="body3"
            color="text.secondary"
            display={file.status === 'uploaded' ? 'block' : 'none'}
          >
            &#183; {printRelativeDate(file.lastModified)}
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

const fileStatusIcon: Record<FileStatus, ReactNode> = {
  uploading: <CircularProgress size={28} sx={{ px: '4px' }} />,
  uploaded: <CheckCircleOutlinedIcon fontSize="large" color="success" />,
};

const fileStatusLabel: Record<FileStatus, string> = {
  uploading: 'Uploading...',
  uploaded: 'Finished',
};
