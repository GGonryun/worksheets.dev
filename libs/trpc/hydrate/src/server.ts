import 'server-only'; // <-- ensure this file cannot be imported from the client

import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { createInnerContext } from '@worksheets/trpc/shared';
import {
  appRouter,
  createCallerFactory,
  makeQueryClient,
} from '@worksheets/trpc-charity/server';
import { cache } from 'react';

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(cache(createInnerContext));
export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient
);
