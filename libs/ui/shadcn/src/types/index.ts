import { TRPCClientErrorLike } from '@trpc/client';
import { UseTRPCQueryResult } from '@trpc/react-query/shared';
import { inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@worksheets/trpc-charity/server';

export type TeamsListQuery = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['teams']['list'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type TeamQuery = NonNullable<TeamsListQuery>[number];

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

export type TeamMembersListQuery = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['teams']['members']['list'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type TeamMembersReadQuery = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['teams']['members']['read'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type TeamInvitationsListQuery = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['teams']['invitations']['list'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type TeamInvitationsReadQuery = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['teams']['invitations']['read'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type UserQuery = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['get'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type UserInvitationsListQuery = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>['user']['invitations']['list'],
  TRPCClientErrorLike<AppRouter>
>['data'];
