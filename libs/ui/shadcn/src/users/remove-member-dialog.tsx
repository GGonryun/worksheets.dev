'use client';

import React from 'react';
import { TeamInvitationsReadQuery, TeamMembersReadQuery } from '../types';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export const RemoveMemberDialog: React.FC<
  {
    member: TeamMembersReadQuery;
    user: TeamMembersReadQuery;
  } & UserRemovalActions
> = ({ member, user, ...actions }) => {
  const name = member?.user?.username ?? member?.user.email ?? '';

  if (user?.userId === member?.userId) {
    return <LeaveTeamDialog open={!!member} {...actions} />;
  }

  return (
    <UserRemovalDialog
      title={`Remove ${name}`}
      description={`You are about to remove a member from your team.`}
      actionText={'Remove Member'}
      question={'Are you sure you want to proceed with this removal?'}
      open={!!member}
      {...actions}
      alert={
        <Alert className="rounded-md bg-amber-50 p-4 text-amber-800 mb-4 border-amber-500">
          <AlertTitle className="text-sm font-medium">
            Removing {name} member will:
          </AlertTitle>
          <AlertDescription className="text-sm">
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Immediately revoke their access to all team resources</li>
              <li>Remove them from all team projects</li>
              <li>Require a new invitation to rejoin the team</li>
            </ul>
          </AlertDescription>
        </Alert>
      }
    />
  );
};

export const LeaveTeamDialog: React.FC<
  {
    open: boolean;
  } & UserRemovalActions
> = ({ open, onOpenChange, onCancel, onConfirm }) => {
  return (
    <UserRemovalDialog
      title="Leave Team"
      description="You are about to leave your team."
      actionText="Leave Team"
      question="Are you sure you want to leave this team?"
      open={!!open}
      onOpenChange={onOpenChange}
      onCancel={onCancel}
      onConfirm={onConfirm}
      alert={
        <Alert className="rounded-md bg-amber-50 p-4 text-amber-800 mb-4">
          <AlertTitle className="text-sm font-medium">
            Leaving the team will:
          </AlertTitle>
          <AlertDescription className="text-sm">
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Revoke your access to all team resources</li>
              <li>Remove you from all team projects</li>
              <li>Require a new invitation to rejoin the team</li>
            </ul>
          </AlertDescription>
        </Alert>
      }
    />
  );
};

export const CancelInvitationDialog: React.FC<
  {
    invitation: TeamInvitationsReadQuery;
  } & UserRemovalActions
> = ({ invitation, onOpenChange, onCancel, onConfirm }) => {
  return (
    <UserRemovalDialog
      title="Cancel Invitation"
      description="You are about to cancel a pending invitation."
      actionText="Cancel Invitation"
      question={`Are you sure you want to cancel the invitation for ${
        invitation?.email ?? ''
      }?`}
      open={!!invitation}
      onOpenChange={onOpenChange}
      onCancel={onCancel}
      onConfirm={onConfirm}
      alert={
        <div className="rounded-md bg-amber-50 p-4 text-amber-800 mb-4">
          <p className="text-sm font-medium">
            Cancelling this invitation will:
          </p>
          <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
            <li>Revoke access to the team for this email</li>
            <li>Remove the pending invitation</li>
            <li>Require a new invitation to rejoin the team</li>
          </ul>
        </div>
      }
    />
  );
};

type UserRemovalActions = {
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

type UserRemovalProps = {
  title: string;
  description: string;
  actionText: string;
  question: string;
  open: boolean;
  alert?: React.ReactNode;
} & UserRemovalActions;

const UserRemovalDialog: React.FC<UserRemovalProps> = ({
  title,
  open,
  description,
  actionText,
  question,
  alert,
  onOpenChange,
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>
          {alert}
          <p className="text-sm text-muted-foreground">{question}</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {actionText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
