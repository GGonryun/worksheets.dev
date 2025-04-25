'use client';

import type React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
  UseFormReturn,
} from 'react-hook-form';
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
import { FileUploader } from '../forms/fields/file-uploader';
import { VersionFormSchema } from '@worksheets/util/types';
import { MAX_GAME_FILE_SIZE } from '@worksheets/util/settings';

export const VersionFormFields: React.FC = () => {
  const form = useFormContext<VersionFormSchema>();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="version"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Version Number <span className="text-red-500">*</span>
            </FormLabel>
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

            <FormControl>
              <FileUploader
                fieldId={field.name}
                name="Game File"
                label="Upload Game File"
                description="Your ZIP file must include:"
                type={'zip'}
                onPreview={(preview) => {
                  form.setValue('preview', preview);
                }}
                requirements={[
                  'An index.html file at the root level',
                  'All game assets (images, sounds, scripts) referenced by relative paths',
                  'Self-contained game that works in a browser environment with different screen sizes',
                ]}
                restrictions={{
                  fileTypes: ['application/zip'],
                  maxSize: MAX_GAME_FILE_SIZE,
                }}
              />
            </FormControl>

            <FormMessage />
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
