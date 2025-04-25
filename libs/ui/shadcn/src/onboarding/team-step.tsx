'use client';

import type React from 'react';

import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { routes } from '@worksheets/routes';
import { useFormContext } from 'react-hook-form';
import { CreateTeamSchema } from '@worksheets/util/types';
import {
  Button,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui';
import { FileUploader } from '../forms/fields/file-uploader';
import {
  MAX_BASIC_IMAGE_SIZE,
  VALID_BASIC_IMAGE_TYPES,
} from '@worksheets/util/settings';
import { ActionsLayout } from './actions-layout';
import { Link2Icon, Loader2 } from 'lucide-react';
import { trpc } from '@worksheets/trpc-charity';
import { PrefixInput } from '../forms/fields/prefix-input';
import { SectionCardLayout } from '../games/section-card-layout';
import Link from 'next/link';

export const TeamStep: React.FC<{
  onNext: () => void;
  onPrev: () => void;
}> = ({ onNext, onPrev }) => {
  const form = useFormContext<CreateTeamSchema>();
  const check = trpc.user.teams.checkSlug.useMutation();

  const handleBack = () => {
    onPrev();
  };

  const handleNext = async () => {
    const validate = await form.trigger([
      'name',
      'slug',
      'logo',
      'description',
    ]);
    if (validate) {
      const result = await check.mutateAsync({
        slug: form.getValues('slug'),
      });
      if (result.exists) {
        form.setError('slug', {
          type: 'manual',
          message: 'This slug is already taken',
        });
        return;
      }
      onNext();
    }
  };

  return (
    <SectionCardLayout title="Profile" description="Tell us about your team">
      <div className="space-y-6">
        <TeamStepFields />

        <ActionsLayout>
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>

          <Button type="button" onClick={handleNext} disabled={check.isPending}>
            {check.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Next
          </Button>
        </ActionsLayout>
      </div>
    </SectionCardLayout>
  );
};

export const TeamStepFields: React.FC<{ editing?: boolean }> = ({
  editing,
}) => {
  const form = useFormContext<CreateTeamSchema>();

  const url = routes.team.url({
    params: {
      teamSlug: form.getValues('slug'),
    },
  });

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter your team name" required />
            </FormControl>
            <FormDescription>
              {field.value.length}/50 characters
            </FormDescription>

            <FormMessage />
          </FormItem>
        )}
      />

      {editing ? (
        <div>
          <FormItem>
            <FormLabel>Slug</FormLabel>
            <Link
              href={url}
              className="flex rounded-md border border-input ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 w-fit items-center p-2 text-muted-foreground text-sm whitespace-nowrap bg-muted/40 gap-1.5 hover:bg-muted/60 hover:underline"
            >
              <Link2Icon className="h-4 w-4" />
              {url}
            </Link>
            <FormDescription>
              This is the unique identifier for your team. If you want to change
              your slug, please contact support.
            </FormDescription>
          </FormItem>
        </div>
      ) : (
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Slug <span className="text-red-500">*</span>
              </FormLabel>
              <PrefixInput
                field={field}
                prefix={`${routes.baseUrl}/`}
                placeholder="your-team"
                disabled={editing}
              />
              <FormDescription>
                This is the unique identifier for your team. This value cannot
                be changed later.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="logo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Logo <span className="text-red-500">*</span>
            </FormLabel>
            <FileUploader
              fieldId={field.name}
              type="image"
              name="Team Logo"
              label="Upload your team's logo"
              description="This image will be displayed on your team page and in marketing materials."
              requirements={['For best results use an aspect ratio of 16:9']}
              restrictions={{
                maxSize: MAX_BASIC_IMAGE_SIZE,
                fileTypes: VALID_BASIC_IMAGE_TYPES,
                minHeight: 256,
                minWidth: 256,
                square: true,
              }}
            />
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
              Short Description <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Briefly describe your team"
                rows={4}
                required
                {...field}
              />
            </FormControl>
            <FormDescription>
              {field.value.length}/250 characters
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
