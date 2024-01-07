import { trpc } from '@worksheets/trpc-charity';
import {
  BasicInformationForm,
  basicInformationFormSchema,
  BasicInformationFormErrors,
  BasicInformationFormContextType,
} from '@worksheets/ui/pages/account';
import { useSnackbar } from '@worksheets/ui/snackbar';
import { useZodValidator } from '@worksheets/zod';
import { useState } from 'react';

export const useBasicInformationForm = (
  existing: BasicInformationForm | undefined | null
) => {
  const snackbar = useSnackbar();

  const validator = useZodValidator(basicInformationFormSchema);

  const [updated, setUpdated] = useState(false);

  const [values, setValues] = useState<BasicInformationForm>(
    existing ?? {
      username: '',
      bio: '',
    }
  );

  const [errors, setErrors] = useState<BasicInformationFormErrors>({
    username: '',
    bio: '',
  });

  const updateProfile = trpc.profile.upsert.useMutation();

  const connector: BasicInformationFormContextType = {
    errors,
    values,

    onSubmit: async () => {
      const result = await updateProfile.mutateAsync(values);

      // trigger snackbar
      if (result.okay) {
        snackbar.trigger();
        setUpdated(false);
        return;
      }

      // display error on failed update
      setErrors((prev) => ({
        ...prev,
        username: result.errors?.username ?? '',
      }));
    },

    isValid: () => {
      // check if there are any errors
      return Object.values(errors).every((e) => !e);
    },

    isUpdated: () => {
      // check if the values are different from the existing values
      return updated;
    },

    setFieldValue: (field, value) => {
      const updated = { ...values, [field]: value };

      setValues(updated);

      const error = validator(field, updated);

      setErrors((prev) => ({ ...prev, [field]: error }));

      setUpdated(true);
    },
  };

  return { form: connector, snackbar };
};
