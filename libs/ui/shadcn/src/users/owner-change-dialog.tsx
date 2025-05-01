'use client';

import { TeamMembersReadQuery } from '../types';
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

interface OwnerChangeDialogProps {
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  member: TeamMembersReadQuery;
}

export function OwnerChangeDialog({
  onOpenChange,
  onConfirm,
  onCancel,
  member,
}: OwnerChangeDialogProps) {
  return (
    <Dialog open={!!member} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
            Change Team Owner
          </DialogTitle>
          <DialogDescription>
            You are about to change the team ownership. Please read carefully.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="rounded-md bg-amber-50 p-4 text-amber-800 mb-4">
            <p className="text-sm font-medium">
              There can only be one owner per team. Changing the owner will:
            </p>
            <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
              <li>
                Transfer full control to{' '}
                {member?.user.username ?? 'another user.'}
              </li>
              <li>Change your role to Manager</li>
              <li>Require the new owner to change you back if needed</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to proceed with this change?
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={onConfirm}
            className="bg-amber-600 hover:bg-amber-700"
          >
            Confirm Change
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
