import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '../ui';
import { TeamSelectedQuery } from '../types';
import { trpc } from '@worksheets/trpc-charity';
import { useToast } from '../hooks';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { useRouter } from 'next/router';
import { devRoutes } from '@worksheets/routes';
import { Loader2 } from 'lucide-react';

export const DangerZone: React.FC<{
  team: NonNullable<TeamSelectedQuery>;
}> = ({}) => {
  const router = useRouter();

  const { toast } = useToast();
  const deleteTeam = trpc.user.teams.delete.useMutation();
  const handleDelete = async () => {
    try {
      await deleteTeam.mutateAsync();
      toast({
        title: 'Team deleted',
        description: 'Your team has been deleted successfully',
      });
      router.push(devRoutes.teams.select.url());
    } catch (error) {
      toast({
        title: 'Error deleting team',
        description: parseTRPCClientErrorMessage(error),
        variant: 'destructive',
      });
    }
    // TODO
  };
  return (
    <>
      <div className="space-y-1 -mt-2">
        <p className="text-sm text-muted-foreground">
          This action is irreversible. All team data will be permanently
          deleted.
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground">
          <li>All team members must be removed.</li>
          <li>All team invites must be revoked.</li>
          <li>All team games must be deleted.</li>
        </ul>
        <p className="pt-4 text-sm text-muted-foreground">
          If you are sure you want to delete your team, click the button below.
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground">
          <li>You will lose access to your team.</li>
          <li>You will lose access to all team resources.</li>
        </ul>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            className="mt-4 w-fit"
            disabled={deleteTeam.isPending}
          >
            {deleteTeam.isPending && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {deleteTeam.isPending ? 'Deleting...' : 'Delete Team'}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              team and remove all members.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
