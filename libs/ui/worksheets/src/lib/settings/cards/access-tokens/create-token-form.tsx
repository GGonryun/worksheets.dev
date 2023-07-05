import { Box } from '@mui/material';
import { SharedTextField } from '../../../shared/shared-text-field';

export const CreateTokenForm: React.FC<{
  form: {
    name: string;
    expiration: number;
    isNew: boolean;
  };
  setForm: (form: { name: string; expiration: number; isNew: boolean }) => void;
  disabled?: boolean;
}> = ({ form, setForm, disabled }) => {
  return (
    <Box display="flex" gap={2} flexDirection="column" pt={1}>
      <SharedTextField
        disabled={disabled}
        label="Token name"
        helperText="Enter a unique name for your token to differentiate it from other tokens."
        required
        placeholder='e.g. "My App"'
        value={form.name}
        onChange={(event) => {
          setForm({ ...form, name: event.target.value ?? '', isNew: false });
        }}
        error={!form.isNew && form.name.length < 1}
      />
      <SharedTextField
        disabled={disabled}
        label="Expiration"
        helperText="The number of days until the token expires."
        required
        type="number"
        value={form.expiration}
        onChange={(event) => {
          const expiration = Number(event.target.value);
          if (expiration >= 0 && expiration < 365) {
            setForm({ ...form, expiration, isNew: false });
          } else {
            alert('Invalid selection. Must be between 1 and 365 days.');
          }
        }}
      ></SharedTextField>
    </Box>
  );
};
