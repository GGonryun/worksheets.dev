import { LogLevel } from '@worksheets/data-access/tasks';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Chip, ChipProps, IconProps, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import React from 'react';

export const selectLogLevelStatusIcon = (
  verbosity?: LogLevel
): OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
  muiName: string;
} => {
  switch (verbosity) {
    case 'trace':
      return PrivacyTipOutlinedIcon;
    case 'debug':
      return BugReportOutlinedIcon;
    case 'info':
      return InfoOutlinedIcon;
    case 'warn':
      return WarningAmberOutlinedIcon;
    case 'error':
      return ErrorOutlineOutlinedIcon;
    case 'fatal':
      return NewReleasesOutlinedIcon;
    case 'silent':
      return DoDisturbOnOutlinedIcon;
    default:
      return HelpOutlineOutlinedIcon;
  }
};

export const selectLogLevelStatusColor = (
  verbosity?: LogLevel
): ChipProps['color'] => {
  switch (verbosity) {
    case 'trace':
      return 'secondary';
    case 'debug':
      return 'primary';
    case 'info':
      return 'info';
    case 'warn':
      return 'warning';
    case 'error':
      return 'error';
    case 'fatal':
      return 'error';
    case 'silent':
      return 'default';
    default:
      return 'default';
  }
};

export const LogLevelVerbosityChip: React.FC<{ verbosity?: LogLevel }> = ({
  verbosity,
}) => {
  const Icon = selectLogLevelStatusIcon(verbosity);
  const color = selectLogLevelStatusColor(verbosity);
  return (
    <Chip
      icon={<Icon fontSize="small" />}
      color={color}
      size="small"
      label={verbosity}
      sx={{ p: 0.5 }}
    />
  );
};

export const LogLevelVerbosityIcon: React.FC<{
  verbosity?: LogLevel;
  fontSize?: IconProps['fontSize'];
}> = ({ verbosity, fontSize = 'small' }) => {
  const Icon = selectLogLevelStatusIcon(verbosity);
  const color = selectLogLevelStatusColor(verbosity);
  return <Icon color={color as IconProps['color']} fontSize={fontSize} />;
};
