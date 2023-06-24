import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@worksheets/trpc/ide/server';

export type RouterInputs = inferRouterInputs<AppRouter>;

export type CreateWorksheetRequest = RouterInputs['worksheets']['create'];

export type UpdateWorksheetRequest =
  inferRouterInputs<AppRouter>['worksheets']['update'];

export type ListApplicationsResponse =
  inferRouterOutputs<AppRouter>['applications']['list'];

export type FormFieldsResponse =
  inferRouterOutputs<AppRouter>['applications']['get']['fields'];

export type ConnectionFieldOptions =
  inferRouterInputs<AppRouter>['connections']['getOAuthUrl'];

export type ConnectionForm =
  inferRouterInputs<AppRouter>['connections']['submitForm'];

export type GetConnectionsDataTableResponse =
  inferRouterOutputs<AppRouter>['connections']['dataTable'];

export type GetApplicationResponse =
  inferRouterOutputs<AppRouter>['applications']['get'];

export type LogDataTableRows =
  inferRouterOutputs<AppRouter>['worksheets']['logs']['get']['logs'];
