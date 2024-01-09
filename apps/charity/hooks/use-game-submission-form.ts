import { trpc } from '@worksheets/trpc-charity';
import {
  GameSubmissionForm,
  GameSubmissionFormContextType,
  GameSubmissionFormErrors,
  gameSubmissionFormSchema,
} from '@worksheets/ui/pages/game-submissions';
import { Nullable } from '@worksheets/util/types';

import { useState } from 'react';
import { isImage, isZip, toMegabytes } from '@worksheets/util/data';
import { useRouter } from 'next/router';
import { useZodValidator } from '@worksheets/zod';

const MAX_ZIP_UPLOAD_SIZE_MB = 50;
const MAX_IMAGE_UPLOAD_SIZE_MB = 5;

const initialErrors: GameSubmissionFormErrors = {
  id: '',
  slug: '',
  title: '',
  headline: '',
  projectType: '',
  status: '',
  externalWebsiteUrl: '',
  viewport: '',
  viewportWidth: '',
  viewportHeight: '',
  devices: '',
  orientations: '',
  description: '',
  instructions: '',
  category: '',
  tags: '',
  gameFileUrl: '',
  thumbnailUrl: '',
  trailerUrl: '',
  coverUrl: '',
  profileId: '',
  markets: '',
};

const initialValues: GameSubmissionForm = {
  id: '',
  slug: '',
  title: '',
  headline: '',
  projectType: 'HTML',
  status: 'DRAFT',
  externalWebsiteUrl: '',
  viewport: 'RESPONSIVE',
  viewportWidth: null,
  viewportHeight: null,
  devices: [],
  orientations: [],
  description: '',
  instructions: '',
  category: 'OTHER',
  tags: [],
  gameFileUrl: '',
  thumbnailUrl: '',
  trailerUrl: '',
  coverUrl: '',
  profileId: '',
  markets: {},
};

const merge = (
  initialValues: GameSubmissionForm,
  existingValues: Nullable<GameSubmissionForm>
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
  submission: Nullable<GameSubmissionForm>
): GameSubmissionFormContextType => {
  const { push } = useRouter();
  const [errors, setErrors] = useState<GameSubmissionFormErrors>(initialErrors);
  const [values, setValues] = useState<GameSubmissionForm>(
    merge(initialValues, submission)
  );
  const [updated, setUpdated] = useState(false);
  const { fieldValidator, globalValidator } = useZodValidator(
    gameSubmissionFormSchema
  );

  const submitForm = trpc.game.submissions.submit.useMutation();
  const updateForm = trpc.game.submissions.update.useMutation();

  const prepare = trpc.files.prepare.useMutation();
  const destroy = trpc.files.destroy.useMutation();

  const onSubmit: GameSubmissionFormContextType['onSubmit'] = async () => {
    setUpdated(false);
    const results = globalValidator(values);
    if (!results.success) {
      setErrors(results.errors);
      return;
    } else {
      await submitForm.mutateAsync(values);
      push('/account/submissions');
    }
  };

  const onUpdate: GameSubmissionFormContextType['onUpdate'] = async () => {
    setUpdated(false);
    console.log('update', values.id);
    await updateForm.mutateAsync(values);
  };

  const setFieldValue: GameSubmissionFormContextType['setFieldValue'] = (
    field,
    value
  ) => {
    const updated = { ...values, [field]: value };

    setValues(updated);

    const error = fieldValidator(field, updated);

    setErrors((prev) => ({ ...prev, [field]: error }));

    setUpdated(true);
  };

  return {
    errors,
    values,
    isValid: Object.values(errors).every((error) => !error),
    isUpdated: updated,
    onSubmit,
    onUpdate,
    setFieldValue,
    upload: async (field, files) => {
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

      let prepareData;
      try {
        prepareData = await prepare.mutateAsync({
          name: file.name,
          type: file.type,
          submissionId: submission?.id || '',
        });
      } catch (error) {
        console.error(error);
        setErrors((prev) => ({
          ...prev,
          [field]:
            'An unexpected error occurred during upload, please try again',
        }));
        return;
      }

      try {
        await fetch(prepareData.uploadUrl, {
          method: 'PUT',
          body: file,
          headers: {
            // content type zip
            'Content-Type': 'application/zip',
          },
        });
      } catch (error) {
        console.error(error);
        setErrors((prev) => ({
          ...prev,
          [field]:
            'An unexpected error occurred during upload, please try again',
        }));
      }

      setFieldValue(field, prepareData.downloadUrl);
    },
    destroy: async (field) => {
      const url = values[field];
      if (!url) {
        setErrors((prev) => ({ ...prev, [field]: 'No file to delete' }));
        return;
      }
      destroy.mutateAsync({ url });

      setFieldValue(field, '');
    },
  };
};
