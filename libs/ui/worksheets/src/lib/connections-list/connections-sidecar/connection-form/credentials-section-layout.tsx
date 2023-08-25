import { Collapse, Typography, Alert } from '@mui/material';
import { FC, ReactNode } from 'react';
import { SectionHeader } from './section-header';
import { Flex } from '@worksheets/ui/common';
import { CredentialStatuses } from '@worksheets/schemas-connections';

export const CredentialsSectionLayout: FC<{
  title: string;
  description: ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
  error?: string;
  status: CredentialStatuses;
  open?: boolean;
  onToggle: () => void;
}> = ({
  disabled,
  title,
  description,
  children,
  error,
  status,
  open,
  onToggle,
}) => {
  return (
    <Flex column>
      <SectionHeader
        status={status}
        title={title}
        onToggle={onToggle}
        open={open}
      />

      <Collapse in={open}>
        <Flex column py={1} gap={2}>
          <Typography variant="body2" color={'text.secondary'} component="span">
            {description}{' '}
          </Typography>

          {status === 'warning' && (
            <Alert severity={'warning'}>
              Complete connection details above to continue.
            </Alert>
          )}

          {error && !disabled && (
            <Alert severity={'error'} sx={{ my: 1 }}>
              {error}
            </Alert>
          )}

          {children}
        </Flex>
      </Collapse>
    </Flex>
  );
};
