'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormProvider,
  useForm,
  useFormContext,
  UseFormReturn,
} from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { cn } from '../utils';
import { isEqual } from 'lodash';
import { CHARITY_GAMES_BASE_URL } from '@worksheets/ui/env';

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

// Mock data for a game (used when editing)
const mockGame = {
  id: '1',
  title: 'Space Explorer',
  slug: 'space-explorer',
  description:
    'An exciting space adventure game where you explore distant planets and encounter alien species.',
  tags: ['action', 'adventure'],
  aiDisclosure: true,
  coverImage: '/placeholder.svg?height=400&width=600',
  screenshots: [
    '/placeholder.svg?height=400&width=600',
    '/placeholder.svg?height=400&width=600',
  ],
  trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
};

export const gameFormSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must be at least 3 characters.',
  }),
  slug: z
    .string()
    .min(3, {
      message: 'Slug must be at least 3 characters.',
    })
    .regex(/^[a-z0-9-]+$/, {
      message: 'Slug can only contain lowercase letters, numbers, and hyphens.',
    }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  tags: z.array(z.string()).min(1, {
    message: 'Select at least one tag.',
  }),
  aiDisclosure: z.boolean(),
});

export type GameFormSchema = z.infer<typeof gameFormSchema>;

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
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      tags: [],
      aiDisclosure: false,
    },
  });

  // Load game data if editing
  useEffect(() => {
    if (gameId) {
      // In a real app, you would fetch the game data from an API
      // For this example, we'll use mock data
      form.reset({
        title: mockGame.title,
        slug: mockGame.slug,
        description: mockGame.description,
        tags: mockGame.tags,
        aiDisclosure: mockGame.aiDisclosure,
      });
    }
  }, [gameId, form]);

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
              <FormLabel>Title</FormLabel>
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
              <FormLabel>Description</FormLabel>
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
          name="tags"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Tags</FormLabel>
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
