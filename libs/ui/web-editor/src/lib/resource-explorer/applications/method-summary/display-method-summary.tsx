import { Box } from '@mui/material';

import { MethodSummary } from '@worksheets/apps/framework';
import { MethodSummaryHeader } from './method-summary-header';
import { MethodSettingsForm } from './method-settings-form';
import { DataTypeDescription } from './data-type-description';
import { request, useUser } from '@worksheets/auth/client';
import { GetSettingsResponse } from '../../../../api/settings/get';
import { warn } from '@worksheets/ui/common';
import { PostSettingsResponse } from '../../../../api/settings/post';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { TreeItem } from '@mui/lab';
import { v4 as uuidv4 } from 'uuid';

export function DisplayMethodSummary({
  path,
  label,
  description,
  input,
  output,
  settings,
}: MethodSummary) {
  return (
    <Box sx={{ borderLeft: '1px solid grey', boxSizing: 'border-box' }}>
      {label && (
        <MethodSummaryHeader
          label={label}
          path={path}
          description={description}
        />
      )}
      {!!settings.length && (
        <TreeItem
          nodeId={uuidv4()}
          label={
            <Box display="flex" alignItems="center" gap={1}>
              <LockOutlinedIcon fontSize={'small'} />
              settings ({settings.length})
            </Box>
          }
        >
          <MethodSettingsForm path={path} settings={settings} />
        </TreeItem>
      )}
      <DataTypeDescription {...input} label="input" />
      <DataTypeDescription {...output} label="output" />
    </Box>
  );
}
