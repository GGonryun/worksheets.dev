'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Facebook,
  Twitter,
  Globe,
  Instagram,
  MessageSquare,
} from 'lucide-react';
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
import { ActionsLayout } from './actions-layout';

export const SocialLinksStep: React.FC<{ onPrev: () => void }> = ({
  onPrev,
}) => {
  const form = useFormContext<CreateTeamSchema>();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Social Links</h2>
        <p className="text-muted-foreground mt-2">
          Connect your social media accounts
        </p>
      </div>

      <SocialLinksFields />

      <ActionsLayout>
        <Button variant="outline" onClick={onPrev}>
          Back
        </Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Submit
        </Button>
      </ActionsLayout>
    </div>
  );
};

export const SocialLinksFields = () => {
  const form = useFormContext<CreateTeamSchema>();
  return (
    <>
      <FormField
        control={form.control}
        name="links.twitter"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1.5">
              <Twitter className="h-4 w-4" />
              Twitter
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="https://twitter.com/yourusername"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="links.facebook"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1.5">
              <Facebook className="h-4 w-4" />
              Facebook
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="https://facebook.com/yourpage" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="links.itchio"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              itch.io
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="https://yourstudio.itch.io" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="links.instagram"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1.5">
              <Instagram className="h-4 w-4" />
              Instagram
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="https://instagram.com/yourusername"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="links.discord"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              Discord
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="https://discord.gg/yourinvite" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
