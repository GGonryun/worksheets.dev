'use client';

import { Button } from '../ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { GameFormFields, gameFormSchema } from './game-form';
import { MediaFormFields, mediaFormSchema } from './media-form';
import router from 'next/router';

import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { devRoutes } from '@worksheets/routes';
import { VersionFormFields, versionFormSchema } from './version-form';
import { useImagePreview } from '../hooks/use-image-preview';
import { useRouteChangeGuard } from '../hooks/use-route-change-guard';
import { useUnsavedChangesWarning } from '../hooks/use-unsaved-changes-warning';
import { Separator } from '../ui';
import React from 'react';
import { CardContent } from '@mui/material';

const formSchema = gameFormSchema
  .merge(mediaFormSchema)
  .merge(versionFormSchema);

type FormSchema = z.infer<typeof formSchema>;

export const CreateGame = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      tags: [],
      aiDisclosure: false,
    },
  });

  useUnsavedChangesWarning(form.formState.isDirty);
  useRouteChangeGuard(form.formState.isDirty);

  const onSubmit = async (data: FormSchema) => {
    console.log('Form submitted:', data);
    console.log(form.formState);
    form.reset(); // Reset the form after submission
    // Here you would typically send the data to your server or API
    // router.push(devRoutes.dashboard.path());
  };

  const thumbnail = useWatch({
    control: form.control,
    name: 'thumbnail',
  });

  const cover = useWatch({
    control: form.control,
    name: 'coverImage',
  });

  const screenshots = useWatch({
    control: form.control,
    name: 'screenshots',
  });

  const thumbnailPreview = useImagePreview(thumbnail);
  const coverImagePreview = useImagePreview(cover);
  const screenshotsPreview = useImagePreview(screenshots);

  return (
    <div className="container py-6 space-y-6">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
                <CardDescription>
                  Information about your game, including title, description, and
                  tags.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <GameFormFields />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
                <CardDescription>
                  Upload images and media for your game.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <MediaFormFields
                  thumbnailPreview={thumbnailPreview[0]}
                  coverImagePreview={coverImagePreview[0]}
                  screenshotsPreview={screenshotsPreview}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Files</CardTitle>
                <CardDescription>
                  Upload the game files and set the current version.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <VersionFormFields />
              </CardContent>
            </Card>

            <div className="flex gap-4 justify-end">
              <Button
                variant="outline"
                type="button"
                size="lg"
                onClick={() => router.push(devRoutes.dashboard.path())}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg">
                Create Game
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
