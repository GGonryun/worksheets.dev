'use client';

import { DetailsForm } from './details-form';
import { MediaForm } from './media-form';
import { VersionsList } from './versions-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import React from 'react';
import { devRoutes } from '@worksheets/routes';
import Link from 'next/link';
import { VisibilityForm } from './visibility-form';
import { trpc } from '@worksheets/trpc-charity';
import { Skeleton } from '../ui';
import { ErrorScreen } from '../errors';

export const UpdateGame: React.FC<{
  gameId: string;
  activeTab: 'details' | 'media' | 'versions' | 'visibility';
}> = ({ gameId, activeTab }) => {
  const team = trpc.user.teams.selected.useQuery();
  const game = trpc.user.teams.games.read.useQuery({
    gameId,
  });

  if (team.isPending || game.isPending) {
    return (
      <div className="container py-6 space-y-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (team.isError || game.isError) {
    return <ErrorScreen message={team.error?.message ?? game.error?.message} />;
  }

  const props = {
    team: team.data,
    game: game.data,
  };

  return (
    <div className="container py-6 space-y-6">
      <Tabs value={activeTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="details" asChild>
            <Link
              href={devRoutes.dashboard.games.view.details.path({
                params: {
                  gameId,
                },
              })}
            >
              Details
            </Link>
          </TabsTrigger>
          <TabsTrigger value="media" asChild>
            <Link
              href={devRoutes.dashboard.games.view.media.path({
                params: {
                  gameId,
                },
              })}
            >
              Media
            </Link>
          </TabsTrigger>
          <TabsTrigger value="versions" asChild>
            <Link
              href={devRoutes.dashboard.games.view.versions.path({
                params: {
                  gameId,
                },
              })}
            >
              Versions
            </Link>
          </TabsTrigger>
          <TabsTrigger value="visibility" asChild>
            <Link
              href={devRoutes.dashboard.games.view.visibility.path({
                params: {
                  gameId,
                },
              })}
            >
              Visibility
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="pt-4">
          <DetailsForm {...props} />
        </TabsContent>
        <TabsContent value="media" className="pt-4">
          <MediaForm {...props} />
        </TabsContent>
        <TabsContent value="versions" className="pt-4">
          <VersionsList {...props} />
        </TabsContent>
        <TabsContent value="visibility" className="pt-4">
          <VisibilityForm {...props} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
