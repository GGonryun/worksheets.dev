import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { AppRouter } from '@worksheets/trpc/ide/server';

export type RouterInputs = inferRouterInputs<AppRouter>;

export type CreateWorksheetRequest = RouterInputs['worksheets']['create'];

export type UpdateWorksheetRequest =
  inferRouterInputs<AppRouter>['worksheets']['update'];

export type ListApplicationsResponse =
  inferRouterOutputs<AppRouter>['applications']['list'];

export type ApplicationDetails =
  inferRouterOutputs<AppRouter>['applications']['list'][number];

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

export type ExecutionOverrideForm =
  inferRouterInputs<AppRouter>['tasks']['execute']['overrides'];

export type ExecutionDetailsDataRow =
  inferRouterOutputs<AppRouter>['worksheets']['tasks']['history'];

export type LogListDataTableRows =
  inferRouterOutputs<AppRouter>['worksheets']['logs']['get'];

export type GetTemplateDetails =
  inferRouterOutputs<AppRouter>['templates']['get'];

export type ListTemplatesResponse =
  inferRouterOutputs<AppRouter>['templates']['list'];

export type ListMethodsResponse =
  inferRouterOutputs<AppRouter>['applications']['methods']['list'];
