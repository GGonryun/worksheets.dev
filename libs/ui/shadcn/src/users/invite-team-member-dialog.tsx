'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { MAX_TEAM_MEMBERS } from '@worksheets/util/settings';
import { InvitationSuccessDialog } from './invitation-success-dialog';
import {
  TeamSelectedQuery,
  TeamMembersListQuery,
  TeamInvitationsReadQuery,
} from '../types';
import { trpc } from '@worksheets/trpc-charity';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { TeamMemberRole } from '@prisma/client';
import { AlertTitle } from '@mui/material';

interface InviteTeamMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team: NonNullable<TeamSelectedQuery>;
  members: NonNullable<TeamMembersListQuery>;
}

export function InviteTeamMemberDialog({
  open,
  onOpenChange,
  team,
  members,
}: InviteTeamMemberDialogProps) {
  const utils = trpc.useUtils();
  const createInvitation = trpc.user.teams.invitations.create.useMutation();

  const [role, setRole] = useState<TeamMemberRole>('MEMBER');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [invite, setInvite] = useState<TeamInvitationsReadQuery>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter an email address');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    if (members.length >= MAX_TEAM_MEMBERS) {
      setError('Team member limit reached');
      return;
    }

    try {
      const invite = await createInvitation.mutateAsync({
        email,
        role,
      });
      await utils.user.teams.invitations.list.invalidate();
      onOpenChange(false);
      setInvite(invite);
      setEmail('');
      setRole('MEMBER');
      setError('');
    } catch (error) {
      setError(parseTRPCClientErrorMessage(error));
      return;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation to add a new member to your team.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {members.length >= MAX_TEAM_MEMBERS && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You've reached the maximum team size of {MAX_TEAM_MEMBERS}{' '}
                    members.
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Failed to invite team member</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={members.length >= MAX_TEAM_MEMBERS}
                />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                {/* Update the RadioGroup to include the manager role and update the labels */}
                <RadioGroup
                  value={role}
                  onValueChange={(v) => setRole(v as TeamMemberRole)}
                >
                  <div className="flex items-start space-x-2 rounded-md border p-3">
                    <RadioGroupItem
                      value="OWNER"
                      id="OWNER"
                      disabled={members.length > 0}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="OWNER" className="font-medium">
                        Owner
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Has full control over the team. There can only be one
                        owner per team.
                      </p>
                      {members.length > 0 && (
                        <p className="text-xs text-amber-600 mt-1">
                          A team can only have one owner. You cannot invite a
                          new owner.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="MANAGER" id="MANAGER" />
                    <div className="space-y-1">
                      <Label htmlFor="MANAGER" className="font-medium">
                        Manager
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Can manage team members and games, but cannot remove the
                        owner.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="MEMBER" id="MEMBER" />
                    <div className="space-y-1">
                      <Label htmlFor="MEMBER" className="font-medium">
                        Member
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Can only view games and information about games. Cannot
                        edit or upload new games.
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  members.length >= MAX_TEAM_MEMBERS ||
                  createInvitation.isPending
                }
              >
                {createInvitation.isPending && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {createInvitation.isPending ? 'Sending...' : 'Send Invitation'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <InvitationSuccessDialog
        open={!!invite}
        onOpenChange={(open) => {
          if (!open) setInvite(undefined);
        }}
        invite={invite}
        team={team}
      />
    </>
  );
}
