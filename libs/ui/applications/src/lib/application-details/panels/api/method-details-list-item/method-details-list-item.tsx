import { Paper } from '@mui/material';
import { CodeSamplesSection } from '../code-samples-section';
import { Flex } from '@worksheets/ui-core';
import { MethodHeader } from './method-header';
import { RequestSection } from './request-section';
import { ResponseSection } from './response-section';
import { ApplicationMethodDetailsItem } from '@worksheets/schemas-applications';

export const MethodDetailsListItem: React.FC<{
  method: ApplicationMethodDetailsItem;
}> = ({ method }) => {
  return (
    <Paper variant="outlined" sx={{ width: '100%' }}>
      <Flex column gap={2} p={3} width="100%">
        <MethodHeader method={method} />
        <RequestSection method={method} />
        <ResponseSection method={method} />
        <CodeSamplesSection method={method} />
      </Flex>
    </Paper>
  );
};
