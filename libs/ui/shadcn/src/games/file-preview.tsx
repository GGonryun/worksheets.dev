import { FillImage, ContainImage } from '@worksheets/ui/components/images';
import {
  ZoomInIcon,
  Trash2Icon,
  Link,
  FileArchive,
  TrashIcon,
} from 'lucide-react';
import { useState, ReactNode } from 'react';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui';
import { cn } from '../utils';
import { printBytes } from '@worksheets/util/data';

export const ImagePreview: React.FC<{
  url: string;
  onRemove: () => void;
  alt?: string;
  className?: string;
}> = ({ url, onRemove, alt, className }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <div
        className={cn('relative rounded-lg border overflow-hidden', className)}
      >
        <FillImage src={url || '/placeholder.svg'} alt={alt || 'Preview'} />
        <div className="absolute top-2 right-2 flex items-center justify-center gap-2">
          <Button
            size="icon"
            className=" h-8 w-8"
            onClick={() => setShowPreview(true)}
            type="button"
          >
            <ZoomInIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className=" h-8 w-8"
            onClick={() => onRemove()}
            type="button"
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <PreviewDialog
        showDialog={!!showPreview}
        url={url}
        setShowDialog={() => setShowPreview(false)}
      />
    </>
  );
};

export const MultiImagePreview: React.FC<{
  urls: string[];
  onRemove: (index: number) => void;
  add: ReactNode;
}> = ({ urls, onRemove, add }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4',
        urls.length ? 'md:grid-cols-2' : ''
      )}
    >
      {urls.map((url, index) => (
        <ImagePreview
          key={index}
          url={url}
          onRemove={() => onRemove(index)}
          alt={`Screenshot ${index + 1}`}
        />
      ))}
      {add}
    </div>
  );
};

export const PreviewDialog: React.FC<{
  showDialog: boolean;
  url?: string;
  setShowDialog: () => void;
}> = ({ showDialog, url, setShowDialog }) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogTitle>Image Preview</DialogTitle>
        <div className="relative w-full h-72 md:h-96">
          <ContainImage src={url || '/placeholder.svg'} alt={'Image Preview'} />
        </div>
        <DialogDescription>
          <Link
            href={url ?? ''}
            target="_blank"
            className="hidden text-blue-500 hover:underline"
          >
            Download
          </Link>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export type FilePreview = {
  name: string;
  size: number;
  type: string;
};

export const ZipPreview: React.FC<{
  file: FilePreview;
  onRemove: () => void;
}> = ({ file, onRemove }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded">
              <FileArchive className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-sm text-gray-500">{printBytes(file.size)}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            aria-label="Remove file"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
