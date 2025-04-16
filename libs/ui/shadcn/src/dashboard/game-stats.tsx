'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { BarChart } from '../ui/bar-chart';
import { useState } from 'react';
import { ChartColumnIcon, PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { cn } from '../utils';
import { TeamGameplayStatistics } from '../types';
import { devRoutes } from '@worksheets/routes';
import { ErrorMessage } from '../errors/error-message';
import { trpc } from '@worksheets/trpc-charity';
import { Skeleton } from '../ui';
import { useActiveTeam } from '../hooks/use-active-team';

const mockData = [
  { name: '1-01', plays: 24, time: 120 },
  { name: '1-02', plays: 13, time: 80 },
  { name: '1-03', plays: 38, time: 190 },
  { name: '1-04', plays: 42, time: 210 },
  { name: '1-05', plays: 55, time: 275 },
  { name: '1-06', plays: 72, time: 360 },
  { name: '1-07', plays: 63, time: 315 },
];

const blurStyles = 'opacity-10 filter blur-[2px] pointer-events-none';

export const GameStats: React.FC = () => {
  const [savedTeam] = useActiveTeam();

  const statistics = trpc.user.teams.games.statistics.useQuery({
    teamId: savedTeam,
  });

  return (
    <GameStatsLayout>
      {statistics.isPending ? (
        <GameStatsSkeleton />
      ) : statistics.isError ? (
        <GameStatsError message={statistics.error.message} />
      ) : (
        <GameStatsContent statistics={statistics.data} />
      )}
    </GameStatsLayout>
  );
};

export const GameStatsLayout: React.FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Game Performance</CardTitle>
        <CardDescription>
          Track plays and game time across your games
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">{children}</CardContent>
    </Card>
  );
};

export const GameStatsContent: React.FC<{
  statistics: NonNullable<TeamGameplayStatistics>;
}> = ({ statistics }) => {
  const data = statistics.analytics;
  return (
    <>
      <div
        className={cn(
          'h-[300px] w-full',
          !statistics.hasGames ? blurStyles : ''
        )}
      >
        <BarChart
          data={statistics.hasGames ? data : mockData}
          categories={['plays', 'time']}
          index="name"
          colors={['#8A9B68', '#931F1D']}
          valueFormatter={(value: number) => `${value}`}
          yAxisWidth={48}
          xAxisInterval={7}
          showLegend
          showXAxis
          showYAxis
          showTooltip
        />
      </div>

      <div
        className={cn(
          'mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4',
          !statistics.hasGames ? blurStyles : ''
        )}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Plays</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.reduce((acc, item) => acc + item.plays, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Game Time (min)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.reduce((acc, item) => acc + item.time, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {!statistics.hasGames && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 ">
          <div className="rounded-full bg-primary/10 p-6">
            <ChartColumnIcon className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-center">
            Create your first game to get started!
          </h3>
          <p className="text-muted-foreground text-center max-w-md">
            Once you publish your first game, you'll see performance metrics and
            analytics here.
          </p>
          <Button asChild className="mt-2">
            <Link href={devRoutes.dashboard.games.new.path()}>
              <PlusIcon />
              Add New Game
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export const GameStatsError: React.FC<{ message: string }> = ({ message }) => {
  return <ErrorMessage message={message} />;
};

export const GameStatsSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton className="h-[300px] w-full" />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Plays</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Game Time (min)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-24" />
          </CardContent>
        </Card>
      </div>
    </>
  );
};
