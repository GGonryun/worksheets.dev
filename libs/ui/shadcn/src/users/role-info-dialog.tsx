'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Check, X } from 'lucide-react';
import {
  HIDDEN_MEMBERSHIP_LABELS,
  MemberPermission,
  MEMBERSHIP_LABELS,
  MEMBERSHIP_PERMISSIONS,
} from '@worksheets/util/team';
import { entriesOf, keysOf } from '@worksheets/util/objects';

interface RoleInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RoleInfoDialog({ open, onOpenChange }: RoleInfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[100vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Team Role Information</DialogTitle>
          <DialogDescription>
            Understanding the different roles and permissions in your team
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-3 font-medium">Permissions</th>
                  <th className="text-center p-3 font-medium">Owner</th>
                  <th className="text-center p-3 font-medium">Manager</th>
                  <th className="text-center p-3 font-medium">Member</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {entriesOf(MEMBERSHIP_LABELS)
                  .filter(([key]) => !HIDDEN_MEMBERSHIP_LABELS.includes(key))
                  .map(([key, value]) => (
                    <tr key={key}>
                      <td className="p-3">{value}</td>
                      <td className="text-center p-3">
                        {MEMBERSHIP_PERMISSIONS['OWNER'].includes(key) ? (
                          <Check className="h-5 w-5 mx-auto text-green-500" />
                        ) : (
                          <X className="h-5 w-5 mx-auto text-red-500" />
                        )}
                      </td>
                      <td className="text-center p-3">
                        {MEMBERSHIP_PERMISSIONS['MANAGER'].includes(key) ? (
                          <Check className="h-5 w-5 mx-auto text-green-500" />
                        ) : (
                          <X className="h-5 w-5 mx-auto text-red-500" />
                        )}
                      </td>
                      <td className="text-center p-3">
                        {MEMBERSHIP_PERMISSIONS['MEMBER'].includes(key) ? (
                          <Check className="h-5 w-5 mx-auto text-green-500" />
                        ) : (
                          <X className="h-5 w-5 mx-auto text-red-500" />
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Owner:</strong> Full control over the team. There can only
              be one owner per team.
            </p>
            <p className="mb-2">
              <strong>Manager:</strong> Can manage team members and games, but
              cannot remove the owner or transfer ownership.
            </p>
            <p>
              <strong>Member:</strong> Limited to viewing games and information
              only.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
