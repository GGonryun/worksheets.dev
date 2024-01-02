import { z } from '@worksheets/zod';
import { ChangeEvent, FocusEvent, FormEvent } from 'react';

type ProjectType = 'html' | 'page';
type SupportedDevice = 'computer' | 'mobile';
type SupportedOrientation = 'landscape' | 'portrait';
export type FileStatus = 'ready' | 'uploading' | 'uploaded' | 'error';
type ViewportType = 'fixed' | 'responsive';

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
  status: FileStatus;
  name: string;
  size: number;
  lastModified: number;
  url?: string;
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
};
