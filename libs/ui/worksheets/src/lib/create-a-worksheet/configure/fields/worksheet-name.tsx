import { useState } from 'react';
import { SharedTextField } from '../../../shared/shared-text-field';

export const WorksheetNameField: React.FC<{
  error?: boolean;
  helperText?: string;
  name: string;
  onUpdate: (name: string) => void;
}> = ({ name, onUpdate, error, helperText }) => {
  const [changed, setHasChanged] = useState(false);

  return (
    <SharedTextField
      error={changed ? error : undefined}
      helperText={changed ? helperText : undefined}
      label="Name"
      required
      value={name}
      onChange={(value) => {
        onUpdate(value.currentTarget.value);
        setHasChanged(true);
      }}
    />
  );
};
