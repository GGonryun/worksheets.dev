import { Paper, Typography, Divider, Box } from '@mui/material';
import { JsonSchemaViewer } from '@stoplight/json-schema-viewer';
import { AnchoredTitle } from '../../../shared/anchored-title';
import { TinyToggle } from '../../../shared/tiny-toggle';
import { ApplicationMethodItem } from '../../../shared/types';
import { CodeSamplesSection } from './code-samples-section';
import { MonoSpaceTextBox } from './mono-space-text-box';
import { Flex } from '@worksheets/ui/common';

export const MethodDetailsListItem: React.FC<{
  method: ApplicationMethodItem;
}> = ({ method }) => {
  return (
    <Paper variant="outlined" sx={{ width: '100%' }}>
      <Flex column gap={2} p={3} width="100%">
        <Flex column gap={2} alignItems="start">
          <AnchoredTitle
            id={method.methodId}
            variant="h5"
            text={method.label}
          />
          <MonoSpaceTextBox
            code={`POST /call/fullstory/${method.methodId}`}
            borderless
          />
          <Typography variant="body1" color="text.secondary">
            {method.description}
          </Typography>
        </Flex>
        <Flex column width="100%" gap={1}>
          <Typography variant="body1" fontWeight={900} sx={{ pt: 1 }}>
            Request body
          </Typography>
          <Divider />
          <Flex gap={1}>
            <TinyToggle checked={true}>Schema</TinyToggle>
            <TinyToggle checked={false}>Example 1</TinyToggle>
            <TinyToggle checked={false}>Example 2</TinyToggle>
          </Flex>
          <Box pl={2}>
            <JsonSchemaViewer
              defaultExpandedDepth={1}
              renderRootTreeLines={false}
              disableCrumbs={true}
              emptyText="No schema defined"
              schema={method.examples.schema.request}
            />
          </Box>
        </Flex>
        <Flex column width="100%" gap={1}>
          <Flex gap={1} wrap>
            <Typography variant="body1" fontWeight={900}>
              Response
            </Typography>
            <TinyToggle checked={true} color="success">
              200 Okay
            </TinyToggle>
            <TinyToggle checked={false} color="error">
              400 Bad Request
            </TinyToggle>
            <TinyToggle checked={false} color="error">
              403 Forbidden
            </TinyToggle>
            <TinyToggle checked={false} color="error">
              429 Too Many Requests
            </TinyToggle>
            <TinyToggle checked={false} color="error">
              500 Internal Server Error
            </TinyToggle>
          </Flex>
          <Divider />
          <Typography variant="body2" color="text.secondary">
            A successful response.
          </Typography>
          <Flex gap={1}>
            <TinyToggle checked={true}>Schema</TinyToggle>
            <TinyToggle checked={false}>Example 1</TinyToggle>
          </Flex>
          <Box pl={2}>
            <JsonSchemaViewer
              defaultExpandedDepth={1}
              renderRootTreeLines={false}
              disableCrumbs={true}
              emptyText="No schema defined"
              schema={method.examples.schema.output}
            />
          </Box>
        </Flex>
        <CodeSamplesSection method={method} />
      </Flex>
    </Paper>
  );
};
