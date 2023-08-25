import { Box, Divider } from '@mui/material';
import { GetConnectionDetailsResponse } from '@worksheets/schemas-connections';
import { useEffect, useState } from 'react';
import { Flex } from '@worksheets/ui/common';
import { ConfigurationSection } from './configuration-section';
import { CredentialsSection } from './credentials-section';
import { ConnectionEstablishedNotice } from '../connection-established-notice';
import { isExpired, addMinutesToCurrentTime } from '@worksheets/util/time';

declare global {
  interface Window {
    oauthcallback: unknown;
  }
}

export const ConnectionForm: React.FC<{
  details: GetConnectionDetailsResponse;
  onConnect: (connectionId: string) => void;
}> = ({ details, onConnect }) => {
  const [openTab, setOpenTab] = useState<string>(
    details.credentials.status === 'pending' ? 'connection' : 'configuration'
  );
  // check if created at happened at least 5 minutes ago
  const connectionEstablishedRecently = !isExpired(
    details.header.createdAt,
    addMinutesToCurrentTime(-5).getTime()
  );

  useEffect(() => {
    setOpenTab(
      details.credentials.status === 'pending' ? 'connection' : 'configuration'
    );
  }, [details.credentials.status]);

  return (
    <Flex column>
      {connectionEstablishedRecently && (
        <>
          <Box p={3}>
            <ConnectionEstablishedNotice connectionId={details.id ?? ''} />
          </Box>
          <Divider />
        </>
      )}

      <Box px={3} py={1}>
        <CredentialsSection
          details={details}
          open={openTab === 'connection'}
          onToggle={() => {
            setOpenTab((o) =>
              o === 'connection' ? 'configuration' : 'connection'
            );
          }}
          onConnect={onConnect}
        />
      </Box>
      <Divider />

      <Box px={3} py={1}>
        <ConfigurationSection
          details={details}
          open={openTab === 'configuration'}
          onToggle={() => {
            setOpenTab((o) =>
              o === 'configuration' ? 'connection' : 'configuration'
            );
          }}
        />
      </Box>
    </Flex>
  );
};
