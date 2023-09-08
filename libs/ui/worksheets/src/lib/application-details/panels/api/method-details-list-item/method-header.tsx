import { Typography } from '@mui/material';
import { AnchoredTitle } from '../../../../shared/anchored-title';
import { ApplicationMethodItem } from '../../../../shared/types';
import { MonoSpaceTextBox } from '../../../../shared/mono-space-text-box';
import { Flex } from '@worksheets/ui-core';

export const MethodHeader = ({ method }: { method: ApplicationMethodItem }) => (
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
