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
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  DEVICE_VALUES,
  detailsFormDefaultValues,
  DetailsFormSchema,
  ORIENTATION_VALUES,
  detailsFormSchema,
} from '@worksheets/util/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { tags } from '@worksheets/data/tags';
import { trpc } from '@worksheets/trpc-charity';
import {
  useRouteChangeGuard,
  useToast,
  useUnsavedChangesWarning,
} from '../hooks';
import { Skeleton } from '../ui';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { PrefixInput } from '../forms/fields/prefix-input';
import { devRoutes, routes } from '@worksheets/routes';
import { DetailsSectionLayout } from './section-card-layout';
import { Loader2 } from 'lucide-react';
import { TeamSelectedQuery, TeamGamesReadQuery, TeamQuery } from '../types';

// Mock data for tags
const availableTags = Object.values(tags)
  .filter((tag) => !tag.special)
  .map((tag) => ({
    id: tag.id,
    label: tag.name.replace(/Games/, '').trim(),
  }));

export const DetailsForm: React.FC<{
  team: NonNullable<TeamSelectedQuery>;
  game: NonNullable<TeamGamesReadQuery>;
}> = ({ team, game }) => {
  const router = useRouter();
  const { toast } = useToast();

  const utils = trpc.useUtils();
  const update = trpc.user.teams.games.details.update.useMutation();
  const details = trpc.user.teams.games.details.read.useQuery({
    gameId: game.id,
  });

  const form = useForm<DetailsFormSchema>({
    resolver: zodResolver(detailsFormSchema),
    defaultValues: detailsFormDefaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    if (details.data) {
      form.reset(details.data);
    }
  }, [details.data, form]);

  useUnsavedChangesWarning(form.formState.isDirty);
  useRouteChangeGuard(form.formState.isDirty);

  const onSubmit = async (values: DetailsFormSchema) => {
    try {
      await update.mutateAsync({
        gameId: game.id,
        form: values,
      });
      await utils.user.teams.games.details.read.invalidate({
        gameId: game.id,
      });
      toast({
        title: 'Game details updated successfully',
        description: 'Your game details have been updated.',
        duration: 5000,
      });
    } catch (error) {
      const err = parseTRPCClientErrorMessage(error);
      toast({
        title: 'Error updating game details',
        description: err,
        variant: 'destructive',
      });
    }
  };

  const canSubmit =
    !update.isPending &&
    !details.isPending &&
    form.formState.isDirty &&
    !form.formState.isSubmitting &&
    form.formState.isValid;

  return (
    <DetailsSectionLayout>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8">
            <DetailsFormFields
              isPending={details.isPending}
              teamSlug={team.slug}
            />
            <div className={'flex gap-4 justify-end'}>
              {details.isPending ? (
                <Skeleton className="h-10 w-20" />
              ) : (
                <Button
                  variant="outline"
                  type="button"
                  disabled={!canSubmit}
                  onClick={() => router.push(devRoutes.dashboard.path())}
                >
                  Cancel
                </Button>
              )}
              {details.isPending ? (
                <Skeleton className="h-10 w-32" />
              ) : (
                <Button type="submit" disabled={!canSubmit}>
                  {update.isPending && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  {update.isPending ? 'Saving...' : 'Update'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </DetailsSectionLayout>
  );
};

export const DetailsFormFields: React.FC<{
  isPending: boolean;
  teamSlug: string | undefined;
}> = ({ isPending, teamSlug = 'my-team' }) => {
  const form = useFormContext<DetailsFormSchema>();
  const prefix = `${routes.baseUrl}/${teamSlug}/`;
  const gameSlug = form.watch('slug');

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                {isPending ? (
                  <Skeleton className="w-full h-10" />
                ) : (
                  <Input placeholder="Enter game title" {...field} />
                )}
              </FormControl>
              <FormDescription>
                The name of your game as it will appear to players.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Slug <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                {isPending ? (
                  <Skeleton className="w-full h-10" />
                ) : (
                  <PrefixInput
                    field={field}
                    prefix={prefix}
                    placeholder="my-game-name"
                  />
                )}
              </FormControl>
              <FormDescription>
                The unique identifier for your game. It will be part of the URL
                where players can access your game.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                {isPending ? (
                  <Skeleton className="w-full h-32" />
                ) : (
                  <Textarea
                    placeholder="Describe your game..."
                    className="min-h-32"
                    {...field}
                  />
                )}
              </FormControl>
              <FormDescription>
                Provide a detailed description of your game.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>
                  Tags <span className="text-red-500">*</span>
                </FormLabel>
                <FormDescription>
                  Select categories that best describe your game.
                </FormDescription>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {availableTags
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((tag) => (
                    <FormField
                      key={tag.id}
                      control={form.control}
                      name="tags"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={tag.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              {isPending ? (
                                <Skeleton className="w-4 h-4" />
                              ) : (
                                <Checkbox
                                  checked={field.value?.includes(tag.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, tag.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== tag.id
                                          )
                                        );
                                  }}
                                />
                              )}
                            </FormControl>
                            <FormLabel className="font-normal">
                              {tag.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="viewport"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>
                    Viewport <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormDescription>
                    Select the views that your game supports.
                  </FormDescription>
                </div>
                <FormControl>
                  {isPending ? (
                    <Skeleton className="w-72 h-10" />
                  ) : (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="max-w-72">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RESPONSIVE">Responsive</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="orientation"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>
                    Orientation <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormDescription>
                    Select the orientations that your game supports.
                  </FormDescription>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ORIENTATION_VALUES.map((device) => (
                    <FormItem
                      key={device.value}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        {isPending ? (
                          <Skeleton className="w-4 h-4" />
                        ) : (
                          <Checkbox
                            checked={field.value?.includes(device.value)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, device.value])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== device.value
                                    )
                                  );
                            }}
                          />
                        )}
                      </FormControl>
                      <FormLabel className="font-normal">
                        {device.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                  <FormMessage />
                </div>
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="devices"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>
                  Devices <span className="text-red-500">*</span>
                </FormLabel>
                <FormDescription>
                  Select the devices that your game supports.
                </FormDescription>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DEVICE_VALUES.map((device) => (
                  <FormField
                    key={device.value}
                    control={form.control}
                    name="devices"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={device.value}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            {isPending ? (
                              <Skeleton className="w-4 h-4" />
                            ) : (
                              <Checkbox
                                checked={field.value?.includes(device.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        device.value,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== device.value
                                        )
                                      );
                                }}
                              />
                            )}
                          </FormControl>
                          <FormLabel className="font-normal">
                            {device.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mb-4">
          <FormLabel>Legal Disclosures</FormLabel>
          <FormDescription>
            Required for compliance with platform policies and regulations.
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="aiDisclosure"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                {isPending ? (
                  <Skeleton className="w-4 h-4" />
                ) : (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              </FormControl>
              <FormLabel className="font-normal">
                AI-Generated Content Disclosure
              </FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
