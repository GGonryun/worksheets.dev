import { Typography, Divider } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { MethodExampleDataViewer } from './method-example-data-viewer';
import { ApplicationMethodDetailsItem } from '@worksheets/schemas-applications';

export const RequestSection = ({
  method,
}: {
  method: ApplicationMethodDetailsItem;
}) => (
  <Flex column width="100%" gap={1}>
    <Typography variant="body1" fontWeight={900} sx={{ pt: 1 }}>
      Request body
    </Typography>
    <Divider />
    <MethodExampleDataViewer data={method.examples.request} />
  </Flex>
);
