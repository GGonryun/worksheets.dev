import { FormLayout } from '../form-layout';
import { useState } from 'react';
import { getYamlCodeValidationErrors } from '@worksheets/ui/code-editor';
import { SourceVisualizer } from '../../shared/source-visualizer';
export type DefineInstructionsFormValues = {
  yaml: string;
};

export type DefineInstructionsFormProps = {
  yaml: string;
  onPrevious: () => void;
  onSubmit: (values: DefineInstructionsFormValues) => void;
  onCancel: () => void;
};

export const DefineInstructionsForm: React.FC<DefineInstructionsFormProps> = ({
  yaml,
  onSubmit,
  onCancel,
  onPrevious,
}) => {
  const [newYaml, setYaml] = useState<string>(yaml);
  const hasYamlError = getYamlCodeValidationErrors(newYaml);
  const hasYamlContent =
    Boolean(newYaml.length) || Boolean(newYaml.trim().length);
  return (
    <FormLayout
      actions={{
        primary: {
          label: 'Back',
          variant: 'outlined',
          color: 'primary',
          sx: { fontWeight: 900 },
          onClick: () => onPrevious(),
        },
        secondary: {
          label: 'Next',
          sx: { fontWeight: 900 },
          disabled: Boolean(hasYamlError) || !hasYamlContent,
          tooltip: hasYamlError
            ? 'Correct all invalid syntax before continuing.'
            : !hasYamlContent
            ? 'Enter some YAML before continuing.'
            : undefined,
          onClick: () => onSubmit({ yaml: newYaml }),
        },
        tertiary: {
          label: 'Cancel',
          onClick: onCancel,
          color: 'inherit',
          variant: 'text',
          sx: { fontWeight: 900 },
        },
      }}
    >
      <SourceVisualizer text={newYaml} onUpdate={(data) => setYaml(data)} />
    </FormLayout>
  );
};
