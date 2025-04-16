'use client';

import { useState } from 'react';
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
import { CheckCircle, X } from 'lucide-react';
import { devRoutes } from '@worksheets/routes';

export const TeamInvitation = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [status, setStatus] = useState<'pending' | 'accepted' | 'rejected'>(
    'pending'
  );

  // In a real app, you would fetch the invitation details from your API
  // This is mock data for demonstration
  const invitation = {
    id,
    teamName: 'Charity Games',
    inviterName: 'Alex Johnson',
    role: 'manager',
    email: 'user@example.com',
  };

  const handleAccept = () => {
    // In a real app, you would call your API to accept the invitation
    setStatus('accepted');
    // Redirect after a short delay
    setTimeout(() => {
      router.push(devRoutes.dashboard.path());
    }, 2000);
  };

  const handleReject = () => {
    // In a real app, you would call your API to reject the invitation
    setStatus('rejected');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Team Invitation</CardTitle>
          <CardDescription>
            {invitation.inviterName} is inviting you to join{' '}
            {invitation.teamName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'pending' ? (
            <>
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Team:</span>
                    <span className="text-sm">{invitation.teamName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Invited by:</span>
                    <span className="text-sm">{invitation.inviterName}</span>
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
                {invitation.role === 'manager' && (
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>You can manage team members and games</li>
                    <li>You can invite new members to the team</li>
                    <li>You cannot remove the team owner</li>
                  </ul>
                )}
                {invitation.role === 'member' && (
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
            <Button variant="outline" onClick={handleReject}>
              Decline
            </Button>
            <Button onClick={handleAccept}>Accept Invitation</Button>
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
    </div>
  );
};
