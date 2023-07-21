import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@worksheets/trpc/ide/server';

export type RouterInputs = inferRouterInputs<AppRouter>;

export type ListApplicationsResponse =
  inferRouterOutputs<AppRouter>['applications']['list'];

export type ApplicationDetails =
  inferRouterOutputs<AppRouter>['applications']['list'][number];

export type GetApplicationResponse =
  inferRouterOutputs<AppRouter>['applications']['get'];

export type GetApplicationDetailsResponse =
  inferRouterOutputs<AppRouter>['applications']['details'];

export type ListTokensResponse =
  inferRouterOutputs<AppRouter>['user']['tokens']['list'];

export type UserOverviewResponse =
  inferRouterOutputs<AppRouter>['user']['overview'];
