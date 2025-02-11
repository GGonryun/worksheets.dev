import { playRoutes, portalRoutes } from '@worksheets/routes';

export const gameRedirectLogin = (gameId: string) =>
  portalRoutes.login.url({
    query: {
      redirect: playRoutes.game.path({
        params: {
          gameId,
        },
      }),
    },
  });
