'use client';

import type { UseFormReturn } from 'react-hook-form';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

interface TeamSocialFormProps {
  form: UseFormReturn<any>;
}

export function TeamSocialForm({ form }: TeamSocialFormProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="twitter"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Twitter</FormLabel>
            <FormControl>
              <div className="relative">
                <Twitter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="https://twitter.com/yourusername"
                  {...field}
                />
              </div>
            </FormControl>
            <FormDescription>Your team's Twitter profile URL.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="facebook"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Facebook</FormLabel>
            <FormControl>
              <div className="relative">
                <Facebook className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="https://facebook.com/yourpage"
                  {...field}
                />
              </div>
            </FormControl>
            <FormDescription>Your team's Facebook page URL.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="instagram"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instagram</FormLabel>
            <FormControl>
              <div className="relative">
                <Instagram className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="https://instagram.com/yourusername"
                  {...field}
                />
              </div>
            </FormControl>
            <FormDescription>
              Your team's Instagram profile URL.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="linkedin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>LinkedIn</FormLabel>
            <FormControl>
              <div className="relative">
                <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="https://linkedin.com/company/yourcompany"
                  {...field}
                />
              </div>
            </FormControl>
            <FormDescription>
              Your team's LinkedIn company page URL.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
