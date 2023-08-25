import { Box, Typography, Link } from '@mui/material';
import { FC } from 'react';
import { TinyLogo } from '../../../shared/tiny-logo';
import { Flex } from '@worksheets/ui/common';
import { urls } from '../../../shared/urls';

export const SignUpFirstNotice: FC = () => (
  <Flex gap={3} p={3}>
    <TinyLogo
      borderless
      area={128}
      src={`/art/business-person-male-taking-notes.svg`}
    />
    <Box>
      <Typography variant="h5" fontWeight={900}>
        You need an account to create connections
      </Typography>
      <Typography variant="body1" color="text.secondary" component="span">
        Creating connections allows you to use external services in your API
        without having to manage the complexity of authentication.{' '}
        <Link href={urls.docs.home}>Learn more</Link>
      </Typography>
      <Box pt={4}>
        <Link underline="hover" href={urls.app.login}>
          Create an account to store your connections
        </Link>
      </Box>
    </Box>
  </Flex>
);
