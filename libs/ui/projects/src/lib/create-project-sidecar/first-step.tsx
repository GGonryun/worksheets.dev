import { CustomStep } from './custom-step';
import { FC, useEffect, useState } from 'react';
import { LargeTextField } from './large-text-field';
import { PrimaryButton } from './buttons';
import { projectNameValidationRules } from '@worksheets/schemas-projects';

export const FirstStep: FC<{
  initialValue: string;
  onContinue: (name: string) => void;
}> = ({ initialValue, onContinue }) => {
  const [updated, setUpdated] = useState(initialValue !== '');
  const [name, setName] = useState(initialValue);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!updated) return;
    // scan through rules and find the first one that fails
    const rule = projectNameValidationRules.find((rule) => !rule.isValid(name));
    if (rule) {
      setError(rule.name);
    } else {
      setError(undefined);
    }
  }, [updated, name]);

  return (
    <CustomStep
      title="**First**"
      subtitle="let's give your project a __name__."
      description="This is the **name** that will be displayed throughout *Worksheets*. It can be changed later."
      actions={
        <PrimaryButton
          disabled={!updated || !!error}
          onClick={() => onContinue(name)}
          TooltipProps={{
            title: 'Correct any errors before continuing.',
            disableHoverListener: !error,
          }}
        >
          Continue
        </PrimaryButton>
      }
    >
      <LargeTextField
        value={name}
        onChange={(e) => {
          setUpdated(true);
          setName(e.target.value);
        }}
        placeholder="Enter your projects name"
        error={error}
      />
    </CustomStep>
  );
};
