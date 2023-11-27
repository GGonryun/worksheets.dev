import { CircularProgress } from '@mui/material';
import { CustomStep } from './custom-step';
import { FC, useEffect, useState } from 'react';
import { trpc } from '@worksheets/trpc/ide';
import { useDebounce } from '@worksheets/ui-core';
import { projectIdValidationRules } from '@worksheets/schemas-projects';
import { LargeTextField } from './large-text-field';
import { PrimaryButton, SecondaryButton } from './buttons';

export const SecondStep: FC<{
  initialValue: string;
  onContinue: (id: string) => void;
  onPrevious: () => void;
}> = ({ initialValue, onContinue, onPrevious }) => {
  const validate = trpc.projects.validateProjectId.useMutation();

  const [id, setId] = useState<string>(initialValue);
  const [error, setError] = useState<string | undefined>();
  const [validating, setValidating] = useState(true);

  // validate on change
  useEffect(() => {
    const error = projectIdValidationRules.find((rule) => !rule.test(id));
    if (error) {
      setError(error.name);
    } else {
      setError(undefined);
    }
  }, [id]);

  // when the id changes, we also need to make a network request to see if it's unique.
  const data = useDebounce(1500, async (delayedId: string) => {
    const hasError = projectIdValidationRules.find(
      (rule) => !rule.test(delayedId)
    );

    if (!hasError) {
      const { valid } = await validate.mutateAsync({
        id: delayedId,
      });

      if (!valid) {
        setError('This identifier is already taken.');
      } else {
        setValidating(false);
      }
    }
  });

  // trigger the validation on mount
  useEffect(() => {
    data(id);
  }, [data, id]);

  return (
    <CustomStep
      title="**Second**"
      subtitle="pick a globally unique __identifier__."
      description="This is the **identifier** that will be used to target your project in the API. It **cannot** be changed later."
      actions={
        <>
          <SecondaryButton onClick={onPrevious}>Previous</SecondaryButton>
          <PrimaryButton
            disabled={!!error || validating}
            onClick={() => onContinue(id)}
            TooltipProps={{
              title: 'Correct any errors before continuing.',
              disableHoverListener: !error,
            }}
          >
            {validating && !error ? <CircularProgress size={18} /> : 'Continue'}
          </PrimaryButton>
        </>
      }
    >
      <LargeTextField
        error={error}
        value={id}
        onChange={(e) => {
          setId(e.target.value);
          setValidating(true);
        }}
        placeholder="Enter a unique identifier"
      />
    </CustomStep>
  );
};
