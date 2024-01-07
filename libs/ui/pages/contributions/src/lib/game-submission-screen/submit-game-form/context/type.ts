import { FileUpload, SubmitGameForm } from '@worksheets/util/types';

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

  // TODO: is it possible to fuse all the upload/delete methods into one?

  uploadGame: (file: File) => Promise<void>;
  deleteGame: (game: FileUpload) => Promise<void>;

  uploadThumbnail: (file: File) => Promise<void>;
  deleteThumbnail: (image: FileUpload) => Promise<void>;

  uploadCover: (file: File) => Promise<void>;
  deleteCover: (image: FileUpload) => Promise<void>;

  uploadScreenshots: (file: FileList) => Promise<void>;
  deleteScreenshot: (image: FileUpload) => Promise<void>;
};
