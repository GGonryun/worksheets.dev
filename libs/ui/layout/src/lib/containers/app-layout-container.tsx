import {
  AccountCircle,
  HourglassEmpty,
  Login,
  Redeem,
  SportsEsports,
} from '@mui/icons-material';
import { routes } from '@worksheets/routes';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { FC, ReactNode } from 'react';

import { AppLayout } from '../components/app-layout';
import { SquareButton } from '../components/shared/square-button';
import { useDrawerData } from '../hook/use-drawer-data';

export const AppLayoutContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { connected, loading } = useDrawerData();
  const isTiny = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <AppLayout
      connectionButton={
        <SquareButton
          href={connected ? routes.account.path() : routes.login.path()}
          color={connected ? 'primary' : 'warning'}
        >
          {connected ? (
            <AccountCircle fontSize="small" />
          ) : loading ? (
            <HourglassEmpty fontSize="small" />
          ) : (
            <Login fontSize="small" />
          )}
        </SquareButton>
      }
      gamesButton={
        isTiny && (
          <SquareButton
            color="success"
            href={routes.category.url({ params: { tagId: 'popular' } })}
          >
            <SportsEsports fontSize="small" />
          </SquareButton>
        )
      }
      rafflesButton={
        isTiny && (
          <SquareButton color="secondary" href={routes.raffles.url()}>
            <Redeem fontSize="small" />
          </SquareButton>
        )
      }
    >
      {children}
    </AppLayout>
  );
};
