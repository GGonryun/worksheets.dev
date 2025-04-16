'use client';

import * as React from 'react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar';
import { ContainImage } from '@worksheets/ui/components/images';
import Link from 'next/link';
import { devRoutes } from '@worksheets/routes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Skeleton,
} from '../ui';

import { TeamQuery } from '../types';
import { ChevronsUpDown, Plus } from 'lucide-react';
import { cn } from '../utils';
import { useActiveTeam } from '../hooks/use-active-team';
import { trpc } from '@worksheets/trpc-charity';
import { useRouter } from 'next/router';

export const TeamSwitcher: React.FC = () => {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState<TeamQuery | null>(null);
  const [savedTeam, setSavedTeam, loadingSavedTeam] = useActiveTeam();

  const teamList = trpc.user.teams.list.useQuery(undefined, {
    enabled: true,
    retry: false,
  });

  React.useEffect(() => {
    if (teamList.isPending || teamList.isError || loadingSavedTeam || !teamList)
      return;

    const teams = teamList.data;
    if (!teams.length) {
      router.push(devRoutes.dashboard.onboarding.path());
      return;
    }
    if (!savedTeam) {
      router.push(devRoutes.dashboard.teamSelect.path());
      return;
    }

    const team = teams.find((team) => team.id === savedTeam);
    if (!team) {
      router.push(devRoutes.dashboard.teamSelect.path());
      return;
    }

    setActiveTeam(team);
    return;
  }, [
    teamList.isPending,
    teamList.isError,
    teamList.data,
    savedTeam,
    loadingSavedTeam,
  ]);

  const handleChangeTeam = (team: TeamQuery) => {
    setActiveTeam(team);
    setSavedTeam(team.id);
  };

  if (!activeTeam) return <TeamSwitcherSkeleton />;

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                asChild
              >
                <Link href={devRoutes.dashboard.path()}>
                  <div className="flex items-center justify-center text-sidebar-primary-foreground">
                    <div className="relative overflow-hidden size-8 aspect-square rounded-lg">
                      <ContainImage
                        src={activeTeam.logo}
                        alt={`${activeTeam.name} logo`}
                      />
                    </div>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {activeTeam.name}
                    </span>
                    <span className="truncate text-xs">Public Team</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </Link>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? 'bottom' : 'right'}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Teams
              </DropdownMenuLabel>
              {teamList.data?.map((team) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => handleChangeTeam(team)}
                  className={cn('gap-2 p-2')}
                >
                  <div className="relative overflow-hidden flex size-6 min-h-6 min-w-6 items-center justify-center rounded-sm border">
                    <ContainImage src={team.logo} alt={`${team.name} logo`} />
                  </div>
                  <div className="truncate">{team.name}</div>
                  <DropdownMenuShortcut>
                    {team.slug === activeTeam.slug && '✓'}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2" asChild>
                <Link href={devRoutes.dashboard.onboarding.path()}>
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Add team
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
};

const TeamSwitcherSkeleton = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          asChild
        >
          <Skeleton className="h-12 w-full" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
