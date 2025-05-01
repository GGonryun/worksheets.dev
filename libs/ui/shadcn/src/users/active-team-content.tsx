import { TeamMembersListQuery, TeamMembersReadQuery } from '../types';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useState } from 'react';
import { RemoveMemberDialog } from './remove-member-dialog';
import { TeamMemberRole } from '@prisma/client';
import { Badge } from '../ui/badge';
import { cn } from '../utils';
import { ADMIN_ROLES, MEMBER_LABELS } from '@worksheets/util/types';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { devRoutes } from '@worksheets/routes';
import Link from 'next/link';
import { OwnerChangeDialog } from './owner-change-dialog';
import { useToast } from '../hooks';
import { trpc } from '@worksheets/trpc-charity';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { useRouter } from 'next/router';

export const ActiveTeamContent: React.FC<{
  members: NonNullable<TeamMembersListQuery>;
  user: NonNullable<TeamMembersReadQuery>;
}> = ({ members, user }) => {
  const { toast } = useToast();
  const router = useRouter();

  const utils = trpc.useUtils();
  const removeMember = trpc.user.teams.members.delete.useMutation();
  const leaveTeam = trpc.user.teams.members.leave.useMutation();
  const updateMember = trpc.user.teams.members.update.useMutation();
  const transferOwnership = trpc.user.teams.members.transfer.useMutation();

  const [pendingRemoval, setPendingRemoval] =
    useState<TeamMembersReadQuery>(undefined);
  const [pendingOwnerChange, setPendingOwnerChange] =
    useState<TeamMembersReadQuery>(undefined);

  const initiateRemoveMember = (
    memberToRemove: NonNullable<TeamMembersReadQuery>
  ) => {
    // If trying to remove an owner and current user is not an owner, prevent it
    if (memberToRemove.role === 'OWNER') {
      toast({
        title: 'Cannot remove owner',
        description: 'You must change the owner before removing them.',
        variant: 'destructive',
      });
      return;
    }

    setPendingRemoval(memberToRemove);
  };

  const handleRemoveMemberConfirm = async () => {
    if (!pendingRemoval) return;
    try {
      if (pendingRemoval.userId === user.userId) {
        await leaveTeam.mutateAsync();
        toast({
          title: 'You have left the team',
          description: 'You have successfully left the team.',
        });
        router.push(devRoutes.teams.select.path());
      } else {
        await removeMember.mutateAsync({
          userId: pendingRemoval.userId,
        });
        await utils.user.teams.members.list.invalidate();
        toast({
          title: 'Member removed',
          description: `${pendingRemoval.user.username} has been removed from the team.`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error removing member',
        description: parseTRPCClientErrorMessage(error),
        variant: 'destructive',
      });
    }
    setPendingRemoval(undefined);
  };

  const handleRemoveMemberCancel = () => {
    setPendingRemoval(undefined);
  };

  // Update the handleRoleChange function to include owner role validation
  const handleRoleChange = async (
    member: NonNullable<TeamMembersReadQuery>,
    newRole: TeamMemberRole
  ) => {
    // If changing to owner, check if there's already an owner
    if (newRole === 'OWNER' && user.role === 'OWNER') {
      return setPendingOwnerChange(member);
    }

    try {
      await updateMember.mutateAsync({
        userId: member.userId,
        role: newRole,
      });
      await utils.user.teams.members.invalidate();
      toast({
        title: 'Member role updated',
        description: `${member.user.username} is now a ${MEMBER_LABELS[newRole]}.`,
      });
    } catch (error) {
      toast({
        title: 'Failed to update member role',
        description: parseTRPCClientErrorMessage(error),
        variant: 'destructive',
      });
    }
  };

  // Add functions to handle owner change confirmation
  const handleOwnerChangeConfirm = async () => {
    if (!pendingOwnerChange) return;

    try {
      await transferOwnership.mutateAsync({
        userId: pendingOwnerChange.userId,
      });
      await utils.user.teams.members.invalidate();
      toast({
        title: 'Ownership transferred',
        description: `${pendingOwnerChange.user.username} is now the owner.`,
      });
    } catch (error) {
      toast({
        title: 'Failed to transfer ownership',
        description: parseTRPCClientErrorMessage(error),
        variant: 'destructive',
      });
    } finally {
      setPendingOwnerChange(undefined);
    }
  };

  const handleOwnerChangeCancel = () => {
    setPendingOwnerChange(undefined);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Active Team Members</CardTitle>
          <CardDescription>
            Manage your active team members and their roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No active members found
            </div>
          ) : (
            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.user.email}
                  className={cn(
                    'flex items-center justify-between p-4 border rounded-lg',
                    member.userId === user.userId &&
                      'bg-blue-50 border-blue-200'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={'/avatars/placeholder.jpg'}
                        alt={member.user.email}
                      />
                      <AvatarFallback>
                        {member.user.email.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">
                          {member.user.username}
                        </div>
                        {member.userId === user.userId && (
                          <Badge className="bg-blue-500 text-white text-xs px-2 hover:bg-blue-600 rounded-sm">
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {member.user.email}
                      </div>
                    </div>
                  </div>
                  {ADMIN_ROLES.includes(user.role) ? (
                    <SimpleAdminActions
                      onRoleChange={(role) => {
                        handleRoleChange(member, role);
                      }}
                      onRemoveMember={() => {
                        initiateRemoveMember(member);
                      }}
                      user={user}
                      member={member}
                    />
                  ) : (
                    <StandardActions
                      member={member}
                      user={user}
                      onRemoveMember={() => {
                        initiateRemoveMember(member);
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <RemoveMemberDialog
        onOpenChange={(open) => {
          if (!open) setPendingRemoval(undefined);
        }}
        onConfirm={handleRemoveMemberConfirm}
        onCancel={handleRemoveMemberCancel}
        member={pendingRemoval}
        user={user}
      />
      <OwnerChangeDialog
        onOpenChange={(open) => {
          if (!open) setPendingOwnerChange(undefined);
        }}
        onConfirm={handleOwnerChangeConfirm}
        onCancel={handleOwnerChangeCancel}
        member={pendingOwnerChange}
      />
    </>
  );
};

const StandardActions: React.FC<{
  member: NonNullable<TeamMembersListQuery>[number];
  user: NonNullable<TeamMembersReadQuery>;
  onRemoveMember: () => void;
}> = ({ member, user, onRemoveMember }) => {
  return (
    <div className="flex items-center gap-4">
      {member.userId === user.userId && (
        <Button variant="ghost" size="sm" onClick={onRemoveMember}>
          Leave
        </Button>
      )}
      <Badge
        variant="secondary"
        className={cn(
          'text-xs text-white',
          member.role === 'OWNER' && 'bg-yellow-500 hover:bg-yellow-600',
          member.role === 'MANAGER' && 'bg-blue-500 hover:bg-blue-600',
          member.role === 'MEMBER' && 'bg-gray-500 hover:bg-gray-600'
        )}
      >
        {MEMBER_LABELS[member.role]}
      </Badge>
    </div>
  );
};

const SimpleAdminActions: React.FC<{
  onRemoveMember: () => void;
  onRoleChange: (role: TeamMemberRole) => void;
  member: NonNullable<TeamMembersListQuery>[number];
  user: NonNullable<TeamMembersReadQuery>;
}> = ({ member, user, onRemoveMember, onRoleChange }) => {
  return (
    <div className="flex items-center gap-4">
      <Select
        defaultValue={member.role}
        value={member.role}
        onValueChange={(value) => onRoleChange(value as TeamMemberRole)}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="OWNER">Owner</SelectItem>
          <SelectItem value="MANAGER">Manager</SelectItem>
          <SelectItem value="MEMBER">Member</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="ghost" size="sm" onClick={onRemoveMember}>
        Remove
      </Button>
    </div>
  );
};

const AdminActions: React.FC<{
  onRemoveMember: () => void;
  onRoleChange: (role: TeamMemberRole) => void;
  member: NonNullable<TeamMembersListQuery>[number];
  user: NonNullable<TeamMembersReadQuery>;
}> = ({ member, user, onRemoveMember, onRoleChange }) => {
  const userIsOwner = user.role === 'OWNER';
  const memberIsUser = member.user.email === user.user.email;
  const canChangeOwnerSettings = member.role !== 'OWNER' || userIsOwner;
  const showOwnerRemoveSelfWarning = userIsOwner && memberIsUser;

  return (
    <div className="flex items-center gap-4">
      <Tooltip>
        <TooltipTrigger>
          <Select
            defaultValue={member.role}
            onValueChange={(value) => onRoleChange(value as TeamMemberRole)}
            disabled={!canChangeOwnerSettings}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="OWNER">Owner</SelectItem>
              <SelectItem value="MANAGER">Manager</SelectItem>
              <SelectItem value="MEMBER">Member</SelectItem>
            </SelectContent>
          </Select>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={canChangeOwnerSettings}
        >
          <OwnerChangeWarning />
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemoveMember}
            disabled={showOwnerRemoveSelfWarning || !canChangeOwnerSettings}
          >
            Remove
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          className="w-64"
          hidden={!showOwnerRemoveSelfWarning && canChangeOwnerSettings}
        >
          {showOwnerRemoveSelfWarning ? (
            <OwnerRemovalWarning />
          ) : (
            <OwnerChangeWarning />
          )}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

const OwnerChangeWarning: React.FC = () => {
  return (
    <p className="text-xs text-red-500">
      <strong>Warning:</strong> Only the owner can change their role
    </p>
  );
};

const OwnerRemovalWarning: React.FC = () => {
  return (
    <p className="text-xs text-red-500">
      <strong>Warning:</strong> Relinquish ownership to remove yourself from the
      team. If you are the last member, you can delete the team from the{' '}
      <Link href={devRoutes.dashboard.settings.sensitive.path()}>
        team settings page
      </Link>
      .
    </p>
  );
};
