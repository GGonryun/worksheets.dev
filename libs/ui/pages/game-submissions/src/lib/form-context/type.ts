import {
  DeviceOrientations,
  GameCategory,
  GameDevices,
  GameSubmissionStatus,
  ProjectType,
  ViewportType,
} from '@prisma/client';
import { z } from '@worksheets/zod';

export type {
  DeviceOrientations,
  GameCategory,
  GameDevices,
  GameSubmissionStatus,
  ProjectType,
  ViewportType,
};

export const purchaseOptionSchema = z.object({
  steam: z.string(),
  itch: z.string(),
  googlePlay: z.string(),
  appStore: z.string(),
  windowsStore: z.string(),
  amazon: z.string(),
  gameJolt: z.string(),
  website: z.string(),
});

export const gameSubmissionFormSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .regex(
      /^[a-zA-Z0-9 ]+$/,
      `Title can only contain letters, numbers, and spaces`
    ),
  slug: z
    .string()
    .min(3, 'Game ID must be at least 3 characters')
    .max(50, 'Game ID must be at most 50 characters')
    .regex(
      /^[a-z0-9-]+$/,
      'Game ID can only contain lowercase letters, numbers, and dashes'
    ),
  // TODO: add validation for all fields.
  headline: z.string(),
  projectType: z.nativeEnum(ProjectType),
  externalWebsiteUrl: z.string(),
  viewport: z.nativeEnum(ViewportType),
  viewportWidth: z.number().int().nullable(),
  viewportHeight: z.number().int().nullable(),
  devices: z.nativeEnum(GameDevices).array(),
  orientations: z.nativeEnum(DeviceOrientations).array(),
  description: z.string(),
  instructions: z.string(),
  category: z.nativeEnum(GameCategory),
  tags: z.string().array(),
  gameFileUrl: z.string(),
  thumbnailUrl: z.string(),
  trailerUrl: z.string(),
  coverUrl: z.string(),
  status: z.nativeEnum(GameSubmissionStatus),
  profileId: z.string(),
  markets: purchaseOptionSchema.partial(),
});

export type GameSubmissionForm = z.infer<typeof gameSubmissionFormSchema>;
export type GameSubmissionFormKeys = keyof GameSubmissionForm;
export type GameSubmissionFormErrors = Record<GameSubmissionFormKeys, string>;

export type GameSubmissionFileKeys = Extract<
  GameSubmissionFormKeys,
  'gameFileUrl' | 'thumbnailUrl' | 'coverUrl'
>;

export type GameSubmissionFormContextType = {
  errors: GameSubmissionFormErrors;
  values: GameSubmissionForm;
  isValid: boolean;
  isUpdated: boolean;
  // a submission performs validation and then submits the form for review.
  onSubmit: () => void;
  // an update ignores validation and saves the form as a draft.
  onUpdate: () => void;
  setFieldValue: <T extends GameSubmissionFormKeys>(
    field: T,
    value: GameSubmissionForm[T]
  ) => void;
  upload: (
    field: GameSubmissionFileKeys,
    files: FileList | null
  ) => Promise<void>;
  destroy: (field: GameSubmissionFileKeys, url?: string) => Promise<void>;
};
