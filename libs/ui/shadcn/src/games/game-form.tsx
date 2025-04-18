'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';
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
import { useState } from 'react';
import { useRouter } from 'next/router';
import { CHARITY_GAMES_BASE_URL } from '@worksheets/ui/env';
import {
  gameFormDefaultValues,
  gameFormSchema,
  GameFormSchema,
} from '@worksheets/util/types';

// Mock data for tags
const availableTags = [
  { id: 'action', label: 'Action' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'puzzle', label: 'Puzzle' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'simulation', label: 'Simulation' },
  { id: 'sports', label: 'Sports' },
  { id: 'racing', label: 'Racing' },
  { id: 'rpg', label: 'RPG' },
  { id: 'shooter', label: 'Shooter' },
  { id: 'platformer', label: 'Platformer' },
];

const supportedDevices = [
  { id: 'mobile-landscape', label: 'Mobile (Landscape)' },
  { id: 'mobile-portrait', label: 'Mobile (Portrait)' },
  { id: 'desktop', label: 'Desktop' },
];

export function GameForm({
  gameId,
  onSave,
}: {
  gameId: string;
  onSave: (schema: GameFormSchema) => Promise<void>;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with default values
  const form = useForm<GameFormSchema>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: gameFormDefaultValues,
  });

  // Handle form submission
  const onSubmit = async (values: GameFormSchema) => {
    setIsLoading(true);
    await onSave(values);
    setIsLoading(false);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8">
          <GameFormFields />
          <div className={'flex gap-4 justify-end'}>
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push('/dashboard')}
              disabled={!gameId}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Update Game
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export const GameFormFields: React.FC = () => {
  const form = useFormContext<GameFormSchema>();

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
                <Input placeholder="Enter game title" {...field} />
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
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="enter-game-slug" {...field} />
              </FormControl>
              <FormDescription>
                Used in the URL: {CHARITY_GAMES_BASE_URL}/play/
                {field.value || 'your-slug'}
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
                <Textarea
                  placeholder="Describe your game..."
                  className="min-h-32"
                  {...field}
                />
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
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Instructions <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="How to play..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Explain how to play your game, including controls and
                objectives.
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableTags.map((tag) => (
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
          name="devices"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>
                  Supported Devices <span className="text-red-500">*</span>
                </FormLabel>
                <FormDescription>
                  Select the devices your game supports.
                </FormDescription>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {supportedDevices.map((device) => (
                  <FormField
                    key={device.id}
                    control={form.control}
                    name="devices"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={device.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(device.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, device.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== device.id
                                      )
                                    );
                              }}
                            />
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
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
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
