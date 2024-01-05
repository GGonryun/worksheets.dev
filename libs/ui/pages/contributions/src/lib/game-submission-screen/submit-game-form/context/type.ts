import { GameFile, ImageFile, SubmitGameForm } from '@worksheets/util/types';

export type FormFields = SubmitGameForm;

export type FormFieldsKeys = keyof SubmitGameForm;

export type FormContextType = {
  errors: Record<FormFieldsKeys, string>;
  values: SubmitGameForm;
  onSubmit: () => void;
  setFieldValue: <T extends FormFieldsKeys>(
    field: T,
    value: SubmitGameForm[T]
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
