'use client';

import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';
import { AlertCircle, Download, Star, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface VersionDetailsProps {
  version: {
    id: string;
    version: string;
    fileName: string;
    fileSize: string;
    uploadDate: string;
    notes: string;
    isCurrent: boolean;
    hasError: boolean;
    errorMessage: string;
  };
  onSetAsCurrent?: () => void;
  onDelete: () => void;
}

export function VersionDetails({
  version,
  onSetAsCurrent,
  onDelete,
}: VersionDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">Version {version.version}</h3>
          {version.isCurrent && <Badge className="bg-green-500">Current</Badge>}
        </div>
        <div className="text-sm text-muted-foreground">
          {version.uploadDate}
        </div>
      </div>

      {version.hasError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{version.errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <h4 className="text-sm font-medium">File Information</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-muted-foreground">Filename:</div>
          <div>{version.fileName}</div>
          <div className="text-muted-foreground">Size:</div>
          <div>{version.fileSize}</div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Release Notes</h4>
        <div className="rounded-md bg-muted p-3 text-sm">
          {version.notes || (
            <span className="text-muted-foreground italic">
              No release notes provided
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-4">
        <Button asChild variant="outline">
          <Link href={`/play/${version.id}/${version.version}`} target="_blank">
            <Download className="mr-2 h-4 w-4" />
            Preview Game
          </Link>
        </Button>

        {onSetAsCurrent && (
          <Button onClick={onSetAsCurrent}>
            <Star className="mr-2 h-4 w-4" />
            Set as Current Version
          </Button>
        )}

        <Button variant="destructive" onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Version
        </Button>
      </div>
    </div>
  );
}
