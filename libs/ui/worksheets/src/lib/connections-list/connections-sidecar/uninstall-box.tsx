import { Box, Button, Link, Paper, Tooltip, Typography } from '@mui/material';
import { DeleteOutlined, OpenInNew } from '@mui/icons-material';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export const UninstallBox: React.FC = () => (
  <Paper
    variant="outlined"
    sx={{
      p: 2,
      width: 200,
      height: 180,
      display: 'flex',
      gap: 2,
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderColor: 'error.main',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
      }}
    >
      <Typography variant="body1" fontWeight={900}>
        Delete connection
      </Typography>
      <Typography variant="body2">
        <Link
          href={SERVER_SETTINGS.WEBSITES.DOCS_URL(
            '/privacy-policy/data-retention'
          )}
          target="_blank"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
        >
          View privacy policy
          <OpenInNew fontSize="inherit" />
        </Link>
      </Typography>
    </Box>
    <Box display="flex" justifyContent={'flex-end'} alignItems={'flex-end'}>
      <Tooltip title="You must connect this application to delete it.">
        <span>
          <Button
            startIcon={<DeleteOutlined />}
            variant="contained"
            color="error"
            size="small"
            disabled
          >
            Uninstall
          </Button>
        </span>
      </Tooltip>
    </Box>
  </Paper>
);
