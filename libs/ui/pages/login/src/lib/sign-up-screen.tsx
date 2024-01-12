import { Box, Link, Typography } from '@mui/material';
import { FC } from 'react';

import { ConnectionContainer } from './connection-container';
import { SocialProviders, SocialProvidersProps } from './social-providers';

export type SignUpScreenProps = SocialProvidersProps;

export const SignUpScreen: FC<SignUpScreenProps> = (props) => {
  return (
    <ConnectionContainer>
      <Box>
        <Typography variant="h4" textAlign="center">
          Sign Up
        </Typography>
        <Typography variant="body2" textAlign="center" pt={0.5}>
          Create a new Charity.Games account
          <br />
          <Link href={`/faq#do-i-need-an-account`}>
            <b>Do I need an account?</b>
          </Link>
        </Typography>
      </Box>
      <SocialProviders {...props} />
      <Typography variant="body2" textAlign="center" display="flex" gap={2}>
        Already registered?{' '}
        <Link href={`/login`}>
          <b>Log in</b>
        </Link>
      </Typography>
    </ConnectionContainer>
  );
};
