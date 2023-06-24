import { useState } from 'react';
import { checkValidWorksheetName } from '../../../shared/util';
import { SharedTextField } from '../../../shared/shared-text-field';

export const WorksheetNameField: React.FC<{
  name: string;
  onUpdate: (name: string) => void;
}> = ({ name, onUpdate }) => {
  const [changed, setHasChanged] = useState(false);
  const isWorksheetNameValid = checkValidWorksheetName(name);
  const isWorksheetNameEmpty = name === '';
  return (
    <SharedTextField
      error={changed && (!isWorksheetNameValid || isWorksheetNameEmpty)}
      helperText={
        changed
          ? !isWorksheetNameValid
            ? 'Name must only contain letters, numbers, hyphens, underscores, and spaces'
            : isWorksheetNameEmpty
            ? 'Name cannot be empty'
            : ''
          : ''
      }
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
