import { trpc } from '@worksheets/trpc-charity';
import {
  BasicInformationForm,
  BasicInformationFormContextType,
  BasicInformationFormErrors,
  basicInformationFormSchema,
} from '@worksheets/ui/pages/account';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { useZodValidator } from '@worksheets/zod';
import { useEffect, useState } from 'react';

export const useBasicInformationForm = (
  existing: BasicInformationForm | undefined | null
) => {
  const snackbar = useSnackbar();

  const { fieldValidator } = useZodValidator(basicInformationFormSchema);

  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (existing) {
      setValues(existing);
    }
  }, [existing]);

  const updateProfile = trpc.user.profile.update.useMutation();

  const connector: BasicInformationFormContextType = {
    errors,
    values,
    loading,

    onSubmit: async () => {
      setLoading(true);

      const result = await updateProfile.mutateAsync(values);

      // trigger snackbar
      if (result.okay) {
        snackbar.trigger();
        setUpdated(false);
      } else {
        // display error on failed update
        setErrors((prev) => ({
          ...prev,
          username: result.errors?.username ?? '',
        }));
      }

      setLoading(false);
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

      const error = fieldValidator(field, updated);

      setErrors((prev) => ({ ...prev, [field]: error }));

      setUpdated(true);
    },
  };

  return { form: connector, snackbar };
};
