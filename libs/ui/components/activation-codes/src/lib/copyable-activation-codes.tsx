import { Column } from '@worksheets/ui/components/flex';
import { ClipboardText } from '@worksheets/ui/components/inputs';
import React from 'react';

export const CopyableActivationCodes: React.FC<{ content: string }> = ({
  content,
}) => {
  return (
    <Column my={1} width="100%" gap={2}>
      {content.split('\\n').map((key, i) => (
        <ClipboardText key={i} label="Activation Code" text={key} />
      ))}
    </Column>
  );
};
