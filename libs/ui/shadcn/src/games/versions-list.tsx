'use client';

import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Eye,
  Loader2,
  MoreHorizontal,
  Star,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { VersionDetails } from './version-details';
import { VersionSectionLayout } from './section-card-layout';
import { trpc } from '@worksheets/trpc-charity';
import {
  GameFileSchema,
  versionFormDefaultValues,
  VersionFormSchema,
  versionFormSchema,
} from '@worksheets/util/types';
import { printBytes } from '@worksheets/util/data';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VersionFormFields } from './version-form';
import { waitFor } from '@worksheets/util/time';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { useToast } from '../hooks';
import { TeamSelectedQuery, TeamGamesReadQuery, TeamQuery } from '../types';
import { routes } from '@worksheets/routes';

// Mock data for versions

export const VersionsList: React.FC<{
  team: NonNullable<TeamSelectedQuery>;
  game: NonNullable<TeamGamesReadQuery>;
}> = ({ team, game }) => {
  const { toast } = useToast();

  const utils = trpc.useUtils();

  const versions = trpc.user.teams.games.versions.list.useQuery({
    gameId: game.id,
  });
  const setCurrent = trpc.user.teams.games.versions.setCurrent.useMutation();
  const destroy = trpc.user.teams.games.versions.delete.useMutation();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Handle setting a version as current
  const handleSetAsCurrent = (versionId: string) => {
    setSelectedVersion(versionId);
    setIsConfirmDialogOpen(true);
  };

  // Confirm setting a version as current
  const confirmSetAsCurrent = async () => {
    if (!selectedVersion) return;
    try {
      await setCurrent.mutateAsync({
        gameId: game.id,
        fileId: selectedVersion,
      });
      await utils.user.teams.games.versions.list.invalidate();
      toast({
        title: 'Success',
        description: 'Current version has been updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: parseTRPCClientErrorMessage(error),
        variant: 'destructive',
      });
    } finally {
      setIsSheetOpen(false);
      setIsDetailsOpen(false);
      setIsConfirmDialogOpen(false);
      setSelectedVersion(null);
    }
  };

  // Handle deleting a version
  const handleDeleteVersion = async (versionId: string) => {
    setIsSheetOpen(false);
    setIsDetailsOpen(false);
    setSelectedVersion(versionId);
    setIsDeleteDialogOpen(true);
  };

  // Confirm deleting a version
  const confirmDeleteVersion = async () => {
    if (!selectedVersion) return;
    try {
      const version = await destroy.mutateAsync({
        gameId: game.id,
        fileId: selectedVersion,
      });
      await utils.user.teams.games.versions.list.invalidate();
      toast({
        title: 'Success',
        description: `Version ${version.version} has been deleted.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: parseTRPCClientErrorMessage(error),
        variant: 'destructive',
      });
    } finally {
      setSelectedVersion(null);
      setIsDeleteDialogOpen(false);
    }
  };

  // Handle viewing version details
  const handleViewDetails = (version: string) => {
    setSelectedVersion(version);
    setIsDetailsOpen(true);
  };

  // Handle closing the details view
  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedVersion(null);
  };

  return (
    <>
      <VersionSectionLayout onAdd={() => setIsSheetOpen(true)}>
        {versions.isPending ? (
          <div>Loading...</div>
        ) : versions.isError ? (
          <div>Error: {JSON.stringify(versions.error.message)}</div>
        ) : versions.data.length ? (
          <VersionContentLayout>
            <VersionContent
              gameSlug={game.slug}
              teamSlug={team.slug}
              files={versions.data}
              onView={handleViewDetails}
              onSetCurrent={handleSetAsCurrent}
              onDelete={handleDeleteVersion}
            />
          </VersionContentLayout>
        ) : (
          <div className="text-center text-muted-foreground mt-4 ">
            No versions available. Please add a new version.
          </div>
        )}
      </VersionSectionLayout>

      <UploadNewVersionSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSetCurrent={handleSetAsCurrent}
        gameId={game.id}
      />

      <VersionDetailsSheet
        team={team}
        game={game}
        open={isDetailsOpen}
        selectedVersion={selectedVersion}
        onOpenChange={handleCloseDetails}
        onSetCurrent={() => {
          if (selectedVersion) {
            handleSetAsCurrent(selectedVersion);
          }
        }}
        onDelete={() => {
          if (selectedVersion) {
            handleDeleteVersion(selectedVersion);
          }
        }}
      />

      <ConfirmCurrentVersionDialog
        open={isConfirmDialogOpen}
        loading={setCurrent.isPending}
        onOpenChange={setIsConfirmDialogOpen}
        onConfirm={confirmSetAsCurrent}
      />

      <ConfirmDeletionDialog
        open={isDeleteDialogOpen}
        loading={destroy.isPending}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDeleteVersion}
      />
    </>
  );
};

const VersionDetailsSheet: React.FC<{
  team: NonNullable<TeamSelectedQuery>;
  game: NonNullable<TeamGamesReadQuery>;
  open: boolean;
  selectedVersion: string | null;
  onSetCurrent: () => void;
  onDelete: () => void;
  onOpenChange: (open: boolean) => void;
}> = ({
  team,
  game,
  open,
  selectedVersion,
  onSetCurrent,
  onDelete,
  onOpenChange,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Version Details</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <VersionDetails
            team={team}
            game={game}
            fileId={selectedVersion}
            onSetCurrent={onSetCurrent}
            onDelete={onDelete}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const UploadNewVersionSheet: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSetCurrent: (fileId: string) => void;
  gameId: string;
}> = ({ gameId, open, onOpenChange, onSetCurrent }) => {
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const create = trpc.user.teams.games.versions.create.useMutation();

  const [uploaded, setUploaded] = useState('');
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Initialize form with default values
  const form = useForm<VersionFormSchema>({
    resolver: zodResolver(versionFormSchema),
    defaultValues: versionFormDefaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    // TODO: understand why without this line, the form does not fully reset on the first render.
    // if we just have form.reset it still doesn't reset on first render.
    if (form.formState.isDirty) {
      form.reset(versionFormDefaultValues);
    }
  }, []);

  const handleFormReset = () => {
    setUploaded('');
    form.reset(versionFormDefaultValues);
    create.reset();
  };

  const handleConfirmExit = async () => {
    setShowExitDialog(false);
    onOpenChange(false);
    await waitFor(300);
    handleFormReset();
  };

  // Handle form submission
  const onSubmit = async (values: VersionFormSchema) => {
    try {
      const result = await create.mutateAsync({
        gameId: gameId,
        form: values,
      });
      if (result.ok) {
        await utils.user.teams.games.versions.list.invalidate();
        setUploaded(result.id);
      } else {
        form.setError(result.field, {
          type: 'manual',
          message: result.message,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: parseTRPCClientErrorMessage(error),
        variant: 'destructive',
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      console.log('handleOpenChange', form.formState.isDirty);
      if (form.formState.isDirty) {
        setShowExitDialog(true);
      } else {
        onOpenChange(false);
      }
    } else {
      handleFormReset();
    }
  };

  const handleSetCurrent = async () => {
    onSetCurrent(uploaded);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New Version</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            {uploaded ? (
              <SuccessFormState
                onSetCurrent={handleSetCurrent}
                onUpdateLater={handleConfirmExit}
              />
            ) : (
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <VersionFormFields />
                  <div className="flex justify-end gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleOpenChange(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!form.formState.isValid || create.isPending}
                    >
                      {create.isPending && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      {create.isPending ? 'Uploading...' : 'Upload'}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <ExitConfirmationDialog
        show={showExitDialog}
        onConfirm={handleConfirmExit}
        onOpenChange={setShowExitDialog}
      />
    </>
  );
};

const SuccessFormState: React.FC<{
  onSetCurrent: () => void;
  onUpdateLater: () => void;
}> = ({ onSetCurrent, onUpdateLater }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Upload Complete!</h3>
      <p className="text-muted-foreground text-center mb-8">
        Your game version has been successfully uploaded.
      </p>
      <div className="flex gap-4">
        <Button onClick={onSetCurrent}>Set as Current Version</Button>
        <Button variant="outline" onClick={onUpdateLater}>
          Update Later
        </Button>
      </div>
    </div>
  );
};

const ConfirmCurrentVersionDialog: React.FC<{
  open: boolean;
  loading: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}> = ({ open, loading, onOpenChange, onConfirm }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Set as Current Version</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to set this as the current version? This
            change may take up to 24 hours to propagate. Please give ample time
            for our caches to update.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={onConfirm}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ConfirmDeletionDialog: React.FC<{
  open: boolean;
  loading: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}> = ({ open, onOpenChange, onConfirm, loading }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Version</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this version? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground"
            disabled={loading}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ExitConfirmationDialog: React.FC<{
  show: boolean;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}> = ({ show, onConfirm, onOpenChange }) => {
  return (
    <AlertDialog open={show} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard Changes</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. Are you sure you want to exit? Your
            changes will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Discard Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const VersionContentLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Version</TableHead>
            <TableHead className="hidden lg:table-cell">File</TableHead>
            <TableHead className="hidden lg:table-cell">Size</TableHead>
            <TableHead className="hidden md:table-cell">Upload Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </div>
  );
};

const VersionContent: React.FC<{
  teamSlug: string;
  gameSlug: string;
  files: GameFileSchema[];
  onView: (id: string) => void;
  onSetCurrent: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({
  teamSlug,
  gameSlug,
  files: versions,
  onView,
  onSetCurrent,
  onDelete,
}) => {
  return (
    <>
      {versions.map((file) => (
        <TableRow
          key={file.id}
          className={!!file.error ? 'bg-destructive/5' : ''}
        >
          <TableCell className="font-medium">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{file.version}</Badge>
              {file.isCurrent && (
                <Badge className="bg-green-500">Current</Badge>
              )}
            </div>
          </TableCell>
          <TableCell className="hidden lg:table-cell">
            {file.metadata.name}
          </TableCell>
          <TableCell className="hidden lg:table-cell">
            {printBytes(file.metadata.size)}
          </TableCell>
          <TableCell className="hidden md:table-cell">
            {file.createdAt}
          </TableCell>
          <TableCell>
            {!!file.error ? (
              <div className="flex items-center text-destructive">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">Error</span>
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">OK</span>
            )}
          </TableCell>
          <TableCell className="text-right">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(file.id)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                {!file.isCurrent && !file.error && (
                  <DropdownMenuItem onClick={() => onSetCurrent(file.id)}>
                    <Star className="h-4 w-4 mr-2" />
                    Set as Current
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link
                    href={routes.team.game.version.url({
                      params: {
                        teamSlug,
                        gameSlug,
                        version: file.version,
                      },
                    })}
                    target="_blank"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Preview
                  </Link>
                </DropdownMenuItem>
                {!file.isCurrent && (
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onDelete(file.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
