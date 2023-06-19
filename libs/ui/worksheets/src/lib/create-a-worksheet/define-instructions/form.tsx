import { CodeEditor } from '@worksheets/ui/code-editor';
import { FormLayout } from '../form-layout';
import { useState } from 'react';
import { ResizableLayout } from './resizer';
import { Box, Button, Divider, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { getYamlCodeValidationErrors } from '@worksheets/ui/code-editor';
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
      <ResizableLayout
        leftContent={
          <Box height="100%" width="100%">
            <Box
              display="flex"
              px={3}
              py={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Source</Typography>
              <Button
                size="small"
                color="primary"
                sx={{ alignItems: 'flex-start' }}
                endIcon={<OpenInNewIcon />}
                href="/docs/worksheets/yaml-syntax"
                target="_blank"
              >
                Syntax Reference
              </Button>
            </Box>
            <Divider />
            <CodeEditor
              width="100%"
              value={newYaml}
              mode={'yaml'}
              theme={'light'}
              onChange={(newValue) => setYaml(newValue)}
            />
          </Box>
        }
        rightContent={<div>TODO</div>}
      />
    </FormLayout>
  );
};
