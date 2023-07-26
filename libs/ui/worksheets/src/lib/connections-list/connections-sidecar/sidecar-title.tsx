import { Close } from '@mui/icons-material';
import { Box, Typography, IconButton } from '@mui/material';
import { TinyLogo } from '../../shared/tiny-logo';

export const SidecarTitle: React.FC = () => {
  return (
    <Box pt={2} pb={1}>
      <Box display="flex" gap={3}>
        <TinyLogo
          borderless
          label={'Google Apps'}
          src={
            'https://storage.googleapis.com/worksheets-test-app-logos/openai-svgrepo-com.svg'
          }
          area={72}
        />
        <Box width="100%">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Typography variant="h6" fontWeight={700}>
              Google Apps
            </Typography>
            <IconButton size="small">
              <Close fontSize="small" />
            </IconButton>
          </Box>
          <Box display="flex" gap={2} py={0.5}>
            <Box display="flex" flexDirection="column">
              <Typography variant="caption">Setup Time</Typography>
              <Typography variant="caption" fontStyle="italic">
                &lt; 2 minutes
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="caption">Categories</Typography>
              <Typography variant="caption" fontStyle="italic">
                Email, Google, Free
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
