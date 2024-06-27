import { routes } from '@worksheets/routes';

export const gameRedirectLogin = (gameId: string) =>
  routes.login.path({
    query: {
      redirect: routes.game.path({
        params: {
          gameId,
        },
      }),
    },
  });
