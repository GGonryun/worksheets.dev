import { SharedTextField } from './shared-text-field';

export const WorksheetDescriptionField: React.FC<{
  description: string;
  onUpdate: (name: string) => void;
}> = ({ description, onUpdate }) => {
  return (
    <SharedTextField
      label="Description"
      multiline
      rows={2}
      helperText="Describe what your worksheet does."
      value={description}
      onChange={(value) => onUpdate(value.currentTarget.value)}
    />
  );
};
