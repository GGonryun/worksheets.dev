import { Paper } from '@mui/material';
import { ApplicationMethodItem } from '../../../../shared/types';
import { CodeSamplesSection } from '../code-samples-section';
import { Flex } from '@worksheets/ui/common';
import { MethodHeader } from './method-header';
import { RequestSection } from './request-section';
import { ResponseSection } from './response-section';

export const MethodDetailsListItem: React.FC<{
  method: ApplicationMethodItem;
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
