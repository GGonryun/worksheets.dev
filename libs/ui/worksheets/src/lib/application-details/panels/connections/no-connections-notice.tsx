import { Box, Typography, Link, Button } from '@mui/material';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';
import { FC } from 'react';
import { TinyLogo } from '../../../shared/tiny-logo';
import { Flex } from '@worksheets/ui/common';
import { Add } from '@mui/icons-material';

export const NoConnectionsNotice: FC = () => (
  <Flex gap={3} p={3}>
    <TinyLogo
      borderless
      area={128}
      src={`/art/business-woman-1.svg`}
      label="Business woman drawing attention to the words on the right"
    />
    <Box>
      <Typography variant="h5" fontWeight={900}>
        You have no connections
      </Typography>
      <Typography variant="body1" color="text.secondary" component="span">
        Create a connection to an application to start using it in your API
      </Typography>
      <Flex column pt={4} gap={1}>
        <Link underline="hover" href={SERVER_SETTINGS.WEBSITES.DOCS_URL()}>
          Read about connections
        </Link>
      </Flex>
    </Box>
  </Flex>
);
