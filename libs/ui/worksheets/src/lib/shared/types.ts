import { inferRouterInputs } from '@trpc/server';
import { AppRouter } from '@worksheets/trpc/ide/server';

export type RouterInputs = inferRouterInputs<AppRouter>;
export type CreateWorksheetRequest = RouterInputs['worksheets']['create'];
export type UpdateWorksheetRequest =
  inferRouterInputs<AppRouter>['worksheets']['update'];
