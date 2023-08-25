import { Typography, Divider } from '@mui/material';
import { ApplicationMethodItem } from '../../../../shared/types';
import { Flex } from '@worksheets/ui/common';
import { MethodExampleDataViewer } from './method-example-data-viewer';

export const RequestSection = ({
  method,
}: {
  method: ApplicationMethodItem;
}) => (
  <Flex column width="100%" gap={1}>
    <Typography variant="body1" fontWeight={900} sx={{ pt: 1 }}>
      Request body
    </Typography>
    <Divider />
    <MethodExampleDataViewer data={method.examples.request} />
  </Flex>
);
