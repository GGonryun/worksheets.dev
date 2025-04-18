'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { FileUploader } from './file-uploader';
import {
  MediaFormSchema,
  mediaFormSchema,
  mediaFormDefaultValues,
} from '@worksheets/util/types';

const MAX_BASIC_IMAGE_SIZE = 1.5 * 1000 * 1000; // 1.5MB
const VALID_BASIC_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export const MediaForm = ({
  gameId,
  onSave,
}: {
  gameId: string;
  onSave?: () => void;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<MediaFormSchema>({
    resolver: zodResolver(mediaFormSchema),
    mode: 'onChange',
    defaultValues: mediaFormDefaultValues,
  });

  const thumbnail = useWatch({
    control: form.control,
    name: 'thumbnail',
  });

  useEffect(() => {
    console.error('thumbnail changed', thumbnail);
  }, [thumbnail]);

  // Load game data if editing
  // useEffect(() => {
  //   if (gameId) {
  //     // In a real app, you would fetch the game data from an API
  //     // For this example, we'll use mock data
  //     form.reset({
  //       trailerUrl: mockGame.trailerUrl,
  //     });
  //     setThumbnailPreview(mockGame.thumbnail);
  //     setCoverImagePreview(mockGame.coverImage);
  //     setScreenshotsPreview(mockGame.screenshots);
  //   }
  // }, [gameId, form]);

  // Handle form submission
  function onSubmit(values: z.infer<typeof mediaFormSchema>) {
    setIsLoading(true);

    // In a real app, you would send the data to an API
    console.log(values);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onSave) {
        onSave();
      }
    }, 1000);
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <MediaFormFields />

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push('/dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Update Media'}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export const MediaFormFields: React.FC = () => {
  const form = useFormContext<MediaFormSchema>();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="thumbnail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Thumbnail Image <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <FileUploader
                fieldId={field.name}
                type="image"
                name="Thumbnail Image"
                label="Upload thumbnail image"
                description="This is the main image that will represent your game on the platform."
                restrictions={{
                  square: true,
                  maxSize: MAX_BASIC_IMAGE_SIZE,
                  fileTypes: VALID_BASIC_IMAGE_TYPES,
                  minHeight: 300,
                  minWidth: 300,
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="coverImage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Cover Image <span className="text-red-500">*</span>
            </FormLabel>
            <FileUploader
              fieldId={field.name}
              type="image"
              name="Cover Image"
              label="Upload a cover image"
              description="This image will be displayed on the game details page and in marketing materials."
              requirements={['For best results use an aspect ratio of 16:9']}
              restrictions={{
                maxSize: MAX_BASIC_IMAGE_SIZE,
                fileTypes: VALID_BASIC_IMAGE_TYPES,
                minHeight: 300,
                minWidth: 600,
              }}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="trailerUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Trailer URL</FormLabel>
            <FormControl>
              <Input
                placeholder="https://www.youtube.com/watch?v=..."
                {...field}
              />
            </FormControl>
            <FormDescription>
              Link to a gameplay video or trailer on YouTube or Vimeo.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
