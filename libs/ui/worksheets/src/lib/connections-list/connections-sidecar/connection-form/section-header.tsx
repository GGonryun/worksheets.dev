import {
  ExpandLess,
  ExpandMore,
  CheckCircle,
  Circle,
  ErrorOutline,
} from '@mui/icons-material';
import { IconButton, Collapse, Link } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Flex } from '@worksheets/ui-core';
import { CredentialStatuses } from '@worksheets/schemas-connections';

export type SectionHeaderProps = {
  status: CredentialStatuses;
  disabled?: boolean;
  title: string;
  description?: ReactNode;
  open?: boolean;
  onToggle: () => void;
};

export const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  description,
  status,
  open,
  onToggle,
  disabled,
}) => (
  <Flex column>
    <Flex spaceBetween>
      <Flex gap={1}>
        {!disabled && status === 'warning' && <ErrorOutline color="warning" />}
        {!disabled && status === 'active' && <CheckCircle color="success" />}
        {disabled && <Circle color="disabled" />}
        <Link
          sx={{ cursor: 'pointer' }}
          underline="hover"
          onClick={() => onToggle()}
          variant="h5"
          fontWeight={900}
          color={disabled ? 'text.disabled' : 'text.primary'}
        >
          {title}
        </Link>
      </Flex>
      <IconButton size="small" onClick={() => onToggle()}>
        {open ? (
          <ExpandLess fontSize="large" />
        ) : (
          <ExpandMore fontSize="large" />
        )}
      </IconButton>
    </Flex>
    <Collapse in={open}>{description}</Collapse>
  </Flex>
);
