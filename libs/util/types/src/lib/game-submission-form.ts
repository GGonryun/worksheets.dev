import {
  DeviceOrientations,
  GameDevices,
  GameSubmissionStatus,
  ProjectType,
  ViewportType,
} from '@prisma/client';
import { validateHttpsUrl } from '@worksheets/util/strings';
import { z } from 'zod';

import { gameTagSchema } from './tag-schema';
export type {
  DeviceOrientations,
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

export const storedFileSchema = z.object({
  fileId: z.string(),
  type: z.string(),
  size: z.number(),
  name: z.string(),
  timestamp: z.number(),
  url: z.string(),
});

export const gameSubmissionFormSchema = z.object({
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
    .min(4, 'Game ID must be at least 4 characters')
    .max(120, 'Game ID must be at most 120 characters')
    .regex(
      /^[a-z0-9-]+$/,
      'Game ID can only contain lowercase letters, numbers, and dashes'
    ),
  headline: z
    .string()
    .min(3, 'Headline must be at least 3 characters')
    .max(100, 'Headline must be at most 100 characters'),
  projectType: z.nativeEnum(ProjectType),
  externalWebsiteUrl: z.string().nullable(),
  viewport: z.nativeEnum(ViewportType),
  viewportWidth: z
    .number()
    .int(
      `Viewport Width must be a whole number. Did you mean to use a decimal?`
    )
    .positive(`Viewport Width must be a positive number`)
    .min(200, `Viewport Width must be greater than 200 pixels`)
    .max(1920, `Viewport Width must be less than 1920 pixels`)
    .nullable(),
  viewportHeight: z
    .number()
    .int(
      `Viewport Height must be a whole number. Did you mean to use a decimal?`
    )
    .positive(`Viewport Height must be a positive number`)
    .min(120, `Viewport Height must be greater than 120 pixels`)
    .max(1080, `Viewport Height must be less than 1080 pixels`)
    .nullable(),
  devices: z
    .nativeEnum(GameDevices)
    .array()
    // we use refine instead of 'nonempty' to prevent z.custom from picking up validation
    .refine(
      (value) => value.length > 0,
      `You must support at least one type of device`
    ),
  // TODO: add validation to ensure that the orientations are set if devices contains mobile.
  orientations: z.nativeEnum(DeviceOrientations).array(),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Descriptions should be brief; do not exceed 1000 characters'),
  instructions: z
    .string()
    .min(12, 'Instructions must be at least 12 characters')
    .max(1000, 'Instructions should be brief; do not exceed 1000 characters'),
  categories: z.union([z.string(), gameTagSchema]).array(),
  // handle game file upload validation in strict form because of dependencies on other fields.
  gameFile: storedFileSchema.nullable(),
  thumbnailFile: storedFileSchema.nullable(),
  coverFile: storedFileSchema.nullable(),
  trailerUrl: z.union([
    z.string().url(`Trailer URL must be a valid Youtube or Vimeo link`),
    z.string().length(0),
  ]),
  markets: purchaseOptionSchema.partial(),
});

export const strictGameSubmissionFormSchema = gameSubmissionFormSchema
  .refine(
    (schema) => {
      if (schema.devices.includes(GameDevices.MOBILE)) {
        return schema.orientations.length > 0;
      }
      return true;
    },
    {
      message: 'At least one device orientation is required for mobile devices',
      // message only applies to the orientations field
      path: ['orientations'],
    }
  )
  .refine(
    (schema) => {
      // external website url is required if project type is web
      if (schema.projectType === ProjectType.EXTERNAL) {
        // external website url is valid url
        if (schema.externalWebsiteUrl === null) {
          return false;
        }

        return validateHttpsUrl(`https://${schema.externalWebsiteUrl}`);
      }
      return true;
    },
    {
      message: 'The external website URL must be a valid URL',
      // message only applies to the externalWebsiteUrl field
      path: ['externalWebsiteUrl'],
    }
  )
  .refine(
    (values) => {
      // do not allow empty tags
      if (values.categories.length === 0) {
        return false;
      }
      return true;
    },
    {
      message: 'At least one category is required',
      // message only applies to the tags field
      path: ['categories'],
    }
  )
  .refine(
    (values) => {
      // do not allow empty game file if project type is html.
      if (values.projectType === ProjectType.HTML && !values.gameFile?.url) {
        return false;
      }
      return true;
    },
    {
      message: 'A game file is required for HTML projects',
      // message only applies to the gameFile field
      path: ['gameFile'],
    }
  )
  .refine(
    (values) => {
      // do not allow empty cover images
      if (!values.coverFile?.url) {
        return false;
      }
      return true;
    },
    {
      message: 'A cover image is required',
      // message only applies to the coverFile field
      path: ['coverFile'],
    }
  )
  .refine(
    (values) => {
      // do not allow empty thumbnail images
      if (!values.thumbnailFile?.url) {
        return false;
      }
      return true;
    },
    {
      message: 'A thumbnail image is required',
      // message only applies to the thumbnailFile field
      path: ['thumbnailFile'],
    }
  );

export type GameSubmissionForm = z.infer<typeof gameSubmissionFormSchema>;
export type GameSubmissionFormKeys = keyof GameSubmissionForm;
export type GameSubmissionFormErrors = Record<GameSubmissionFormKeys, string>;

export type GameSubmissionFileKeys = Extract<
  GameSubmissionFormKeys,
  'gameFile' | 'thumbnailFile' | 'coverFile'
>;

export type GameSubmissionFormContextType = {
  errors: GameSubmissionFormErrors;
  values: GameSubmissionForm;
  isValid: boolean;
  isUpdated: boolean;
  loading: boolean;
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

export const FILE_ID_FIELD_MAP: {
  [key in GameSubmissionFileKeys]: string;
} = {
  // TODO: use a union type to ensure that the keys are always in sync.
  gameFile: 'gameFileId',
  coverFile: 'coverFileId',
  thumbnailFile: 'thumbnailFileId',
};
