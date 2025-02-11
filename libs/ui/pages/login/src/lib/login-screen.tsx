import { Box, Link, Typography } from '@mui/material';
import { helpRoutes, portalRoutes } from '@worksheets/routes';
import { HelpAccountQuestions } from '@worksheets/util/enums';
import { FC } from 'react';

import { ConnectionContainer } from './connection-container';
import { SocialProviders, SocialProvidersProps } from './social-providers';

export type LoginScreenProps = SocialProvidersProps;

export const LoginScreen: FC<LoginScreenProps> = (props) => {
  return (
    <ConnectionContainer>
      <Box>
        <br />
        <Typography
          variant="h4"
          textAlign="center"
          display={{ xs: 'none', sm: 'block' }}
        >
          Log In
        </Typography>
        <Typography variant="body2" textAlign="center" pt={0.5}>
          Connect to Charity.Games
          <br />
          <Link
            href={helpRoutes.accounts.url({
              bookmark: HelpAccountQuestions.AccountRequired,
            })}
          >
            <b>Do I need an account?</b>
          </Link>
        </Typography>
      </Box>

      <SocialProviders {...props} />

      <Typography variant="body2" textAlign="center" display="flex" gap={2}>
        New to Charity.Games?{' '}
        <Link href={portalRoutes.signUp.url()}>
          <b>Join now</b>
        </Link>
      </Typography>
    </ConnectionContainer>
  );
};
