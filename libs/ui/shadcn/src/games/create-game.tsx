'use client';

import { Button } from '../ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { DetailsFormFields } from './details-form';
import { MediaFormFields } from './media-form';
import router from 'next/router';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { devRoutes } from '@worksheets/routes';
import { VersionFormFields } from './version-form';
import { useRouteChangeGuard } from '../hooks/use-route-change-guard';
import { useUnsavedChangesWarning } from '../hooks/use-unsaved-changes-warning';
import React from 'react';
import { CardContent } from '@mui/material';
import { SaveIcon } from 'lucide-react';
import { trpc } from '@worksheets/trpc-charity';
import {
  createGameFormDefaultValues,
  createGameFormSchema,
  CreateGameFormSchema,
} from '@worksheets/util/types';
import {
  DetailsSectionLayout,
  FilesSectionLayout,
  MediaSectionLayout,
} from './section-card-layout';

// TODO: remove in order to bypass the unsaved changes warning
const enableProtection = false;

export const CreateGame = () => {
  const create = trpc.user.teams.games.create.useMutation();
  const [exitSafely, setExitSafely] = React.useState(false);
  const team = trpc.user.teams.selected.useQuery();
  const form = useForm<CreateGameFormSchema>({
    resolver: zodResolver(createGameFormSchema),
    mode: 'onChange',
    defaultValues: createGameFormDefaultValues,
  });

  useUnsavedChangesWarning(
    enableProtection && !exitSafely && form.formState.isDirty
  );
  useRouteChangeGuard(
    enableProtection && !exitSafely && form.formState.isDirty
  );

  const onSubmit = async (form: CreateGameFormSchema) => {
    console.log('Form submitted:', form);
    setExitSafely(true);
    try {
      await create.mutateAsync(form);
      router.push(devRoutes.dashboard.path());
    } catch (error) {
      console.error('Error creating game:', error);
      // TODO: depending on the type of error we may need to add a toast
      // and show an error on the form.
      // for example, the slug might already be taken, in which case we need to show an error on the slug field.
    }
  };

  return (
    <div className="container py-6 space-y-6">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8">
            <DetailsSectionLayout>
              <DetailsFormFields
                isPending={team.isPending}
                teamSlug={team.data?.slug}
              />
            </DetailsSectionLayout>

            <MediaSectionLayout>
              <MediaFormFields />
            </MediaSectionLayout>

            <FilesSectionLayout>
              <VersionFormFields />
            </FilesSectionLayout>
            <div className="flex justify-end">
              <Button type="submit">
                <SaveIcon />
                Save Game
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
