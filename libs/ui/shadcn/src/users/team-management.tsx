'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { InviteTeamMemberDialog } from './invite-team-member-dialog';
import { RoleInfoDialog } from './role-info-dialog';
import { OwnerChangeDialog } from './owner-change-dialog';
import { RemoveMemberDialog } from './remove-member-dialog';
import { InvitationSuccessDialog } from './invitation-success-dialog';
import { AlertCircle, HelpCircle, UserPlus } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

// Mock data - replace with actual data fetching
const mockTeamMembers = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'owner',
    avatarUrl: '/placeholder.svg?height=40&width=40',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jamie Smith',
    email: 'jamie@example.com',
    role: 'manager',
    avatarUrl: '/placeholder.svg?height=40&width=40',
    status: 'active',
  },
  {
    id: '3',
    name: 'Taylor Wilson',
    email: 'taylor@example.com',
    role: 'member',
    avatarUrl: '/placeholder.svg?height=40&width=40',
    status: 'active',
  },
  {
    id: '4',
    name: 'Casey Brown',
    email: 'casey@example.com',
    role: 'member',
    avatarUrl: '/placeholder.svg?height=40&width=40',
    status: 'pending',
  },
];

export function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isRoleInfoDialogOpen, setIsRoleInfoDialogOpen] = useState(false);
  const [isOwnerChangeDialogOpen, setIsOwnerChangeDialogOpen] = useState(false);
  const [isRemoveMemberDialogOpen, setIsRemoveMemberDialogOpen] =
    useState(false);
  const [isInvitationSuccessDialogOpen, setIsInvitationSuccessDialogOpen] =
    useState(false);
  const [pendingOwnerChange, setPendingOwnerChange] = useState<{
    memberId: string;
    memberName: string;
  } | null>(null);
  const [pendingRemoval, setPendingRemoval] = useState<{
    memberId: string;
    memberName: string;
    isPending: boolean;
  } | null>(null);
  const [lastInvitation, setLastInvitation] = useState<{
    email: string;
    role: string;
  } | null>(null);

  const activeMembers = teamMembers.filter(
    (member) => member.status === 'active'
  );
  const pendingInvites = teamMembers.filter(
    (member) => member.status === 'pending'
  );
  const memberCount = teamMembers.length;
  const memberLimit = 10;

  // Add a function to check if a role change is allowed
  const canChangeRole = (currentMember: any, targetRole: string) => {
    // If trying to set someone as owner
    if (targetRole === 'owner') {
      // Check if there's already an owner (excluding the current member)
      const existingOwner = teamMembers.find(
        (m) => m.role === 'owner' && m.id !== currentMember.id
      );
      return !existingOwner;
    }
    return true;
  };

  // Update the handleRoleChange function to include owner role validation
  const handleRoleChange = (memberId: string, newRole: string) => {
    const member = teamMembers.find((m) => m.id === memberId);
    if (!member) return;

    // If changing to owner, check if there's already an owner
    if (newRole === 'owner') {
      const existingOwner = teamMembers.find(
        (m) => m.role === 'owner' && m.id !== memberId
      );
      if (existingOwner) {
        // Show the owner change dialog
        setPendingOwnerChange({ memberId, memberName: member.name });
        setIsOwnerChangeDialogOpen(true);
        return;
      }
    }

    setTeamMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
    );
  };

  // Add functions to handle owner change confirmation
  const handleOwnerChangeConfirm = () => {
    if (!pendingOwnerChange) return;

    // Find the current owner
    const currentOwner = teamMembers.find((m) => m.role === 'owner');

    // Update roles
    setTeamMembers((prev) =>
      prev.map((m) => {
        if (m.id === pendingOwnerChange.memberId) {
          return { ...m, role: 'owner' };
        } else if (m.id === currentOwner?.id) {
          return { ...m, role: 'manager' };
        }
        return m;
      })
    );

    // Close dialog and reset state
    setIsOwnerChangeDialogOpen(false);
    setPendingOwnerChange(null);
  };

  const handleOwnerChangeCancel = () => {
    setIsOwnerChangeDialogOpen(false);
    setPendingOwnerChange(null);
  };

  // Update to show removal confirmation dialog
  const initiateRemoveMember = (memberId: string) => {
    const memberToRemove = teamMembers.find((m) => m.id === memberId);
    if (!memberToRemove) return;

    const currentUser = teamMembers.find((m) => m.id === '1'); // Assuming user 1 is the current user for demo

    // If trying to remove an owner and current user is not an owner, prevent it
    if (memberToRemove.role === 'owner' && currentUser?.role !== 'owner') {
      alert('Only the owner can remove another owner');
      return;
    }

    setPendingRemoval({
      memberId,
      memberName: memberToRemove.name || memberToRemove.email,
      isPending: memberToRemove.status === 'pending',
    });
    setIsRemoveMemberDialogOpen(true);
  };

  const handleRemoveMemberConfirm = () => {
    if (!pendingRemoval) return;

    setTeamMembers((prev) =>
      prev.filter((member) => member.id !== pendingRemoval.memberId)
    );
    setIsRemoveMemberDialogOpen(false);
    setPendingRemoval(null);
  };

  const handleRemoveMemberCancel = () => {
    setIsRemoveMemberDialogOpen(false);
    setPendingRemoval(null);
  };

  const handleInviteMember = (email: string, role: string) => {
    if (memberCount >= memberLimit) return;

    const newMember = {
      id: `new-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role,
      avatarUrl: '/placeholder.svg?height=40&width=40',
      status: 'pending',
    };

    setTeamMembers((prev) => [...prev, newMember]);
    setIsInviteDialogOpen(false);

    // Set the last invitation and show success dialog
    setLastInvitation({ email, role });
    setIsInvitationSuccessDialogOpen(true);
  };

  return (
    <div className="space-y-6">
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
            disabled={memberCount >= memberLimit}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
        <div className="text-sm">
          <span className="font-medium">{memberCount}</span> of{' '}
          <span className="font-medium">{memberLimit}</span> team members
        </div>
        {memberCount >= memberLimit && (
          <Badge variant="destructive">Team limit reached</Badge>
        )}
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">
            Active Members ({activeMembers.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending Invites ({pendingInvites.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Team Members</CardTitle>
              <CardDescription>
                Manage your active team members and their roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeMembers.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No active members found
                </div>
              ) : (
                <div className="space-y-4">
                  {activeMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src={member.avatarUrl || '/placeholder.svg'}
                            alt={member.name}
                          />
                          <AvatarFallback>
                            {member.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {member.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Select
                          defaultValue={member.role}
                          onValueChange={(value) =>
                            handleRoleChange(member.id, value)
                          }
                          disabled={
                            member.role === 'owner' &&
                            teamMembers.find((m) => m.id === '1')?.role !==
                              'owner'
                          }
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="owner">Owner</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => initiateRemoveMember(member.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Invites</CardTitle>
              <CardDescription>
                Manage your pending team invitations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingInvites.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No pending invites
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingInvites.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src={member.avatarUrl || '/placeholder.svg'}
                            alt={member.name}
                          />
                          <AvatarFallback>
                            {member.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.email}</div>
                          <div className="text-sm text-muted-foreground">
                            <Badge variant="outline">Pending</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Select
                          defaultValue={member.role}
                          onValueChange={(value) =>
                            handleRoleChange(member.id, value)
                          }
                          disabled={
                            member.role === 'owner' &&
                            teamMembers.find((m) => m.id === '1')?.role !==
                              'owner'
                          }
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="owner">Owner</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => initiateRemoveMember(member.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Team Member Limit</AlertTitle>
        <AlertDescription>
          Your team can have a maximum of 10 members. You currently have{' '}
          {memberCount} members.
        </AlertDescription>
      </Alert>

      {/* Dialogs */}
      <InviteTeamMemberDialog
        open={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        onInvite={handleInviteMember}
        memberCount={memberCount}
        memberLimit={memberLimit}
      />

      <RoleInfoDialog
        open={isRoleInfoDialogOpen}
        onOpenChange={setIsRoleInfoDialogOpen}
      />

      <OwnerChangeDialog
        open={isOwnerChangeDialogOpen}
        onOpenChange={setIsOwnerChangeDialogOpen}
        onConfirm={handleOwnerChangeConfirm}
        onCancel={handleOwnerChangeCancel}
        newOwnerName={pendingOwnerChange?.memberName || ''}
      />

      <RemoveMemberDialog
        open={isRemoveMemberDialogOpen}
        onOpenChange={setIsRemoveMemberDialogOpen}
        onConfirm={handleRemoveMemberConfirm}
        onCancel={handleRemoveMemberCancel}
        memberName={pendingRemoval?.memberName || ''}
        isPending={pendingRemoval?.isPending || false}
      />

      <InvitationSuccessDialog
        open={isInvitationSuccessDialogOpen}
        onOpenChange={setIsInvitationSuccessDialogOpen}
        email={lastInvitation?.email || ''}
        role={lastInvitation?.role || ''}
        teamName="Charity Games"
      />
    </div>
  );
}
