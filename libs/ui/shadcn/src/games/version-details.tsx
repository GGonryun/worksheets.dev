'use client';

import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';
import { AlertCircle, Download, Star, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { trpc } from '@worksheets/trpc-charity';
import { printDate } from '@worksheets/util/time';
import { devRoutes, routes } from '@worksheets/routes';
import { printBytes } from '@worksheets/util/data';
import { TeamGamesReadQuery, TeamSelectedQuery } from '../types';
import { Skeleton } from '../ui';
import { ErrorMessage } from '../errors/error-message';

interface VersionDetailsProps {
  fileId: string | null;
  team: NonNullable<TeamSelectedQuery>;
  game: NonNullable<TeamGamesReadQuery>;
  onSetCurrent: () => void;
  onDelete: () => void;
}

export const VersionDetails: React.FC<VersionDetailsProps> = ({
  team,
  game,
  fileId,
  onSetCurrent,
  onDelete,
}) => {
  const file = trpc.user.teams.games.versions.read.useQuery(
    {
      fileId: fileId ?? '',
    },
    {
      enabled: !!fileId,
    }
  );

  if (file.isPending) {
    return <VersionDetailsSkeleton />;
  }

  if (file.isError) {
    return <ErrorMessage className="pt-8" message={file.error?.message} />;
  }

  const { version, isCurrent, metadata, createdAt, uploader, error, notes } =
    file.data;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">File Information</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-muted-foreground">Version:</div>
          <div className="flex items-center gap-2">
            {version}
            {isCurrent && <Badge className="bg-green-500">Current</Badge>}
          </div>
          <div className="text-muted-foreground">Filename:</div>
          <div>{metadata.name}</div>
          <div className="text-muted-foreground">Size:</div>
          <div>{printBytes(metadata.size)}</div>
          <div className="text-muted-foreground">Created:</div>
          <div>{printDate(createdAt, 'en-US', true)}</div>
          <div className="text-muted-foreground">Uploader:</div>
          <Link
            href={devRoutes.dashboard.users.active.url()}
            className="text-blue-500 hover:underline"
          >
            {uploader.username}
          </Link>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Release Notes</h4>
        <div className="rounded-md bg-muted p-3 text-sm">
          {notes || (
            <span className="text-muted-foreground italic">
              No release notes provided
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-4">
        <Button asChild variant="outline">
          <Link
            href={routes.game.version.url({
              params: {
                gameId: game.id,
                version,
              },
            })}
            target="_blank"
          >
            <Download className="mr-2 h-4 w-4" />
            Preview Game
          </Link>
        </Button>

        {onSetCurrent && (
          <Button onClick={onSetCurrent}>
            <Star className="mr-2 h-4 w-4" />
            Set as Current Version
          </Button>
        )}

        <Button variant="destructive" onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Version
        </Button>
      </div>
    </div>
  );
};

const VersionDetailsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="space-y-2 pt-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};
