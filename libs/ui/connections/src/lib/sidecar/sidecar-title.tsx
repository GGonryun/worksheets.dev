import { Close } from '@mui/icons-material';
import { Box, Typography, IconButton } from '@mui/material';
import { GetConnectionDetailsResponse } from '@worksheets/schemas-connections';
import { Flex } from '@worksheets/ui-core';
import { ConnectionStatus } from './connection-status';
import { formatTimestamp } from '@worksheets/util/time';
import { TinyLogo } from '@worksheets/ui-basic-style';

export const SidecarTitle: React.FC<{
  onClose: () => void;
  details: GetConnectionDetailsResponse;
}> = ({ onClose, details }) => {
  return (
    <Box pt={1}>
      <Flex gap={3}>
        <TinyLogo
          borderless
          label={details.header.name}
          src={details.header.logo}
          area={92}
        />
        <Box width="100%">
          <Flex spaceBetween fullWidth>
            <Typography variant="h4" fontWeight={700}>
              {details.header.name}
            </Typography>
            <IconButton size="small" onClick={onClose} sx={{ p: 0.25, m: 0 }}>
              <Close fontSize="large" />
            </IconButton>
          </Flex>
          <Flex gap={2} py={0.5}>
            <Flex column minWidth={100}>
              <Typography variant="body2">
                <u>Setup Time</u>
              </Typography>
              <Typography variant="body2" fontStyle="italic">
                {details.header.setupTime}
              </Typography>
            </Flex>
            <Flex column>
              <Typography variant="body2">
                <u>Categories</u>
              </Typography>
              <Typography variant="body2" fontStyle="italic">
                {details.header.categories.join(', ')}
              </Typography>
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Flex spaceBetween fullWidth alignItems="center" py={1}>
        <Flex column>
          <Typography variant="caption" color="text.secondary">
            Connection ID: {details.id || <b>New Connection</b>}
          </Typography>

          {Boolean(details.header.updatedAt) && (
            <Typography variant="caption" color="text.secondary">
              Last updated: {formatTimestamp(details.header.updatedAt)}
            </Typography>
          )}
        </Flex>
        <ConnectionStatus
          status={
            !details.id
              ? 'pending'
              : details.configuration.enabled
              ? details.credentials.status
              : 'disabled'
          }
        />
      </Flex>
    </Box>
  );
};
