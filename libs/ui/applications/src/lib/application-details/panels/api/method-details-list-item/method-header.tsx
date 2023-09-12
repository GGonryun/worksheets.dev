import { Typography } from '@mui/material';
import { ApplicationMethodDetailsItem } from '@worksheets/schemas-applications';
import { Flex } from '@worksheets/ui-core';
import { AnchoredTitle, MonoSpaceTextBox } from '@worksheets/ui/common';

export const MethodHeader = ({
  method,
}: {
  method: ApplicationMethodDetailsItem;
}) => (
  <Flex column gap={2} alignItems="start">
    <AnchoredTitle id={method.methodId} variant="h5" text={method.label} />
    <MonoSpaceTextBox
      code={`POST /call/${method.appId}/${method.methodId}`}
      borderless
    />
    <Typography variant="body1" color="text.secondary">
      {method.description}
    </Typography>
  </Flex>
);
