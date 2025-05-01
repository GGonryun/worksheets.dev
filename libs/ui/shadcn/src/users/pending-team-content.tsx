import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  TeamInvitationsListQuery,
  TeamInvitationsReadQuery,
  TeamSelectedQuery,
} from '../types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { capitalizeFirstLetter } from '@worksheets/util/strings';
import { Button } from '../ui/button';
import { InvitationInfoDialog } from './invitation-info-dialog';

export const PendingTeamContent: React.FC<{
  team: NonNullable<TeamSelectedQuery>;
  invitations: NonNullable<TeamInvitationsListQuery>;
}> = ({ invitations, team }) => {
  const [invite, setInvite] =
    React.useState<TeamInvitationsReadQuery>(undefined);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pending Invites</CardTitle>
          <CardDescription>
            Manage your pending team invitations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {invitations.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No pending invites
            </div>
          ) : (
            <div className="space-y-4">
              {invitations.map((invite) => (
                <div
                  key={invite.email}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={'/avatars/placeholder.jpg'}
                        alt={invite.email}
                      />
                      <AvatarFallback>
                        {invite.email.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{invite.email}</div>
                      <div className="text-sm text-muted-foreground">
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">
                      {capitalizeFirstLetter(invite.role)}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setInvite(invite);
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <InvitationInfoDialog
        open={!!invite}
        onOpenChange={(open) => {
          if (!open) setInvite(undefined);
        }}
        invite={invite}
        team={team}
      />
    </>
  );
};
