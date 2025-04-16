'use client';

import type React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useEffect, useState } from 'react';
import { CheckCircle2, FileArchive, Loader2, TrashIcon, X } from 'lucide-react';
import { FileRequirements } from './file-requirements';
import { MediaUploader } from './media-uploader';
import { Card, CardContent } from '../ui/card';
import { printBytes } from '@worksheets/util/data';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const versionFormSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/, {
    message: 'Version must be in format x.y.z (e.g., 1.0.0)',
  }),
  gameFile: z
    .custom<File>()
    .refine((file) => file instanceof File, { message: 'File is required' })
    .refine(
      (file) => file.name.endsWith('.zip') || file.name.endsWith('.html'),
      {
        message: 'Only .zip or .html files are allowed',
      }
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: 'File must be smaller than 50MB',
    })
    .array(),
  notes: z.string().optional(),
});

export type VersionFormSchema = z.infer<typeof versionFormSchema>;

type FormState = 'form' | 'uploading' | 'success';

export function VersionForm({
  gameId,
  onSuccess,
  onFormChange,
  onCancel,
}: {
  gameId: string;
  onSuccess?: () => void;
  onFormChange?: (hasChanges: boolean) => void;
  onCancel?: () => void;
}) {
  const [formState, setFormState] = useState<FormState>('form');

  const [uploadProgress, setUploadProgress] = useState(0);

  // Initialize form with default values
  const form = useForm<VersionFormSchema>({
    resolver: zodResolver(versionFormSchema),
    defaultValues: {
      version: '',
      gameFile: undefined,
      notes: '',
    },
  });

  // Track form changes
  useEffect(() => {
    const subscription = form.watch(() => {
      if (onFormChange) {
        const isDirty = form.formState.isDirty;
        onFormChange(isDirty);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onFormChange]);

  // Handle form submission
  function onSubmit(values: z.infer<typeof versionFormSchema>) {
    setFormState('uploading');
    setUploadProgress(0);

    // In a real app, you would send the data to an API
    console.log(values);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setFormState('success');
    }, 2000);
  }

  // Handle setting as current version
  function setAsCurrent() {
    // In a real app, you would send a request to set this as the current version
    console.log('Setting as current version');

    // Close the form
    if (onSuccess) {
      onSuccess();
    }
  }

  // Handle update later
  function updateLater() {
    // Just close the form
    if (onSuccess) {
      onSuccess();
    }
  }

  if (formState === 'uploading') {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="relative mb-4">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium">{uploadProgress}%</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">Uploading Version</h3>
        <p className="text-muted-foreground text-center">
          Please wait while we upload and process your game files...
        </p>
        <div className="w-full max-w-xs mt-4 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      </div>
    );
  }

  if (formState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Upload Complete!</h3>
        <p className="text-muted-foreground text-center mb-8">
          Your game version has been successfully uploaded.
        </p>
        <div className="flex gap-4">
          <Button onClick={setAsCurrent}>Set as Current Version</Button>
          <Button variant="outline" onClick={updateLater}>
            Update Later
          </Button>
        </div>
      </div>
    );
  }

  function handleCancel() {
    if (onCancel) {
      onCancel();
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <VersionFormFields />
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">Upload Version</Button>
        </div>
      </form>
    </FormProvider>
  );
}

export const VersionFormFields: React.FC = () => {
  const form = useFormContext<VersionFormSchema>();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="version"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Version Number</FormLabel>
            <FormControl>
              <Input placeholder="1.0.0" {...field} />
            </FormControl>
            <FormDescription>
              Use semantic versioning (e.g., 1.0.0, 1.1.0, etc.)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gameFile"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Game File <span className="text-red-500">*</span>
            </FormLabel>

            {!!field.value?.length ? (
              <GameFilePreview
                file={field.value[0]}
                onRemove={() => field.onChange(undefined)}
              />
            ) : (
              <FormControl>
                <MediaUploader
                  value={field.value}
                  onChange={field.onChange}
                  type="zip"
                  label="Upload Game File"
                  description="Drag and drop your game file (ZIP) here or click to browse"
                  fileTypes={['application/zip']}
                />
              </FormControl>
            )}

            <FormMessage />

            {!field.value && (
              <FileRequirements
                title="Game File Requirements"
                description="Your ZIP file must include:"
                items={[
                  'An index.html file at the root level',
                  'All game assets (images, sounds, scripts) referenced by relative paths',
                  'Self-contained game that works in a browser environment',
                  'Maximum file size: 100MB',
                ]}
              />
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Release Notes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe what's new in this version..."
                className="min-h-32"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Provide details about what's new or changed in this version.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const GameFilePreview: React.FC<{ file: File; onRemove: () => void }> = ({
  file,
  onRemove,
}) => {
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
