import { SharedTextField } from '../../../shared/shared-text-field';

export const WorksheetTimeoutField: React.FC<{
  label?: string;
  timeout: number;
  onUpdate: (timeout: number) => void;
}> = ({ timeout, onUpdate, label = 'Timeout' }) => {
  return (
    <SharedTextField
      helperText={
        'Specify the number of seconds to wait before timing out the worksheet. Defaults to 10 minutes.'
      }
      required={true}
      type="number"
      label={label}
      value={timeout}
      onChange={(value) => {
        const num = Number(value.currentTarget.value);
        if (num < 0) return;
        onUpdate(num);
      }}
    />
  );
};
