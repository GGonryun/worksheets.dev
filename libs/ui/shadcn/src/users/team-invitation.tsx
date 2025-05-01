'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, Loader2, X } from 'lucide-react';
import { devRoutes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '../errors';
import { Skeleton } from '../ui';
import { TeamInvitationsReadQuery } from '../types';

export const TeamInvitation = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const invitation = trpc.user.teams.invitations.read.useQuery(
    {
      slug,
    },
    {
      enabled: !!slug,
      retry: false,
    }
  );

  if (invitation.isPending) {
    return <TeamInvitationSkeleton />;
  }

  if (invitation.isError) {
    return (
      <TeamInvitationLayout>
        <ErrorScreen
          title={'Invalid Invitation'}
          message={invitation.error.message}
        />
      </TeamInvitationLayout>
    );
  }

  return <TeamInvitationContent invitation={invitation.data} />;
};

const TeamInvitationLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {children}
    </div>
  );
};

const TeamInvitationSkeleton = () => {
  return (
    <TeamInvitationLayout>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Team Invitation</CardTitle>
          <CardDescription>
            <Skeleton className="h-6 w-72" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-6 w-32" />
          <div className="flex justify-between">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
    </TeamInvitationLayout>
  );
};

const TeamInvitationContent: React.FC<{
  invitation: NonNullable<TeamInvitationsReadQuery>;
}> = ({ invitation }) => {
  const router = useRouter();
  const acceptInvite = trpc.user.teams.invitations.accept.useMutation();
  const rejectInvite = trpc.user.teams.invitations.reject.useMutation();

  const [status, setStatus] = useState<'pending' | 'accepted' | 'rejected'>(
    'pending'
  );
  const handleAccept = async () => {
    try {
      await acceptInvite.mutateAsync({
        teamId: invitation.team.id,
      });
      setStatus('accepted');
      setTimeout(() => {
        router.push(devRoutes.teams.select.path());
      }, 2000);
    } catch (error) {}
  };

  const handleReject = () => {
    // In a real app, you would call your API to reject the invitation
    setStatus('rejected');
  };

  return (
    <TeamInvitationLayout>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Team Invitation</CardTitle>
          <CardDescription>
            {invitation.invitedBy.username} is inviting you to join{' '}
            {invitation.team.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'pending' ? (
            <>
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Team:</span>
                    <span className="text-sm">{invitation.team.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Invited by:</span>
                    <span className="text-sm">
                      {invitation.invitedBy.username}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Role:</span>
                    <Badge variant="outline" className="capitalize">
                      {invitation.role}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>
                  By accepting this invitation, you will join the team as a{' '}
                  <span className="font-medium">{invitation.role}</span>.
                </p>
                {invitation.role === 'MANAGER' && (
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>You can manage team members and games</li>
                    <li>You can invite new members to the team</li>
                    <li>You cannot remove the team owner</li>
                  </ul>
                )}
                {invitation.role === 'MEMBER' && (
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>You can view games and information</li>
                    <li>You cannot edit or upload new games</li>
                    <li>You cannot invite or manage team members</li>
                  </ul>
                )}
              </div>
            </>
          ) : status === 'accepted' ? (
            <div className="py-6 text-center space-y-2">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <p className="font-medium text-green-600">Invitation Accepted!</p>
              <p className="text-sm text-muted-foreground">
                Redirecting you to the team dashboard...
              </p>
            </div>
          ) : (
            <div className="py-6 text-center space-y-2">
              <X className="h-12 w-12 text-red-500 mx-auto" />
              <p className="font-medium text-red-600">Invitation Rejected</p>
              <p className="text-sm text-muted-foreground">
                You have declined this team invitation.
              </p>
            </div>
          )}
        </CardContent>
        {status === 'pending' && (
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleReject}
              disabled={rejectInvite.isPending || acceptInvite.isPending}
            >
              {rejectInvite.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {rejectInvite.isPending ? 'Declining...' : 'Decline'}
            </Button>
            <Button onClick={handleAccept} disabled={acceptInvite.isPending}>
              {acceptInvite.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {acceptInvite.isPending ? 'Accepting...' : 'Accept Invitation'}
            </Button>
          </CardFooter>
        )}
        {status === 'rejected' && (
          <CardFooter className="justify-center">
            <Button variant="outline" onClick={() => router.push('/')}>
              Return to Home
            </Button>
          </CardFooter>
        )}
      </Card>
    </TeamInvitationLayout>
  );
};
