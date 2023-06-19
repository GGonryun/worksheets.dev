import CopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Typography, IconButton } from '@mui/material';

export const InvocationUrl: React.FC<{ url: string; onClick: () => void }> = ({
  url,
  onClick,
}) => {
  const handleCopyInvocationUrl = () => {
    onClick();
    navigator.clipboard.writeText(url);
  };

  return (
    <Box display="flex" alignItems={'center'} gap={1}>
      <Box
        sx={(theme) => ({ backgroundColor: theme.palette.grey[100] })}
        display="flex"
        gap={1}
        overflow="hidden"
        whiteSpace="nowrap"
      >
        <Typography fontSize={14}>POST</Typography>
        <Typography
          fontSize={14}
          color="primary"
          sx={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={handleCopyInvocationUrl}
        >
          {url}
        </Typography>
      </Box>
      <IconButton
        sx={{ p: 0, m: 0 }}
        size="small"
        onClick={handleCopyInvocationUrl}
      >
        <CopyIcon color="primary" fontSize="small" />
      </IconButton>
    </Box>
  );
};
