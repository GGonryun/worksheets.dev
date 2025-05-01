'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

import { SectionCardLayout } from '../games/section-card-layout';
import { devRoutes } from '@worksheets/routes';
import Link from 'next/link';
import { SocialLinksFields, TeamStep, TeamStepFields } from '../onboarding';
import { FormProvider, SubmitErrorHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createTeamDefaultValues,
  CreateProfileFormSchema,
  createProfileFormSchema,
  socialLinksDefaultValues,
  socialLinksSchema,
  SocialLinksSchema,
} from '@worksheets/util/types';
import { ActionsLayout } from '../onboarding/actions-layout';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '../errors';
import { Skeleton } from '../ui';
import { TeamSelectedQuery } from '../types';
import { useToast } from '../hooks';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { useEffect } from 'react';
import { z } from 'zod';

// This would typically come from your database
const defaultValues = {
  name: 'Acme Inc',
  description: 'We make everything',
  image: '/placeholder.svg?height=150&width=150',
  twitter: 'https://twitter.com/acme',
  facebook: 'https://facebook.com/acme',
  instagram: 'https://instagram.com/acme',
  linkedin: 'https://linkedin.com/company/acme',
};

export const TeamSettingsContent: React.FC<{
  activeTab: 'profile' | 'social' | 'sensitive';
  team: NonNullable<TeamSelectedQuery>;
}> = ({ activeTab, team }) => {
  return (
    <div className="container py-2 space-y-6">
      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" asChild>
            <Link href={devRoutes.dashboard.settings.profile.path()}>
              Profile
            </Link>
          </TabsTrigger>
          <TabsTrigger value="social" asChild>
            <Link href={devRoutes.dashboard.settings.social.path()}>
              Social Links
            </Link>
          </TabsTrigger>
          <TabsTrigger value="sensitive" asChild>
            <Link href={devRoutes.dashboard.settings.sensitive.path()}>
              Danger Zone
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <SectionCardLayout
            title="Team Profile"
            description="Update your team's basic information"
          >
            <TeamProfileStep team={team} />
          </SectionCardLayout>
        </TabsContent>
        <TabsContent value="social" className="mt-6">
          <SectionCardLayout
            title="Social Links"
            description="Connect your team's social media accounts"
          >
            <TeamLinksStep team={team} />
          </SectionCardLayout>
        </TabsContent>
        <TabsContent value="sensitive" className="mt-6">
          <SectionCardLayout
            title="Danger Zone"
            description="Delete your team and all its data"
          >
            <div>TODO</div>
          </SectionCardLayout>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const TeamProfileStep: React.FC<{ team: NonNullable<TeamSelectedQuery> }> = ({
  team,
}) => {
  const { toast } = useToast();

  const utils = trpc.useUtils();

  const form = useForm<CreateProfileFormSchema>({
    resolver: zodResolver(createProfileFormSchema),
    mode: 'onChange',
    defaultValues: {
      ...createTeamDefaultValues,
      name: team.name,
      description: team.description,
      logo: team.logo,
      slug: team.slug,
    },
  });

  useEffect(() => {
    form.reset({
      ...createTeamDefaultValues,
      name: team.name,
      description: team.description,
      logo: team.logo,
      slug: team.slug,
    });
  }, [team, form]);

  const updateProfile = trpc.user.teams.profile.update.useMutation();

  const onSubmit = async (data: CreateProfileFormSchema) => {
    try {
      await updateProfile.mutateAsync({
        name: data.name,
        description: data.description,
        logo: data.logo,
      });
      form.reset({
        name: data.name,
        description: data.description,
        logo: data.logo,
        slug: data.slug,
      });
      await utils.user.teams.selected.invalidate();
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error updating profile',
        description: parseTRPCClientErrorMessage(error),
        variant: 'destructive',
      });
    }
  };

  const onInvalid: SubmitErrorHandler<CreateProfileFormSchema> = (errors) => {
    console.error(
      'Your submission has errors. Fix them and try again.',
      errors
    );
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="space-y-8"
      >
        <TeamStepFields editing />
        <ActionsLayout>
          <div />
          <Button
            type="submit"
            disabled={
              updateProfile.isPending ||
              !form.formState.isValid ||
              !form.formState.isDirty
            }
          >
            {updateProfile.isPending && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {updateProfile.isPending ? 'Updating...' : 'Update'}
          </Button>
        </ActionsLayout>
      </form>
    </FormProvider>
  );
};

const TeamLinksStep: React.FC<{
  team: NonNullable<TeamSelectedQuery>;
}> = ({ team }) => {
  const { toast } = useToast();

  const utils = trpc.useUtils();

  const form = useForm<{ links: SocialLinksSchema }>({
    resolver: zodResolver(z.object({ links: socialLinksSchema })),
    mode: 'onChange',
    defaultValues: {
      links: {
        ...socialLinksDefaultValues,
        ...team.links,
      },
    },
  });

  const updateLinks = trpc.user.teams.links.update.useMutation();

  const onSubmit = async (data: { links: SocialLinksSchema }) => {
    try {
      await updateLinks.mutateAsync(data.links);
      form.reset(data);
      await utils.user.teams.selected.invalidate();
      toast({
        title: 'Social Links updated',
        description: 'Your social links have been updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error updating social links',
        description: parseTRPCClientErrorMessage(error),
        variant: 'destructive',
      });
    }
  };

  const onInvalid: SubmitErrorHandler<CreateProfileFormSchema> = (errors) => {
    console.error(
      'Your submission has errors. Fix them and try again.',
      errors
    );
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="space-y-8"
      >
        <SocialLinksFields />
        <ActionsLayout>
          <div />
          <Button
            type="submit"
            disabled={
              updateLinks.isPending ||
              !form.formState.isValid ||
              !form.formState.isDirty
            }
          >
            {updateLinks.isPending && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {updateLinks.isPending ? 'Updating...' : 'Update'}
          </Button>
        </ActionsLayout>
      </form>
    </FormProvider>
  );
};
