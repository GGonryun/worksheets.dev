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
  Edit,
  Eye,
  GamepadIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from 'lucide-react';
import Link from 'next/link';
import { devRoutes, routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import React from 'react';
import { TeamOwnedGames } from '../types';
import { ErrorMessage } from '../errors/error-message';
import { Skeleton } from '../ui/skeleton';
import { useActiveTeam } from '../hooks/use-active-team';

export const GameList: React.FC = () => {
  const [savedTeam] = useActiveTeam();
  const games = trpc.user.teams.games.list.useQuery({ teamId: savedTeam });

  return (
    <GameListLayout>
      {games.isPending ? (
        <GameListSkeleton />
      ) : games.isError ? (
        <ErrorMessage message={games.error.message} />
      ) : !games.data.length ? (
        <EmptyGameListState />
      ) : (
        <GameListContent games={games.data} />
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
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Plays</TableHead>
          <TableHead className="hidden md:table-cell">Minutes</TableHead>
          <TableHead className="hidden md:table-cell">Last Updated</TableHead>
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

const GameListContent: React.FC<{ games: NonNullable<TeamOwnedGames> }> = ({
  games,
}) => {
  return (
    <GameTableLayout>
      {games.map((game) => (
        <TableRow key={game.id}>
          <TableCell className="font-medium">
            <div className="flex flex-col">
              <span>{game.title}</span>
              <span className="text-xs text-muted-foreground">{game.id}</span>
            </div>
          </TableCell>
          <TableCell>
            <StatusBadge status={game.status} />
          </TableCell>
          <TableCell className="hidden md:table-cell">{game.plays}</TableCell>
          <TableCell className="hidden md:table-cell">
            {game.duration}
          </TableCell>
          <TableCell className="hidden md:table-cell">
            {game.lastUpdated}
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
                <DropdownMenuItem asChild>
                  <Link
                    href={routes.preview.url({
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
                <DropdownMenuItem className="text-destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </GameTableLayout>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'published':
      return <Badge className="bg-green-500">Published</Badge>;
    case 'draft':
      return <Badge variant="outline">Draft</Badge>;
    case 'review':
      return <Badge className="bg-amber-500">In Review</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};
