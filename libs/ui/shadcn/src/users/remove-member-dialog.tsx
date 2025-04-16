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
import { AlertTriangle } from 'lucide-react';

interface RemoveMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  memberName: string;
  isPending: boolean;
}

export function RemoveMemberDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  memberName,
  isPending,
}: RemoveMemberDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
            {isPending ? 'Cancel Invitation' : 'Remove Team Member'}
          </DialogTitle>
          <DialogDescription>
            {isPending
              ? 'You are about to cancel a pending invitation.'
              : 'You are about to remove a member from your team.'}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {!isPending && (
            <div className="rounded-md bg-amber-50 p-4 text-amber-800 mb-4">
              <p className="text-sm font-medium">Removing {memberName} will:</p>
              <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
                <li>Immediately revoke their access to all team resources</li>
                <li>Remove them from all team projects</li>
                <li>Require a new invitation to rejoin the team</li>
              </ul>
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            {isPending
              ? `Are you sure you want to cancel the invitation for ${memberName}?`
              : 'Are you sure you want to proceed with this removal?'}
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {isPending ? 'Cancel Invitation' : 'Remove Member'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
