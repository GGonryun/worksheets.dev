'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import {
  Check,
  Globe,
  GamepadIcon,
  UsersIcon,
  CodeIcon,
  PlusIcon,
} from 'lucide-react';
import { cn } from '../utils';
import { trpc } from '@worksheets/trpc-charity';
import { devRoutes, routes } from '@worksheets/routes';
import { Skeleton } from '../ui/skeleton';
import { TeamQuery, TeamsListQuery } from '../types';
import { ErrorMessage } from '../errors/error-message';

export function TeamPicker() {
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState<TeamQuery | null>(null);
  const teamList = trpc.user.teams.list.useQuery();
  const selectTeam = trpc.user.teams.select.useMutation();

  const handleContinue = () => {
    if (selectedTeam) {
      selectTeam.mutate(selectedTeam.id, {
        onSuccess: () => {
          router.push(devRoutes.dashboard.path());
        },
      });
    }
  };

  return (
    <TeamPickerLayout
      isPending={teamList.isPending}
      hasTeams={!!teamList.data?.length}
      selectedTeam={selectedTeam}
      onContinue={handleContinue}
    >
      {teamList.isPending ? (
        <TeamPickerSkeleton />
      ) : teamList.isError ? (
        <ErrorMessage message={teamList.error.message} />
      ) : !teamList.data.length ? (
        <EmptyTeamPickerState />
      ) : (
        <TeamPickerContent
          teams={teamList.data}
          selectedTeam={selectedTeam}
          onSelectTeam={setSelectedTeam}
        />
      )}
    </TeamPickerLayout>
  );
}

const EmptyTeamPickerState: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-4 text-center">
      <div className="rounded-full bg-primary/10 p-6 mb-4">
        <UsersIcon className="h-12 w-12 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No teams yet</h3>
      <p className="text-muted-foreground max-w-md">
        Start by creating your first team. Once created, it will appear here for
        you to manage.
      </p>
    </div>
  );
};

const TeamPickerSkeleton = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <Skeleton key={index} className="flex rounded-lg border p-4 h-32" />
  ));
};

const TeamPickerContent: React.FC<{
  teams: NonNullable<TeamsListQuery>;
  selectedTeam: TeamQuery | null;
  onSelectTeam: (team: TeamQuery) => void;
}> = ({ teams, selectedTeam, onSelectTeam }) => {
  return teams.map((team) => (
    <div
      key={team.id}
      className={cn(
        'flex rounded-lg border p-4 cursor-pointer transition-all duration-200',
        selectedTeam?.id === team.id
          ? 'border-primary bg-accent'
          : 'hover:bg-muted'
      )}
      onClick={() => onSelectTeam(team)}
    >
      <div className="flex-shrink-0 mr-4">
        <div className="relative h-20 w-20 rounded-md overflow-hidden border">
          <Image
            src={team.logo || '/placeholder.svg'}
            alt={team.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium truncate">{team.name}</h3>
          {selectedTeam?.id === team.id && (
            <Check className="h-5 w-5 text-primary flex-shrink-0" />
          )}
        </div>
        <p className="text-sm text-muted-foreground italic truncate">
          charity.games/{team.id}
        </p>

        <div className="flex items-center gap-3 mt-4">
          <div
            className="flex items-center text-xs text-muted-foreground"
            title="Team Size"
          >
            <UsersIcon className="h-3.5 w-3.5 mr-1" />
            <span>{team.members}</span>
          </div>
          <div
            className="flex items-center text-xs text-muted-foreground"
            title="Released Games"
          >
            <GamepadIcon className="h-3.5 w-3.5 mr-1" />
            <span>{team.games}</span>
          </div>
        </div>
      </div>
    </div>
  ));
};

const TeamPickerLayout: React.FC<{
  isPending: boolean;
  hasTeams: boolean;
  selectedTeam: TeamQuery | null;
  children: React.ReactNode;
  onContinue: () => void;
}> = ({ isPending, hasTeams, children, selectedTeam, onContinue }) => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm p-0 sm:p-4">
      <Card className="w-full h-full sm:h-auto sm:max-w-md sm:max-h-[90vh] flex flex-col rounded-none sm:rounded-lg">
        <CardHeader className="border-b sticky top-0 z-10 bg-card">
          <div className="flex items-center justify-between">
            <CardTitle>Select Team</CardTitle>
            <CodeIcon className="h-5 w-5 text-muted-foreground" />
          </div>
          <CardDescription>
            Select a team to manage its games and settings.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto p-4">
          <div className="space-y-4">{children}</div>
        </CardContent>

        <CardFooter className="border-t p-4 sticky bottom-0 z-10 bg-card">
          {isPending ? (
            <Skeleton className="h-10 w-full" />
          ) : !hasTeams ? (
            <Button
              className="w-full"
              onClick={() => router.push(devRoutes.teams.create.path())}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Create a Team
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={onContinue}
              disabled={!selectedTeam}
            >
              <Globe className="h-4 w-4 mr-2" />
              {selectedTeam
                ? `Continue as ${selectedTeam.name}`
                : 'Select a Team'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
