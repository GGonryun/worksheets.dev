import { Box, Button, Divider, Link, Tooltip, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { CodeEditor } from '@worksheets/ui/code-editor';
import { WorksheetEntity } from '@worksheets/data-access/worksheets';
import React from 'react';
import { EditOutlined } from '@mui/icons-material';

export const EXECUTION_HEADER_COMMENT = `
# 👋 These comments are auto-generated and are
#    not a part of your worksheet.
# 📝 Use the left window to provide JSON input 
#    and adjust your execution settings.
`.trimStart();

export const YAMLViewer: React.FC<{
  worksheet?: WorksheetEntity;
}> = ({ worksheet }) => (
  <Box height="100%" width="100%">
    <Box
      px={2}
      height="48px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h6">Worksheet</Typography>
      <Box display="flex" alignItems="center" gap={3}>
        <Tooltip placement="top" title="Make changes to your worksheet.">
          <span>
            <Button
              startIcon={<EditOutlined />}
              size="small"
              variant="contained"
              href={`/worksheets/${worksheet?.id}/worksheet?edit=true`}
            >
              Edit
            </Button>
          </span>
        </Tooltip>
        <Tooltip
          placement="top"
          title="Explore thousands of custom built worksheets."
        >
          <span>
            <Button
              endIcon={<OpenInNewIcon />}
              size="small"
              variant="contained"
              href="/templates"
              target="_blank"
            >
              Templates
            </Button>
          </span>
        </Tooltip>
      </Box>
    </Box>
    <Divider />
    <Box width="100%" height="100%">
      <CodeEditor
        hideLineNumbers
        height="calc(100% - 48px)"
        width="100%"
        value={`${EXECUTION_HEADER_COMMENT}${worksheet?.text ?? ''}` ?? ''}
        disabled={true}
        mode={'yaml'}
        theme={'light'}
        caption={
          <Box height="28px" overflow="hidden" textOverflow={'ellipsis'}>
            <Typography variant="caption" color="text.secondary">
              Editor is in read-only mode.{' '}
              <Link href={`/worksheets/${worksheet?.id}/worksheet`}>
                Click here
              </Link>{' '}
              to make changes.
            </Typography>
          </Box>
        }
      />
    </Box>
  </Box>
);
