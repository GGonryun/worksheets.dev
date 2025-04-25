'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
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
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { FileUploader } from '../forms/fields/file-uploader';
import {
  MediaFormSchema,
  mediaFormSchema,
  mediaFormDefaultValues,
} from '@worksheets/util/types';
import {
  MAX_BASIC_IMAGE_SIZE,
  VALID_BASIC_IMAGE_TYPES,
} from '@worksheets/util/settings';
import { MediaSectionLayout } from './section-card-layout';
import { trpc } from '@worksheets/trpc-charity';
import {
  useRouteChangeGuard,
  useToast,
  useUnsavedChangesWarning,
} from '../hooks';
import { Skeleton } from '../ui';
import { devRoutes } from '@worksheets/routes';
import { Loader2 } from 'lucide-react';
import { TeamSelectedQuery, TeamGamesReadQuery } from '../types';

export const MediaForm: React.FC<{
  team: NonNullable<TeamSelectedQuery>;
  game: NonNullable<TeamGamesReadQuery>;
}> = ({ game }) => {
  const router = useRouter();
  const { toast } = useToast();

  const utils = trpc.useUtils();
  const update = trpc.user.teams.games.media.update.useMutation();
  const media = trpc.user.teams.games.media.read.useQuery({ gameId: game.id });

  const form = useForm<MediaFormSchema>({
    resolver: zodResolver(mediaFormSchema),
    defaultValues: mediaFormDefaultValues,
    mode: 'onChange',
  });

  useUnsavedChangesWarning(form.formState.isDirty);
  useRouteChangeGuard(form.formState.isDirty);

  useEffect(() => {
    if (media.data) {
      form.reset(media.data);
    }
  }, [media.data, form]);

  const onSubmit = async (values: MediaFormSchema) => {
    try {
      await update.mutateAsync({
        gameId: game.id,
        form: values,
      });
      await utils.user.teams.games.media.read.invalidate({ gameId: game.id });
      toast({
        title: 'Success',
        description: 'Media updated successfully',
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update media',
        variant: 'destructive',
      });
    }
  };

  const canSubmit =
    form.formState.isDirty &&
    form.formState.isValid &&
    !update.isPending &&
    !media.isPending;
  return (
    <MediaSectionLayout>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <MediaFormFields isPending={media.isPending || update.isPending} />

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              type="button"
              disabled={!canSubmit}
              onClick={() => router.push(devRoutes.dashboard.path())}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              {update.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {update.isPending ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </MediaSectionLayout>
  );
};

export const MediaFormFields: React.FC<{ isPending?: boolean }> = ({
  isPending,
}) => {
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
              {isPending ? (
                <Skeleton className="h-64 w-full rounded-md" />
              ) : (
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
              )}
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
            {isPending ? (
              <Skeleton className="h-64 w-full rounded-md" />
            ) : (
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
            )}
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
              {isPending ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <Input
                  placeholder="https://www.youtube.com/watch?v=..."
                  {...field}
                />
              )}
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
