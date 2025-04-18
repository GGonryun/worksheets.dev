import { z } from 'zod';

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
  instructions: z.string().min(10, {
    message: 'Instructions must be at least 10 characters.',
  }),
  tags: z.array(z.string()).min(1, {
    message: 'Select at least one tag.',
  }),
  devices: z.array(z.string()).min(1, {
    message: 'Select at least one device.',
  }),
  aiDisclosure: z.boolean(),
});

export type GameFormSchema = z.infer<typeof gameFormSchema>;

export const gameFormDefaultValues: GameFormSchema = {
  title: '',
  slug: '',
  description: '',
  instructions: '',
  tags: [],
  devices: [],
  aiDisclosure: false,
};

export const mediaFormSchema = z.object({
  thumbnail: z.string().min(1, {
    message: 'Thumbnail is required',
  }),
  coverImage: z.string().min(1, {
    message: 'Cover image is required',
  }),
  trailerUrl: z.string().url().optional().or(z.literal('')),
});

export type MediaFormSchema = z.infer<typeof mediaFormSchema>;

export const mediaFormDefaultValues: MediaFormSchema = {
  thumbnail: '',
  coverImage: '',
  trailerUrl: '',
};

export const versionFormSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/, {
    message: 'Version must be in format x.y.z (e.g., 1.0.0)',
  }),
  gameFile: z.string().min(1, {
    message: 'Game file is required',
  }),
  notes: z.string().optional(),
});

export type VersionFormSchema = z.infer<typeof versionFormSchema>;

export const versionFormDefaultValues: VersionFormSchema = {
  version: '',
  gameFile: '',
  notes: '',
};

export const createGameFormSchema = gameFormSchema
  .merge(mediaFormSchema)
  .merge(versionFormSchema);
export type CreateGameFormSchema = z.infer<typeof createGameFormSchema>;

export const createGameFormDefaultValues = {
  ...gameFormDefaultValues,
  ...mediaFormDefaultValues,
  ...versionFormDefaultValues,
};
