import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import { Alert, Box, Typography, Chip, Link } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export const ModificationBanner: React.FC<{ connectionId: string }> = ({
  connectionId,
}) => (
  <Alert
    icon={<EditOffOutlinedIcon color="action" />}
    sx={(theme) => ({
      backgroundColor: theme.palette.grey[200],
      color: theme.palette.text.primary,
    })}
  >
    <Box display="flex" alignItems="center" gap={0.5}>
      <Typography variant="body1">
        You are viewing this connection in{' '}
      </Typography>
      <Chip
        label="read-only"
        size="small"
        sx={(theme) => ({
          p: 0,
          m: 0,
          backgroundColor: theme.palette.action.disabled,
        })}
      />
      <Typography variant="body1">mode.</Typography>
    </Box>
    <Box pt={1} display="flex" gap={0.5}>
      <Typography variant="body2">Modify your settings from</Typography>
      <Link href={`/connections/${connectionId}`} target="_blank">
        the connections page <OpenInNewIcon fontSize="small" />
      </Link>
    </Box>
  </Alert>
);
