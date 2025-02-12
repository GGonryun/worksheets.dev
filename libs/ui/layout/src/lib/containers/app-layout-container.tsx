import {
  AccountCircle,
  HourglassEmpty,
  Login,
  Redeem,
  SportsEsports,
} from '@mui/icons-material';
import { Box, Button, Link, Typography } from '@mui/material';
import { blogRoutes, routes } from '@worksheets/routes';
import { InfoModal } from '@worksheets/ui/components/modals';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import { useLocalStorage } from '@worksheets/ui-core';
import { daysFromNow, isExpired, minutesAgo } from '@worksheets/util/time';
import { FC, ReactNode } from 'react';

import { AppLayout } from '../components/app-layout';
import { SquareButton } from '../components/shared/square-button';
import { useDrawerData } from '../hook/use-drawer-data';

export const AppLayoutContainer: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { connected, loading, notifications } = useDrawerData();
  const [showUpdate, setShowUpdate] = useLocalStorage(
    '67d302a7-d0c7-4196-b074-c3697e943896',
    minutesAgo(1)
  );
  const isTiny = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <AppLayout
        connectionButton={
          <SquareButton
            href={connected ? routes.account.path() : routes.login.path()}
            color={
              connected && notifications.data && notifications.data > 0
                ? 'error'
                : 'primary'
            }
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
      <InfoModal open={isExpired(showUpdate)} hideClose={true}>
        <Box mt={1}>
          <Link
            href={blogRoutes.article.url({
              params: { slug: 'charity-games-2-0' },
            })}
          >
            <Typography variant="h3">Major Updates!</Typography>
          </Link>
          <br />
          <Typography variant="body1" component={'div'}>
            In order to maintain the platform long term, we're making some
            changes to the features we offer.
            <br />
            <br />
            The following major features are scheduled for demolition in the
            upcoming weeks:
            <ul>
              <li>Quests</li>
              <li>Tokens & Items</li>
              <li>Integrations</li>
              <li>Gifting & Friends</li>
              <li>
                <s>Prize Wall</s>
              </li>
              <li>
                <s>Boss Battles</s>
              </li>
            </ul>
            <Link
              href={blogRoutes.article.url({
                params: { slug: 'charity-games-2-0' },
              })}
            >
              You can read more about the changes in our blog post
            </Link>
            .
          </Typography>
          <br />
          <Button
            variant="arcade"
            color="primary"
            onClick={() => setShowUpdate(daysFromNow(1))}
          >
            Got it!
          </Button>
        </Box>
      </InfoModal>
    </>
  );
};
