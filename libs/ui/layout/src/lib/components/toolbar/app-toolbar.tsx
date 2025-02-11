'use';
import {
  AccountCircle,
  Games,
  HourglassEmpty,
  LocalActivity,
  Login,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import { contestsRoutes, playRoutes, portalRoutes } from '@worksheets/routes';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { useSession } from 'next-auth/react';
import React from 'react';

import { LogoBox } from '../shared/logo-box';
import { SquareButton } from '../shared/square-button';
import { ActionBox } from './action-box';
import { Toolbar } from './toolbar';

export const AppToolbar: React.FC = () => {
  const session = useSession();
  const isTiny = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Toolbar>
      <LogoBox />

      <ActionBox />

      <Box
        mb={1}
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={1}
      >
        {isTiny && (
          <SquareButton color={'secondary'} href={playRoutes.home.url()}>
            <Games />
          </SquareButton>
        )}
        {isTiny && (
          <SquareButton color={'success'} href={contestsRoutes.raffles.url()}>
            <LocalActivity />
          </SquareButton>
        )}
        <ConnectionButton status={session.status} />
      </Box>
    </Toolbar>
  );
};

const ConnectionButton: React.FC<{
  status: 'authenticated' | 'unauthenticated' | 'loading';
}> = ({ status }) => {
  return (
    <SquareButton
      href={
        status === 'authenticated'
          ? portalRoutes.account.url()
          : portalRoutes.login.url()
      }
      color={'primary'}
    >
      {status === 'authenticated' ? (
        <AccountCircle />
      ) : status === 'loading' ? (
        <HourglassEmpty />
      ) : (
        <Login />
      )}
    </SquareButton>
  );
};
