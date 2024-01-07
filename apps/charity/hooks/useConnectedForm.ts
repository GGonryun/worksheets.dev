import { trpc } from '@worksheets/trpc-charity';
import { FormContextType } from '@worksheets/ui/pages/contributions';
import { FileUpload } from '@worksheets/util/types';
import { useState } from 'react';

type FormContextErrors = FormContextType['errors'];
type FormContextValues = FormContextType['values'];

const initialErrors: FormContextErrors = {
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
  trailer: '',
  purchaseOptions: '',
  screenshots: '',
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
  trailer: '',
  purchaseOptions: {},
  screenshots: [],
};

export const useConnectedForm = (): FormContextType => {
  const [errors, setErrors] = useState<FormContextErrors>(initialErrors);
  const [values, setValues] = useState<FormContextValues>(initialValues);

  const submitForm = trpc.games.submit.useMutation();
  const { uploadFile, deleteFile } = useFileStorage();

  return {
    errors,
    values,
    onSubmit: async () => await submitForm.mutateAsync(values),
    setFieldValue: (field, values) => {
      return setValues((prev) => ({ ...prev, [field]: values }));
    },
    uploadGame: async (file) => {
      await uploadFile({
        file,
        onUpdate: (upload) => {
          setValues((prev) => ({ ...prev, gameFile: upload }));
        },
      });
    },
    deleteGame: async (game) => {
      await deleteFile(game);
      setValues((prev) => ({ ...prev, gameFile: undefined }));
    },

    uploadThumbnail: async (file) => {
      // TODO: after uploading an image, infer the dimensions from the image on the frontend.
      await uploadFile({
        file,
        onUpdate: (upload) => {
          setValues((prev) => ({ ...prev, thumbnail: upload }));
        },
      });
    },
    deleteThumbnail: async (image) => {
      await deleteFile(image);
      setValues((prev) => ({ ...prev, thumbnail: undefined }));
    },

    uploadCover: async (file) => {
      // TODO: after uploading an image, infer the dimensions from the image on the frontend.
      await uploadFile({
        file,
        onUpdate: (upload) => {
          setValues((prev) => ({ ...prev, cover: upload }));
        },
      });
    },
    deleteCover: async (image) => {
      await deleteFile(image);
      setValues((prev) => ({ ...prev, cover: undefined }));
    },

    uploadScreenshots: async (files) => {
      alert('TODO: support upload screenshots');
    },
    deleteScreenshot: async (image) => {
      await deleteFile(image);
      setValues((prev) => ({
        ...prev,
        screenshots: prev.screenshots.filter(
          (screenshot) => screenshot.id !== image.id
        ),
      }));
    },
  };
};

const useFileStorage = () => {
  const prepare = trpc.files.prepare.useMutation();
  const destroy = trpc.files.destroy.useMutation();

  const uploadFile = async ({
    file,
    onUpdate,
  }: {
    file: File;
    onUpdate: (upload: FileUpload) => void;
  }): Promise<void> => {
    const prepareData = await prepare.mutateAsync({
      name: file.name,
      type: file.type,
      size: file.size,
    });

    const upload = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      url: prepareData.downloadUrl,
    };

    onUpdate({
      ...upload,
      status: 'uploading',
    });

    await fetch(prepareData.uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        // content type zip
        'Content-Type': 'application/zip',
      },
    });

    onUpdate({
      ...upload,
      status: 'uploaded',
    });
  };

  const deleteFile = async (file: FileUpload): Promise<void> => {
    if (!file.id) {
      return;
    }

    destroy.mutateAsync({ id: file.id });
  };

  return { uploadFile, deleteFile };
};
