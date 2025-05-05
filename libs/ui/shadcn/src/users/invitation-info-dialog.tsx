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
import { AlertCircle, CheckCircle2, Copy, Share2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { devRoutes } from '@worksheets/routes';
import { TeamInvitationsReadQuery, TeamSelectedQuery } from '../types';
import { MEMBER_LABELS } from '@worksheets/util/types';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { trpc } from '@worksheets/trpc-charity';
import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { SECONDS } from '@worksheets/util/time';
import { cn } from '../utils';
import { Progress } from '../ui/progress';

interface InvitationInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invite: TeamInvitationsReadQuery;
  team: NonNullable<TeamSelectedQuery>;
}
const AUTO_CLOSE_DURATION = 5; // seconds

export function InvitationInfoDialog({
  open,
  onOpenChange,
  invite,
  team,
}: InvitationInfoDialogProps) {
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const [revoked, setRevoked] = useState(false);
  const revokeInvite = trpc.user.teams.invitations.revoke.useMutation();
  const invitationLink = devRoutes.teams.join.url({
    params: { teamId: invite?.team.id ?? '' },
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
        toast({
          title: 'Error sharing',
          description: parseTRPCClientErrorMessage(error),
          variant: 'destructive',
        });
      }
    } else {
      handleCopyLink();
    }
  };

  const handleRevoke = async () => {
    if (!invite) return;

    try {
      await revokeInvite.mutateAsync({
        id: invite.id,
      });
      await utils.user.teams.invitations.list.invalidate();
      setRevoked(true);
    } catch (error) {
      toast({
        title: 'Error revoking invitation',
        description: parseTRPCClientErrorMessage(error),
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 ">
            {revoked ? 'Invitation Revoked' : 'Member Invitation'}
          </DialogTitle>
          {revoked ? (
            <DialogDescription>
              The invitation for <strong>{invite?.email ?? '...'}</strong> has
              been revoked.
            </DialogDescription>
          ) : (
            <DialogDescription>
              An invitation has been sent to {invite?.email ?? '...'} to join
              your team as a{' '}
              <strong>{MEMBER_LABELS[invite?.role ?? 'MEMBER']}</strong>.
            </DialogDescription>
          )}
        </DialogHeader>
        {revoked ? (
          <Alert variant="destructive" className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This dialog will automatically close in {AUTO_CLOSE_DURATION}{' '}
              seconds.
              {revoked && (
                <AutoFillProgress
                  className="mt-4 fill-red-500"
                  duration={AUTO_CLOSE_DURATION * SECONDS}
                  onComplete={() => {
                    onOpenChange(false);
                  }}
                />
              )}
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="space-y-4">
              <div className="rounded-md bg-green-50 p-4 text-green-800">
                <p className="text-sm">
                  You can also share this invitation link directly with the
                  user. They can use this link to accept the invitation.
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
          </>
        )}

        <DialogFooter>
          {!revoked && (
            <Button onClick={handleRevoke} variant="destructive">
              Revoke
            </Button>
          )}
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const AutoFillProgress: React.FC<{
  duration: number;
  onComplete: () => void;
  className?: string;
}> = ({ duration, onComplete, className }) => {
  const progress = useProgress({
    duration,
    onComplete,
    delay: 250,
  });
  return (
    <Progress
      className={className}
      indicatorColor={'bg-red-500'}
      value={progress}
      max={100}
    />
  );
};

export function useProgress({
  duration,
  onComplete,
  delay = 0,
}: {
  duration: number;
  onComplete?: () => void;
  delay?: number;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 50; // ms
    const totalTicks = duration / interval;
    let currentTick = 0;

    const timer = setInterval(() => {
      currentTick++;
      const newProgress = (currentTick / totalTicks) * 100;
      setProgress(newProgress);

      if (currentTick >= totalTicks) {
        clearInterval(timer);
        setProgress(100);
        if (delay > 0) {
          setTimeout(() => {
            onComplete?.();
          }, delay);
        } else {
          onComplete?.();
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [duration, delay, onComplete]);

  return progress;
}
