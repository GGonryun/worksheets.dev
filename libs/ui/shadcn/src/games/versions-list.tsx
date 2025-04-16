'use client';

import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
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
  Download,
  Eye,
  MoreHorizontal,
  Plus,
  Star,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { VersionForm } from './version-form';
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

// Mock data for versions
const initialVersions = [
  {
    id: '1',
    version: '1.0.0',
    fileName: 'space-explorer-v1.0.0.zip',
    fileSize: '15.2 MB',
    uploadDate: '2023-04-15',
    notes: 'Initial release',
    isCurrent: true,
    hasError: false,
    errorMessage: '',
  },
  {
    id: '2',
    version: '1.1.0',
    fileName: 'space-explorer-v1.1.0.zip',
    fileSize: '16.5 MB',
    uploadDate: '2023-04-20',
    notes: 'Bug fixes and performance improvements',
    isCurrent: false,
    hasError: true,
    errorMessage: 'Missing index.html file at root level',
  },
  {
    id: '3',
    version: '1.2.0',
    fileName: 'space-explorer-v1.2.0.zip',
    fileSize: '17.8 MB',
    uploadDate: '2023-04-25',
    notes: 'Added new levels and enemies',
    isCurrent: false,
    hasError: false,
    errorMessage: '',
  },
];

export function VersionsList({ gameId }: { gameId: string }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [versions, setVersions] = useState(initialVersions);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedVersionData, setSelectedVersionData] = useState<any>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [hasFormChanges, setHasFormChanges] = useState(false);

  // Handle setting a version as current
  const handleSetAsCurrent = (versionId: string) => {
    setSelectedVersion(versionId);
    setIsConfirmDialogOpen(true);
  };

  // Confirm setting a version as current
  const confirmSetAsCurrent = () => {
    if (selectedVersion) {
      setVersions(
        versions.map((v) => ({
          ...v,
          isCurrent: v.id === selectedVersion,
        }))
      );
    }
    setIsConfirmDialogOpen(false);
    setSelectedVersion(null);
  };

  // Handle deleting a version
  const handleDeleteVersion = (versionId: string) => {
    setSelectedVersion(versionId);
    setIsDeleteDialogOpen(true);
  };

  // Confirm deleting a version
  const confirmDeleteVersion = () => {
    if (selectedVersion) {
      setVersions(versions.filter((v) => v.id !== selectedVersion));
    }
    setIsDeleteDialogOpen(false);
    setSelectedVersion(null);
  };

  // Handle viewing version details
  const handleViewDetails = (version: any) => {
    setSelectedVersionData(version);
    setIsDetailsOpen(true);
  };

  // Handle successful version upload
  const handleVersionSuccess = () => {
    // In a real app, you would fetch the updated versions list
    // For this example, we'll just close the sheet
    setIsSheetOpen(false);
    setHasFormChanges(false);
  };

  // Handle closing the details view
  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedVersionData(null);
  };

  // Handle form changes
  const handleFormChange = (hasChanges: boolean) => {
    setHasFormChanges(hasChanges);
  };

  // Handle sheet close attempt
  const handleSheetCloseAttempt = () => {
    if (hasFormChanges) {
      setShowExitDialog(true);
    } else {
      setIsSheetOpen(false);
    }
  };

  // Confirm exit without saving
  const confirmExit = () => {
    setShowExitDialog(false);
    setIsSheetOpen(false);
    setHasFormChanges(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Game Versions</CardTitle>
            <CardDescription>
              Manage your game versions and releases
            </CardDescription>
          </div>
          <Button onClick={() => setIsSheetOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Version
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Version</TableHead>
                  <TableHead className="hidden md:table-cell">File</TableHead>
                  <TableHead className="hidden md:table-cell">Size</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Upload Date
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {versions.map((version) => (
                  <TableRow
                    key={version.id}
                    className={version.hasError ? 'bg-destructive/5' : ''}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{version.version}</Badge>
                        {version.isCurrent && (
                          <Badge className="bg-green-500">Current</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {version.fileName}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {version.fileSize}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {version.uploadDate}
                    </TableCell>
                    <TableCell>
                      {version.hasError ? (
                        <div className="flex items-center text-destructive">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span className="text-xs">Error</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          OK
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(version)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {!version.isCurrent && !version.hasError && (
                            <DropdownMenuItem
                              onClick={() => handleSetAsCurrent(version.id)}
                            >
                              <Star className="h-4 w-4 mr-2" />
                              Set as Current
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/play/${gameId}/${version.version}`}
                              target="_blank"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Preview
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteVersion(version.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Version Upload Sheet */}
      <Sheet
        open={isSheetOpen}
        onOpenChange={(open) => {
          if (!open && hasFormChanges) {
            setShowExitDialog(true);
          } else if (!open) {
            setIsSheetOpen(false);
          } else {
            setIsSheetOpen(open);
          }
        }}
      >
        <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add New Version</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <VersionForm
              gameId={gameId}
              onSuccess={handleVersionSuccess}
              onFormChange={handleFormChange}
              onCancel={handleSheetCloseAttempt}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Version Details Sheet - Fixed to ensure it closes properly */}
      {selectedVersionData && (
        <Sheet open={isDetailsOpen} onOpenChange={handleCloseDetails}>
          <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Version Details</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <VersionDetails
                version={selectedVersionData}
                onSetAsCurrent={
                  !selectedVersionData.isCurrent &&
                  !selectedVersionData.hasError
                    ? () => handleSetAsCurrent(selectedVersionData.id)
                    : undefined
                }
                onDelete={() => handleDeleteVersion(selectedVersionData.id)}
              />
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Confirmation Dialog for Setting Current Version */}
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Set as Current Version</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to set this as the current version? This
              change may take up to 24 hours to propagate. Please give ample
              time for our caches to update.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSetAsCurrent}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirmation Dialog for Deleting Version */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Version</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this version? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteVersion}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to exit? Your
              changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowExitDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmExit}>
              Discard Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
