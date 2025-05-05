'use client';

import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  AlertCircle,
  Edit,
  Eye,
  GamepadIcon,
  MessageCircleHeart,
  MoreHorizontal,
  Plus,
  Send,
  Trash,
} from 'lucide-react';
import Link from 'next/link';
import { devRoutes, routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import React from 'react';
import { TeamGamesListQuery, TeamSelectedQuery } from '../types';
import { ErrorMessage } from '../errors/error-message';
import { Skeleton } from '../ui/skeleton';
import { printShortDateTime } from '@worksheets/util/time';
import { GameStatus, GameVisibility } from '@prisma/client';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { MAX_TEAM_GAMES, MAX_TEAM_MEMBERS } from '@worksheets/util/settings';
import { cn } from '../utils';

export const GameList: React.FC = () => {
  const games = trpc.user.teams.games.list.useQuery();
  const team = trpc.user.teams.selected.useQuery();

  return (
    <GameListLayout>
      {games.isPending || team.isPending ? (
        <GameListSkeleton />
      ) : games.isError || team.isError ? (
        <ErrorMessage message={games.error?.message ?? team.error?.message} />
      ) : !games.data.length ? (
        <EmptyGameListState />
      ) : (
        <>
          <GamesLimit games={games.data} />
          <GameListContent games={games.data} team={team.data} />
        </>
      )}
    </GameListLayout>
  );
};

export const GameListLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Games</CardTitle>
        <CardDescription>
          Manage your game submissions and their status
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const GameTableLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Visibility</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Minutes</TableHead>
          <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
};

const GameListSkeleton: React.FC = () => {
  return (
    <GameTableLayout>
      {Array.from({ length: 3 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell className="font-medium">
            <div className="flex flex-col space-y-1">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-20" />
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Skeleton className="h-5 w-16" />
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Skeleton className="h-5 w-16" />
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Skeleton className="h-5 w-16" />
          </TableCell>
          <TableCell className="flex justify-end items-center space-x-2">
            <Skeleton className="h-8 w-8" />
          </TableCell>
        </TableRow>
      ))}
    </GameTableLayout>
  );
};

const EmptyGameListState: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-primary/10 p-6 mb-4">
        <GamepadIcon className="h-12 w-12 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No games yet</h3>
      <p className="text-muted-foreground max-w-md mb-6">
        Start by creating your first game. Once created, it will appear here for
        you to manage.
      </p>
      <Button asChild>
        <Link href={devRoutes.dashboard.games.new.path()}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Game
        </Link>
      </Button>
    </div>
  );
};

const GameListContent: React.FC<{
  team: NonNullable<TeamSelectedQuery>;
  games: NonNullable<TeamGamesListQuery>;
}> = ({ games, team }) => {
  return (
    <GameTableLayout>
      {games.map((game) => (
        <TableRow key={game.id}>
          <TableCell className="font-medium">
            <div className="flex flex-col">
              <span>{game.title}</span>
              <span className="text-xs text-muted-foreground">{game.slug}</span>
            </div>
          </TableCell>
          <TableCell>
            <VisibilityBadge visibility={game.visibility} />
          </TableCell>
          <TableCell className="hidden sm:table-cell">
            <StatusBadge status={game.status} />
          </TableCell>
          <TableCell className="hidden md:table-cell">
            {game.duration}
          </TableCell>
          <TableCell className="hidden lg:table-cell">
            {printShortDateTime(game.lastUpdated)}
          </TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    href={devRoutes.dashboard.games.view.path({
                      params: {
                        gameId: game.id,
                      },
                    })}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                {game.status === 'DRAFT' && (
                  <DropdownMenuItem asChild>
                    <Link
                      href={devRoutes.dashboard.games.view.visibility.path({
                        params: {
                          gameId: game.id,
                        },
                      })}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Publish
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link
                    href={routes.game.url({
                      params: {
                        gameId: game.id,
                      },
                    })}
                    target="_blank"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" asChild>
                  <Link
                    href={devRoutes.dashboard.games.view.visibility.url({
                      params: {
                        gameId: game.id,
                      },
                    })}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </GameTableLayout>
  );
};

const GamesLimit: React.FC<{ games: NonNullable<TeamGamesListQuery> }> = ({
  games,
}) => {
  return (
    <div className="flex items-center justify-between bg-muted p-3 rounded-lg mb-2">
      <div className="text-sm">
        <span className="font-medium">{games.length}</span> of{' '}
        <span className="font-medium">{MAX_TEAM_MEMBERS}</span> games created
      </div>
      {games.length >= MAX_TEAM_MEMBERS && (
        <Badge variant="destructive">limit reached</Badge>
      )}
    </div>
  );
};

const VisibilityBadge: React.FC<{ visibility: GameVisibility }> = ({
  visibility,
}) => {
  switch (visibility) {
    case 'PUBLIC':
      return <Badge className="bg-green-500">Public</Badge>;
    case 'UNLISTED':
      return <Badge className="bg-blue-500">Unlisted</Badge>;
    case 'PRIVATE':
      return <Badge className="bg-slate-500">Private</Badge>;
    default:
      return <Badge variant="secondary">{visibility}</Badge>;
  }
};

const StatusBadge: React.FC<{ status: GameStatus }> = ({ status }) => {
  switch (status) {
    case 'APPROVED':
      return <Badge className="bg-green-500">Approved</Badge>;
    case 'PENDING':
      return <Badge className="bg-yellow-500">Pending</Badge>;
    case 'REJECTED':
      return <Badge className="bg-red-500">Rejected</Badge>;
    case 'CHANGES_REQUESTED':
      return <Badge className="bg-orange-500">Changes Requested</Badge>;
    case 'DRAFT':
      return <Badge variant="secondary">Draft</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};
