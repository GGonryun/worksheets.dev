import { TRPCClientErrorLike } from '@trpc/client';
import { UseTRPCQueryResult } from '@trpc/react-query/shared';
import { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@worksheets/trpc-charity/server';

export type TeamsQuery = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['teams']['list'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type TeamQuery = NonNullable<TeamsQuery>[number];

export type TeamOwnedGames = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['teams']['games']['list'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type TeamGameplayStatistics = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['teams']['games']['statistics'],
  TRPCClientErrorLike<AppRouter>
>['data'];
