'use client';

import type React from 'react';

import { useState } from 'react';
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
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface InviteTeamMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvite: (email: string, role: string) => void;
  memberCount: number;
  memberLimit: number;
}

export function InviteTeamMemberDialog({
  open,
  onOpenChange,
  onInvite,
  memberCount,
  memberLimit,
}: InviteTeamMemberDialogProps) {
  // Update the role state default to "member"
  const [role, setRole] = useState('member');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter an email address');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    if (memberCount >= memberLimit) {
      setError('Team member limit reached');
      return;
    }

    onInvite(email, role);
    setEmail('');
    setRole('member');
    setError('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogDescription>
            Send an invitation to add a new member to your team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {memberCount >= memberLimit && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You've reached the maximum team size of {memberLimit} members.
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={memberCount >= memberLimit}
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              {/* Update the RadioGroup to include the manager role and update the labels */}
              <RadioGroup value={role} onValueChange={setRole}>
                <div className="flex items-start space-x-2 rounded-md border p-3">
                  <RadioGroupItem
                    value="owner"
                    id="owner"
                    disabled={memberCount > 0}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="owner" className="font-medium">
                      Owner
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Has full control over the team. There can only be one
                      owner per team.
                    </p>
                    {memberCount > 0 && (
                      <p className="text-xs text-amber-600 mt-1">
                        A team can only have one owner. You cannot invite a new
                        owner.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="manager" id="manager" />
                  <div className="space-y-1">
                    <Label htmlFor="manager" className="font-medium">
                      Manager
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Can manage team members and games, but cannot remove the
                      owner.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="member" id="member" />
                  <div className="space-y-1">
                    <Label htmlFor="member" className="font-medium">
                      Member
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Can only view games and information about games. Cannot
                      edit or upload new games.
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={memberCount >= memberLimit}>
              Send Invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
