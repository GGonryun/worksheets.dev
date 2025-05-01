'use client';
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
import { CheckCircle2, Copy, Share2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { devRoutes } from '@worksheets/routes';
import { TeamInvitationsReadQuery, TeamSelectedQuery } from '../types';
import { TeamMemberRole } from '@prisma/client';
import { MEMBER_LABELS } from '@worksheets/util/types';

interface InvitationSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invite: TeamInvitationsReadQuery;
  team: NonNullable<TeamSelectedQuery>;
}

export function InvitationSuccessDialog({
  open,
  onOpenChange,
  invite,
  team,
}: InvitationSuccessDialogProps) {
  const { toast } = useToast();
  // Generate a fake invitation link with a unique ID
  const invitationLink = devRoutes.teams.join.url({
    params: { slug: invite?.team.slug ?? '' },
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationLink);
    toast({
      title: 'Link copied!',
      description: 'Invitation link has been copied to clipboard',
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join ${team.name} Team`,
          text: `You've been invited to join ${team.name} as a ${
            MEMBER_LABELS[invite?.role ?? 'MEMBER']
          }`,
          url: invitationLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            Invitation Sent!
          </DialogTitle>
          <DialogDescription>
            An invitation has been sent to {invite?.email ?? '...'} to join your
            team as a <strong>{MEMBER_LABELS[invite?.role ?? 'MEMBER']}</strong>
            .
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-md bg-green-50 p-4 text-green-800">
            <p className="text-sm">
              You can also share this invitation link directly with the user.
              They can use this link to accept the invitation.
            </p>
          </div>

          <div className="flex space-x-2">
            <Input value={invitationLink} readOnly className="flex-1" />
            <Button variant="outline" size="icon" onClick={handleCopyLink}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
