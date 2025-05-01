'use client';

import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { InviteTeamMemberDialog } from './invite-team-member-dialog';
import { RoleInfoDialog } from './role-info-dialog';
import { AlertCircle, HelpCircle, UserPlus } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { trpc } from '@worksheets/trpc-charity';
import {
  TeamMembersReadQuery,
  TeamMembersListQuery,
  TeamInvitationsListQuery,
  TeamSelectedQuery,
} from '../types';
import { MAX_TEAM_MEMBERS } from '@worksheets/util/settings';
import { ErrorScreen } from '../errors';
import { ActiveTeamContent } from './active-team-content';
import Link from 'next/link';
import { devRoutes } from '@worksheets/routes';
import { PendingTeamContent } from './pending-team-content';

export const TeamManagement: React.FC<{ activeTab: 'active' | 'pending' }> = ({
  activeTab,
}) => {
  const members = trpc.user.teams.members.list.useQuery();
  const invitations = trpc.user.teams.invitations.list.useQuery();
  const user = trpc.user.teams.members.read.useQuery();
  const team = trpc.user.teams.selected.useQuery();

  if (
    members.isPending ||
    user.isPending ||
    team.isPending ||
    invitations.isPending
  ) {
    return <TeamManagementSkeleton />;
  }

  if (members.isError || user.isError || team.isError || invitations.isError) {
    return (
      <ErrorScreen
        message={
          members.error?.message ??
          user.error?.message ??
          team.error?.message ??
          invitations.error?.message
        }
      />
    );
  }

  return (
    <TeamManagementContent
      activeTab={activeTab}
      members={members.data}
      invitations={invitations.data}
      user={user.data}
      team={team.data}
    />
  );
};

const TeamManagementSkeleton = () => {
  return <div>Loading...</div>;
};

const TeamManagementContent: React.FC<{
  members: NonNullable<TeamMembersListQuery>;
  user: NonNullable<TeamMembersReadQuery>;
  invitations: NonNullable<TeamInvitationsListQuery>;
  team: NonNullable<TeamSelectedQuery>;
  activeTab: 'active' | 'pending';
}> = ({ members, invitations, user, team, activeTab }) => {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isRoleInfoDialogOpen, setIsRoleInfoDialogOpen] = useState(false);

  return (
    <div className="container space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Team Members</h2>
          <p className="text-muted-foreground">
            Manage your team members and their access levels
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setIsRoleInfoDialogOpen(true)}
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            Role Information
          </Button>
          <Button
            onClick={() => setIsInviteDialogOpen(true)}
            disabled={members.length >= MAX_TEAM_MEMBERS}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
        <div className="text-sm">
          <span className="font-medium">{members.length}</span> of{' '}
          <span className="font-medium">{MAX_TEAM_MEMBERS}</span> team members
        </div>
        {members.length >= MAX_TEAM_MEMBERS && (
          <Badge variant="destructive">Team limit reached</Badge>
        )}
      </div>

      <Tabs value={activeTab} className="w-full">
        <TabsList>
          <TabsTrigger value="active" asChild>
            <Link href={devRoutes.dashboard.users.active.path()}>
              Active Members ({members.length})
            </Link>
          </TabsTrigger>
          <TabsTrigger value="pending" asChild>
            <Link href={devRoutes.dashboard.users.pending.path()}>
              Pending Members ({invitations.length})
            </Link>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <ActiveTeamContent members={members} user={user} />
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <PendingTeamContent invitations={invitations} team={team} />
        </TabsContent>
      </Tabs>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Team Member Limit</AlertTitle>
        <AlertDescription>
          Your team can have a maximum of 10 members. You currently have{' '}
          {members.length} members.
        </AlertDescription>
      </Alert>

      <InviteTeamMemberDialog
        open={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        team={team}
        members={members}
      />

      <RoleInfoDialog
        open={isRoleInfoDialogOpen}
        onOpenChange={setIsRoleInfoDialogOpen}
      />
    </div>
  );
};
