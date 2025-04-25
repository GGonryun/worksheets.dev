import { TRPCClientErrorLike } from '@trpc/client';
import { UseTRPCQueryResult } from '@trpc/react-query/shared';
import { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@worksheets/trpc-charity/server';

export type TeamsQuery = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['teams']['list'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type TeamQuery = NonNullable<TeamsQuery>[number];

export type TeamSelectedQuery = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['teams']['selected'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type TeamGamesListQuery = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['teams']['games']['list'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type TeamGamesReadQuery = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['teams']['games']['read'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type TeamGameplayStatisticsQuery = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['teams']['games']['statistics'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type TeamsGamesVersionsReadQuery = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['teams']['games']['versions']['read'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type TeamGamesVersionsListQuery = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['teams']['games']['versions']['list'],
  TRPCClientErrorLike<AppRouter>
>['data'];
