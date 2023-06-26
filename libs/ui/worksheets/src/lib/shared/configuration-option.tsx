import { Box, Tooltip } from '@mui/material';
import { ReactNode } from 'react';
import {
  EditableLabel,
  EditableField,
} from '../worksheet-details/general-configuration/general-configuration';

export type ConfigurationOptionProps = {
  label: string;
  tooltip?: string;
  content?: ReactNode;
  onEdit?: () => void;
};
export const ConfigurationOption = ({
  label,
  content,
  tooltip,
  onEdit,
}: ConfigurationOptionProps) => (
  <Box display="flex" alignItems="center">
    <Box width="150px">
      <EditableLabel label={label} />
    </Box>
    <Box>
      <Tooltip title={tooltip} disableHoverListener={!tooltip} placement="top">
        <span>
          <EditableField content={content} onEdit={onEdit} />
        </span>
      </Tooltip>
    </Box>
  </Box>
);
