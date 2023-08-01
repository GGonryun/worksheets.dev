import { Close } from '@mui/icons-material';
import { Box, Typography, IconButton } from '@mui/material';
import { TinyLogo } from '../../shared/tiny-logo';
import { GetConnectionDetailsResponse } from '@worksheets/schemas-connections';

export const SidecarTitle: React.FC<{
  onClose: () => void;
  connection: GetConnectionDetailsResponse;
}> = ({ onClose, connection }) => {
  return (
    <Box pt={2} pb={1}>
      <Box display="flex" gap={3}>
        <TinyLogo
          borderless
          label={connection.header.name}
          src={connection.header.logo}
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
              {connection.header.name}
            </Typography>
            <IconButton size="small" onClick={onClose}>
              <Close fontSize="small" />
            </IconButton>
          </Box>
          <Box display="flex" gap={2} py={0.5}>
            <Box display="flex" flexDirection="column" minWidth={100}>
              <Typography variant="caption">Setup Time</Typography>
              <Typography variant="caption" fontStyle="italic">
                {connection.header.setupTime}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="caption">Categories</Typography>
              <Typography variant="caption" fontStyle="italic">
                {connection.header.categories.join(', ')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
