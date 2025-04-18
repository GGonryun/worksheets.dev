'use client';

import { Button } from '../ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { GameFormFields } from './game-form';
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
import { useActiveTeam } from '../hooks';

// TODO: remove in order to bypass the unsaved changes warning
const enableProtection = false;

export const CreateGame = () => {
  const [teamId] = useActiveTeam();

  const create = trpc.user.teams.games.create.useMutation();
  const [exitSafely, setExitSafely] = React.useState(false);
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
      await create.mutateAsync({
        teamId,
        form,
      });
      router.push(devRoutes.dashboard.path());
    } catch (error) {
      console.error('Error creating game:', error);
      // depending on the type of error we may need to add a toast
      // and show an error on the form.
      // for example, the slug might already be taken, in which case we need to show an error on the slug field.
    }
  };

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
                <MediaFormFields />
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
