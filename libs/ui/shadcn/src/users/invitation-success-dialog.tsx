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

interface InvitationSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  role: string;
  teamName: string;
}

export function InvitationSuccessDialog({
  open,
  onOpenChange,
  email,
  role,
  teamName,
}: InvitationSuccessDialogProps) {
  const { toast } = useToast();
  // Generate a fake invitation link with a unique ID
  const invitationId = `inv_${Math.random().toString(36).substring(2, 10)}`;
  const invitationLink = devRoutes.dashboard.invitations.url({
    params: { invitationId: invitationId },
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
          title: `Join ${teamName} Team`,
          text: `You've been invited to join ${teamName} as a ${role}`,
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
            An invitation has been sent to {email} to join your team as a {role}
            .
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
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
