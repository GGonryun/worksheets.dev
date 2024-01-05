import {
  GameCategory as NativeGameCategory,
  ProjectType as NativeProjectType,
  ViewportType as NativeViewportType,
} from '@prisma/client';
import { z } from '@worksheets/zod';

export type GameCategory = NativeGameCategory;
export type ProjectType = NativeProjectType;
export type ViewportType = NativeViewportType;

export const ImageFileSchema = z
  .object({
    id: z.string(),
    name: z.string(),
  })
  .and(
    z.union([
      z.object({
        status: z.literal('uploaded'),
        src: z.string(),
        height: z.number(),
        width: z.number(),
      }),
      z.object({
        status: z.literal('uploading'),
      }),
    ])
  );

export type ImageFile = z.infer<typeof ImageFileSchema>;

export const GameFileSchema = z.object({
  status: z.enum(['uploaded', 'uploading']),
  name: z.string(),
  size: z.number(),
  lastModified: z.number(),
  url: z.string().optional(),
});

export type GameFile = z.infer<typeof GameFileSchema>;

export const PurchaseOptionSchema = z.object({
  steam: z.string(),
  itch: z.string(),
  googlePlay: z.string(),
  appStore: z.string(),
  windowsStore: z.string(),
  amazon: z.string(),
  gameJolt: z.string(),
  website: z.string(),
});
export type PurchaseOptions = z.infer<typeof PurchaseOptionSchema>;

export const SupportedDevicesSchema = z.object({
  computer: z.boolean(),
  mobile: z.boolean(),
});
export type SupportedDevices = z.infer<typeof SupportedDevicesSchema>;

export type SupportedDeviceKeys = keyof SupportedDevices;

export const SupportedOrientationsSchema = z.object({
  landscape: z.boolean(),
  portrait: z.boolean(),
});

export type SupportedOrientations = z.infer<typeof SupportedOrientationsSchema>;

export type SupportedOrientationKeys = keyof SupportedOrientations;

export const SubmitGameFormSchema = z.object({
  title: z.string().max(63),
  tagline: z.string().max(255),
  gameId: z.string(),
  projectType: z.nativeEnum(NativeProjectType).optional(),
  externalWebsiteUrl: z.string(),
  gameFile: GameFileSchema.optional(),
  viewport: z.nativeEnum(NativeViewportType).optional(),
  dimensions: z
    .object({
      height: z.number().int().positive(),
      width: z.number().int().positive(),
    })
    .optional(),
  supportedDevices: SupportedDevicesSchema,
  supportedOrientations: SupportedOrientationsSchema,
  description: z.string(),
  instructions: z.string(),
  category: z.nativeEnum(NativeGameCategory).optional(),
  tags: z.array(z.string()),
  thumbnail: ImageFileSchema.optional(),
  cover: ImageFileSchema.optional(),
  screenshots: z.array(ImageFileSchema),
  trailer: z.string(),
  purchaseOptions: PurchaseOptionSchema.partial(),
});

export type SubmitGameForm = z.infer<typeof SubmitGameFormSchema>;
