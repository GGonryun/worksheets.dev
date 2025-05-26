import {
  AccountCircle,
  Login,
  Redeem,
  SportsEsports,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import { routes } from '@worksheets/routes';
import { useMediaQuery } from '@worksheets/ui/hooks/use-media-query';
import React from 'react';

import { LogoBox } from '../shared/logo-box';
import { ToolbarActionButton } from './action-box';
import { Toolbar } from './toolbar';

export const AppToolbar: React.FC<{ connected: boolean }> = ({ connected }) => {
  const isTiny = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Toolbar>
      <LogoBox />
      <Box
        display="flex"
        gap={1}
        alignItems="center"
        justifyContent={isTiny ? 'flex-end' : 'center'}
        flex={1}
        pr={1}
      >
        <ToolbarActionButton
          color="success"
          href={routes.category.url({
            params: {
              tagId: 'popular',
            },
          })}
          label="Top Games"
          Icon={SportsEsports}
        />
        <ToolbarActionButton
          color="secondary"
          href={routes.raffles.url()}
          label="Giveaways"
          Icon={Redeem}
        />
      </Box>

      <ToolbarActionButton
        square
        color="primary"
        href={connected ? routes.account.path() : routes.login.path()}
        Icon={connected ? AccountCircle : Login}
      />
    </Toolbar>
  );
};
