'use client';

import type React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Loader2, Upload } from 'lucide-react';
import { useState } from 'react';
import { trpc } from '@worksheets/trpc-charity';
import { useFormContext } from 'react-hook-form';
import { printBytes } from '@worksheets/util/data';
import { cn } from '../../utils';
import { ImagePreview, ZipPreview } from './file-preview';
import { FileRequirements } from './file-requirements';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { compact } from 'lodash';
import { loadImage, uploadFileWithProgress } from '../../games/util';
import { Progress } from '../../ui/progress';
import { EMPTY_FILE_PREVIEW, FilePreviewSchema } from '@worksheets/util/types';

type FileUploaderProps = {
  fieldId: string;
  name: string;
  label: string;
  description: string;
  type: 'image' | 'zip';
  requirements?: string[];
  onPreview?: (file: FilePreviewSchema) => void;
  restrictions?: {
    square?: boolean;
    minWidth?: number;
    minHeight?: number;
    maxSize?: number;
    fileTypes?: string[];
  };
};

export const FileUploader = ({
  fieldId,
  type,
  label,
  description,
  name,
  restrictions,
  requirements,
  onPreview,
}: FileUploaderProps) => {
  const form = useFormContext();
  const error = form.formState.errors[fieldId];
  const value = form.watch(fieldId);

  const upload = trpc.user.teams.files.upload.useMutation();
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<FilePreviewSchema>(EMPTY_FILE_PREVIEW);

  const validateFile = async (file: File) => {
    if (
      restrictions?.fileTypes?.length &&
      !restrictions?.fileTypes.includes(file.type)
    ) {
      throw new Error(
        `File type must be one of ${restrictions.fileTypes.join(', ')}`
      );
    }

    if (restrictions?.maxSize && file.size > restrictions.maxSize) {
      throw new Error(
        `File must be less than ${printBytes(restrictions.maxSize)}`
      );
    }

    if (type !== 'image') {
      return;
    }

    const image = await loadImage(file);

    if (restrictions?.minWidth && image.width < restrictions.minWidth) {
      throw new Error(
        `Image must be at least ${restrictions.minWidth} pixels wide`
      );
    }

    if (restrictions?.minHeight && image.height < restrictions.minHeight) {
      throw new Error(
        `Image must be at least ${restrictions.minHeight} pixels tall`
      );
    }

    if (restrictions?.square && image.width !== image.height) {
      throw new Error('Image must be square');
    }
  };

  const updateFiles = async (files: FileList | File[]) => {
    form.clearErrors(fieldId);
    // does not support multiple.
    const file = files[0];

    try {
      await validateFile(file);
    } catch (error: any) {
      form.setError(fieldId, {
        type: 'manual',
        message: error,
      });
      return;
    }

    try {
      setProgress(0);
      const { uploadUrl, publicUrl } = await upload.mutateAsync({
        type: file.type,
      });

      await uploadFileWithProgress(file, uploadUrl, (progress) => {
        setProgress(progress);
      });

      form.setValue(fieldId, publicUrl, {
        shouldDirty: true,
        shouldValidate: true,
      });
      const f = {
        name: file.name,
        size: file.size,
        type: file.type,
      };
      setPreview(f);
      onPreview?.(f);
      form.trigger(fieldId);
    } catch (error) {
      form.setError(fieldId, {
        type: 'manual',
        message: parseTRPCClientErrorMessage(error),
      });
    } finally {
      setProgress(0);
    }
  };

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    updateFiles(e.target.files);
    // Clear the input
    e.target.value = '';
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (!e.dataTransfer.files?.length) return;

    updateFiles(e.dataTransfer.files);
  };

  return (
    <div
      className={cn(
        type === 'image'
          ? 'grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 *:w-full'
          : 'space-y-2'
      )}
    >
      {value ? (
        type === 'image' ? (
          <ImagePreview
            className="min-h-64"
            url={value}
            onRemove={() => {
              form.setValue(fieldId, '', {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
          />
        ) : (
          <ZipPreview
            file={preview}
            onRemove={() => {
              form.setValue(fieldId, '', {
                shouldDirty: true,
                shouldValidate: true,
              });
              const f = EMPTY_FILE_PREVIEW;
              setPreview(f);
              onPreview?.(f);
            }}
          />
        )
      ) : (
        <div
          className={cn(
            'flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center',
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25',
            error && 'border-destructive'
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!!progress ? (
            <FileUploadProgress type={type} progress={progress} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="rounded-full bg-primary/10 p-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">
                Drag and drop files here or click to browse.
              </p>
              <Input
                type="file"
                accept={
                  restrictions?.fileTypes?.length
                    ? restrictions.fileTypes.join(',')
                    : 'image/*'
                }
                className="hidden"
                id={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  document
                    .getElementById(
                      `file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`
                    )
                    ?.click()
                }
                type="button"
              >
                Choose File
              </Button>
            </div>
          )}
        </div>
      )}

      <FileRequirements
        className={cn(
          'lg:col-span-2 h-fit',
          error &&
            'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
        )}
        title={`${name} Requirements`}
        description={description}
        items={compact([
          ...(requirements ?? []),
          restrictions?.square && 'Image must be square',
          restrictions?.minWidth && `Minimum width: ${restrictions.minWidth}px`,
          restrictions?.minHeight &&
            `Minimum height: ${restrictions.minHeight}px`,
          restrictions?.maxSize &&
            `Maximum file size: ${printBytes(restrictions.maxSize)}`,
          restrictions?.fileTypes?.length &&
            `Supported File types: ${restrictions.fileTypes
              .map(friendlyFileLabel)
              .join(', ')}`,
        ])}
      />
    </div>
  );
};

const friendlyFileLabel = (type: string) => {
  const [_, label] = type.split('/');
  return label.toUpperCase();
};

const FileUploadProgress: React.FC<{
  progress: number;
  type: 'image' | 'zip';
}> = ({ progress, type }) => {
  return (
    <div className="text-center py-8 space-y-6 w-full">
      <div className="flex justify-center">
        <div className="rounded-full bg-primary/10 p-3">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
        </div>
      </div>

      <p className="text-muted-foreground">
        Uploading {type === 'image' ? 'image' : 'zip'}...
      </p>

      <div className="w-full max-w-md mx-auto px-4">
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2 text-right">
          {progress}%
        </p>
      </div>
    </div>
  );
};
