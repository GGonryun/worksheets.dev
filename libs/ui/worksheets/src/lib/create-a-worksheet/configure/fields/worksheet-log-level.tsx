import { LogLevel } from '@worksheets/data-access/tasks';
import { SharedTextField } from '../../../shared/shared-text-field';
import { MenuItem } from '@mui/material';

export const WorksheetLogLevelField: React.FC<{
  level: LogLevel;
  onUpdate: (level: LogLevel) => void;
  helperText?: string;
}> = ({
  level,
  onUpdate,
  helperText = 'Record logs at this level or higher.',
}) => {
  return (
    <SharedTextField
      label="Log Level"
      helperText={helperText}
      select
      required
      value={level}
      onChange={(value) => onUpdate(value.target.value as LogLevel)}
    >
      {logLevels.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </SharedTextField>
  );
};

const logLevels: { label: string; value: LogLevel }[] = [
  {
    label: 'All',
    value: 'trace',
  },
  {
    label: 'Info',
    value: 'info',
  },
  {
    label: 'Debug',
    value: 'debug',
  },
  {
    label: 'Warn',
    value: 'warn',
  },
  {
    label: 'Error',
    value: 'error',
  },
  {
    label: 'Fatal',
    value: 'fatal',
  },
  {
    label: 'Silent',
    value: 'silent',
  },
];
