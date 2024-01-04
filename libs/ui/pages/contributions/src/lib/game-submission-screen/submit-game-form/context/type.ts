import { z } from '@worksheets/zod';
import { ChangeEvent, FocusEvent, FormEvent } from 'react';

type ProjectType = 'html' | 'page';
type SupportedDevice = 'computer' | 'mobile';
type SupportedOrientation = 'landscape' | 'portrait';
export type FileStatus = 'idle' | 'uploading' | 'uploaded' | 'error';
type ViewportType = 'fixed' | 'responsive';
export type ImageFile = {
  id: string;
  name: string;
} & (
  | {
      status: 'uploaded';
      src: string;
      height: number;
      width: number;
    }
  | {
      status: 'uploading';
    }
);

const gameCategorySchema = z.union([
  z.literal('action'),
  z.literal('adventure'),
  z.literal('arcade'),
  z.literal('board'),
  z.literal('card'),
  z.literal('educational'),
  z.literal('fighting'),
  z.literal('idle'),
  z.literal('novel'),
  z.literal('platformer'),
  z.literal('puzzle'),
  z.literal('racing'),
  z.literal('rhythm'),
  z.literal('role-playing'),
  z.literal('shooter'),
  z.literal('simulation'),
  z.literal('sports'),
  z.literal('strategy'),
  z.literal('survival'),
  z.literal('trivia'),
  z.literal('word'),
]);

type GameCategory = z.infer<typeof gameCategorySchema>;

type GameFile = {
  id: string;
  status: FileStatus;
  name: string;
  size: number;
  lastModified: number;
  url?: string;
};

export type PurchaseOptions = {
  steam: string;
  itch: string;
  googlePlay: string;
  appStore: string;
  windowsStore: string;
  amazon: string;
  gameJolt: string;
  website: string;
};

export type FormFields = {
  title: string;
  tagline: string;
  gameId: string;
  projectType: ProjectType | undefined;
  externalWebsiteUrl: string;
  gameFile: GameFile | undefined;
  viewport: ViewportType | undefined;
  dimensions: { height: number; width: number } | undefined;
  supportedDevices: Record<SupportedDevice, boolean>;
  supportedOrientations: Record<SupportedOrientation, boolean>;
  description: string;
  instructions: string;
  category: GameCategory;
  tags: string[];
  thumbnail: ImageFile | undefined;
  cover: ImageFile | undefined;
  screenshots: ImageFile[];
  trailer: string;
  purchaseOptions: Partial<PurchaseOptions>;
};

export type FormFieldsKeys = keyof FormFields;

export type FormContextType = {
  errors: Record<FormFieldsKeys, string>;
  touched: Record<FormFieldsKeys, boolean>;
  values: FormFields;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLInputElement>) => void;
  setFieldValue: <T extends FormFieldsKeys>(
    field: T,
    value: FormFields[T]
  ) => void;
  setFieldTouched: <T extends FormFieldsKeys>(
    field: T,
    touched: boolean
  ) => void;
  uploadGame: (file: File) => Promise<void>;
  deleteGame: (game: GameFile) => Promise<void>;

  uploadThumbnail: (file: File | undefined) => Promise<void>;
  deleteThumbnail: (image: ImageFile) => Promise<void>;

  uploadCover: (file: File | undefined) => Promise<void>;
  deleteCover: (image: ImageFile) => Promise<void>;

  uploadScreenshots: (file: FileList | null) => Promise<void>;
  deleteScreenshot: (image: ImageFile) => Promise<void>;
};
