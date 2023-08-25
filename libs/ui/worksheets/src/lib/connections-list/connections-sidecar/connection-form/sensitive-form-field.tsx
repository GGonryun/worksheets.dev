import { Box, Typography } from '@mui/material';
import { PresentationalField } from '@worksheets/schemas-connections';
import { OpenInNewLink } from '../../../shared/open-in-new-link';
import { RequiredAsterisk } from '../../../shared/required-asterisk';
import { TinyTextField } from '../../../shared/tiny-text-field';
import { Flex } from '@worksheets/ui/common';
import { PriorityHigh } from '@mui/icons-material';

export const SensitiveFormField: React.FC<{
  field: PresentationalField;
  disabled?: boolean;
  data?: string;
  onChange: (data: string) => void;
  error?: string;
}> = ({ field, disabled, data, onChange, error }) => {
  return (
    <Box>
      <Flex spaceBetween pb={0.5} alignItems="baseline">
        <Typography
          variant="body2"
          fontWeight={900}
          color={disabled ? 'text.disabled' : 'text.primary'}
        >
          {field.label}
          <RequiredAsterisk disabled={disabled} />
        </Typography>
        <OpenInNewLink
          variant="caption"
          disabled={disabled}
          href={field.helpUrl}
        >
          How to get an {field.label}
        </OpenInNewLink>
      </Flex>
      <Flex gap={1}>
        <span style={{ width: '100%' }}>
          <TinyTextField
            disabled={disabled}
            fullWidth
            value={data ?? ''}
            onChange={onChange}
          />
        </span>
      </Flex>
      {error && (
        <Typography
          variant="caption"
          color="error"
          display="flex"
          alignItems="center"
          mt={0.5}
        >
          <PriorityHigh color="error" sx={{ height: 16, mt: -0.5 }} />
          {error}
        </Typography>
      )}
    </Box>
  );
};
