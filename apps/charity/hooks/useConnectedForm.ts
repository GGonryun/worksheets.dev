import { trpc } from '@worksheets/trpc-charity';
import { FormContextType } from '@worksheets/ui/pages/contributions';
import { GameFile, ImageFile } from '@worksheets/util/types';
import { useState } from 'react';

type FormContextErrors = FormContextType['errors'];
type FormContextValues = FormContextType['values'];

const initialErrors = {
  title: '',
  tagline: '',
  gameId: '',
  projectType: '',
  externalWebsiteUrl: '',
  gameFile: '',
  viewport: '',
  dimensions: '',
  supportedDevices: '',
  supportedOrientations: '',
  description: '',
  instructions: '',
  category: '',
  tags: '',
  thumbnail: '',
  cover: '',
  screenshots: '',
  trailer: '',
  purchaseOptions: '',
};

const initialValues: FormContextValues = {
  title: '',
  tagline: '',
  gameId: '',
  projectType: undefined,
  externalWebsiteUrl: '',
  gameFile: undefined,
  viewport: undefined,
  dimensions: undefined,
  supportedDevices: {
    computer: true,
    mobile: true,
  },
  supportedOrientations: {
    landscape: true,
    portrait: true,
  },
  description: '',
  instructions: '',
  category: undefined,
  tags: [],
  thumbnail: undefined,
  cover: undefined,
  screenshots: [],
  trailer: '',
  purchaseOptions: {},
};

export const useConnectedForm = (): FormContextType => {
  const [errors, setErrors] = useState<FormContextErrors>(initialErrors);
  const [values, setValues] = useState<FormContextValues>(initialValues);

  const submitForm = trpc.submissions.send.useMutation();
  const prepare = trpc.files.prepare.useMutation();

  return {
    errors,
    values,
    onSubmit: async () => await submitForm.mutateAsync(values),
    setFieldValue: (field, values) =>
      setValues((prev) => ({ ...prev, [field]: values })),
    uploadGame: async (file) => {
      const prepareData = await prepare.mutateAsync({
        name: file.name,
        type: file.type,
        size: file.size,
      });

      const gameFile: GameFile = {
        name: file.name,
        status: 'uploading',
        size: file.size,
        lastModified: file.lastModified,
        url: prepareData.downloadUrl,
      };

      setValues((prev) => ({
        ...prev,
        gameFile,
      }));

      await fetch(prepareData.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          // content type zip
          'Content-Type': 'application/zip',
        },
      });

      setValues((prev) => ({
        ...prev,
        gameFile: {
          ...gameFile,
          status: 'uploaded',
        },
      }));
    },
    deleteGame: function (game: GameFile): Promise<void> {
      // TODO: update the game file field immediately.
      // TODO: make a TRPC request to clean up the file from GCS Bucket
      throw new Error('Function not implemented.');
    },
    uploadThumbnail: function (file: File | undefined): Promise<void> {
      // TODO: update the thumbnail field with uploading status.
      // TODO: make a request to get a signed url.
      // TODO: upload the file to the signed url.
      // TODO: update the field with the thumbnail file and url.
      throw new Error('Function not implemented.');
    },
    deleteThumbnail: function (image: ImageFile): Promise<void> {
      // TODO: update the thumbnail field immediately.
      // TODO: make a TRPC request to clean up the file from GCS Bucket
      throw new Error('Function not implemented.');
    },
    uploadCover: function (file: File | undefined): Promise<void> {
      throw new Error('Function not implemented.');
    },
    deleteCover: function (image: ImageFile): Promise<void> {
      throw new Error('Function not implemented.');
    },
    uploadScreenshots: function (file: FileList | null): Promise<void> {
      throw new Error('Function not implemented.');
    },
    deleteScreenshot: function (image: ImageFile): Promise<void> {
      throw new Error('Function not implemented.');
    },
  };
};
