import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { isImage, isZip, toMegabytes } from '@worksheets/util/data';
import {
  GameSubmissionForm,
  GameSubmissionFormContextType,
  GameSubmissionFormErrors,
  Nullable,
  strictGameSubmissionFormSchema,
} from '@worksheets/util/types';
import { useZodValidator } from '@worksheets/zod';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MAX_ZIP_UPLOAD_SIZE_MB = 50;
const MAX_IMAGE_UPLOAD_SIZE_MB = 5;

const initialErrors: GameSubmissionFormErrors = {
  slug: '',
  title: '',
  headline: '',
  projectType: '',
  externalWebsiteUrl: '',
  viewport: '',
  viewportWidth: '',
  viewportHeight: '',
  devices: '',
  orientations: '',
  description: '',
  instructions: '',
  categories: '',
  markets: '',
  trailerUrl: '',
  gameFile: '',
  thumbnailFile: '',
  coverFile: '',
};

const initialValues: GameSubmissionForm = {
  slug: '',
  title: '',
  headline: '',
  projectType: 'HTML',
  externalWebsiteUrl: '',
  viewport: 'RESPONSIVE',
  viewportWidth: null,
  viewportHeight: null,
  devices: ['MOBILE', 'COMPUTER'],
  orientations: ['LANDSCAPE', 'PORTRAIT'],
  description: '',
  instructions: '',
  categories: [],
  gameFile: null,
  thumbnailFile: null,
  coverFile: null,
  trailerUrl: '',
  markets: {},
};

const merge = (
  initialValues: GameSubmissionForm,
  existingValues: Nullable<GameSubmissionForm> | undefined
): GameSubmissionForm => {
  if (!existingValues) {
    return initialValues;
  }

  // TODO: fix this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const merged: any = { ...initialValues };

  Object.keys(initialValues).forEach((key) => {
    const k = key as keyof GameSubmissionForm;
    if (existingValues[k]) {
      merged[k] = existingValues[k] ?? initialValues[k];
    }
  });

  return merged;
};

export const useGameSubmissionForm = (
  submissionId: string,
  submission: Nullable<GameSubmissionForm> | undefined
): { form: GameSubmissionFormContextType } => {
  const { push } = useRouter();

  const snackbar = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [errors, setErrors] = useState<GameSubmissionFormErrors>(initialErrors);
  const [values, setValues] = useState<GameSubmissionForm>(
    merge(initialValues, submission)
  );

  useEffect(() => {
    setValues(merge(initialValues, submission));
  }, [submission]);

  const { fieldValidator, globalValidator } = useZodValidator(
    strictGameSubmissionFormSchema
  );

  const submitForm = trpc.user.game.submissions.submit.useMutation();
  const updateForm = trpc.user.game.submissions.update.useMutation();

  const prepare = trpc.user.game.files.prepare.useMutation();
  const complete = trpc.user.game.files.complete.useMutation();
  const destroy = trpc.user.game.files.destroy.useMutation();

  const onSubmit: GameSubmissionFormContextType['onSubmit'] = async () => {
    setLoading(true);
    try {
      const results = globalValidator(values);
      if (!results.success) {
        setErrors(results.errors);
      } else {
        await submitForm.mutateAsync({ ...values, id: submissionId });
        push(routes.account.submissions.success.path());
      }
    } finally {
      setLoading(false);
      setUpdated(false);
    }
  };

  const onUpdate: GameSubmissionFormContextType['onUpdate'] = async () => {
    setLoading(true);
    try {
      await updateForm.mutateAsync({ ...values, id: submissionId });

      snackbar.success('Submission updated');

      push(routes.account.submissions.path());
    } finally {
      setLoading(false);
      setUpdated(false);
    }
  };

  const setFieldValue: GameSubmissionFormContextType['setFieldValue'] = (
    field,
    value
  ) => {
    const updated = { ...values, [field]: value };

    setValues(updated);

    const error = fieldValidator(field, updated);

    // TODO: how do we properly map and clear dependent field errors?
    if (field === 'projectType' && value !== 'EXTERNAL') {
      setErrors((prev) => ({ ...prev, externalWebsiteUrl: '' }));
    }

    if (
      field === 'devices' &&
      !(value as GameSubmissionForm['devices']).includes('MOBILE')
    ) {
      setErrors((prev) => ({ ...prev, orientations: '' }));
    }

    if (field === 'viewport' && value !== 'RESPONSIVE') {
      setErrors((prev) => ({ ...prev, viewportWidth: '', viewportHeight: '' }));
      setValues((prev) => ({
        ...prev,
        viewportWidth: initialValues.viewportWidth,
        viewportHeight: initialValues.viewportHeight,
      }));
    } else if (field === 'viewport' && value === 'RESPONSIVE') {
      setErrors((prev) => ({ ...prev, orientations: '', devices: '' }));
      setValues((prev) => ({
        ...prev,
        orientations: initialValues.orientations,
        devices: initialValues.devices,
      }));
    }

    if (field === 'projectType' && value === 'EXTERNAL') {
      setErrors((prev) => ({ ...prev, gameFile: '' }));
    }

    setErrors((prev) => ({ ...prev, [field]: error }));

    setUpdated(true);
  };

  const uploadFile: GameSubmissionFormContextType['upload'] = async (
    field,
    files
  ) => {
    const file = files?.item(0);
    if (!file) {
      setErrors((prev) => ({
        ...prev,
        [field]: 'A file is required for upload',
      }));
      return;
    }

    if (isZip(file) && toMegabytes(file.size) > MAX_ZIP_UPLOAD_SIZE_MB) {
      setErrors((prev) => ({ ...prev, [field]: 'Zip file is too large' }));
      return;
    }

    if (isImage(file) && toMegabytes(file.size) > MAX_IMAGE_UPLOAD_SIZE_MB) {
      setErrors((prev) => ({ ...prev, [field]: 'Image file is too large' }));
      return;
    }

    try {
      const prepareData = await prepare.mutateAsync({
        name: file.name,
        type: file.type,
        size: file.size,
        submissionId,
      });

      const result = await fetch(prepareData.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (result.status !== 200) {
        throw new Error(`Unexpected status code ${result.status}`);
      }

      const completeData = await complete.mutateAsync({
        submissionId: submissionId,
        fieldId: field,
        fileId: prepareData.fileId,
      });

      if (completeData.okay) {
        setFieldValue(field, completeData);
      } else {
        throw new Error(
          `Unexpected response completing upload ${completeData}`
        );
      }
    } catch (error) {
      console.error(`Error uploading file ${error}`);
      setErrors((prev) => ({
        ...prev,
        [field]:
          'An unexpected error occurred while completing upload, please try again',
      }));
      return;
    }

    snackbar.success('File uploaded');
  };

  const destroyFile: GameSubmissionFormContextType['destroy'] = async (
    field
  ) => {
    const file = values[field];
    if (file) {
      destroy.mutateAsync({
        fileId: file.fileId,
        fieldId: field,
        submissionId: submissionId,
      });
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: 'No file to delete',
      }));
    }

    snackbar.success('File deleted');

    // even if we fail to delete the file, we should always clear the field
    setFieldValue(field, null);
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const form: GameSubmissionFormContextType = {
    errors,
    values,
    loading,
    isValid: Object.values(errors).every((error) => !error),
    isUpdated: updated,
    onSubmit,
    onUpdate,
    setFieldValue,
    upload: uploadFile,
    destroy: destroyFile,
  };

  return { form };
};
