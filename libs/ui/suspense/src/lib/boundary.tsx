'use server';

import { HydrateClient } from '@worksheets/trpc/hydrate/server';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const Boundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};
