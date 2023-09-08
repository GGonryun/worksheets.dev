import { Box } from '@mui/material';
import { trpc } from '@worksheets/trpc/ide';
import { TinyButton, TinyTextField } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { useState } from 'react';

export const SchemasPage = () => {
  const createLog = trpc.logging.create.useMutation();
  const [content, setContent] = useState('');

  const handleCreation = async () => {
    const result = await createLog.mutateAsync({
      content,
      severity: 'INFO',
    });
    alert('a log has been created: ' + result.id);
    setContent('');
  };

  return (
    <Flex column>
      <Box>
        <p>Testing Logging</p>
      </Box>
      <Box>
        <TinyTextField value={content} onChange={setContent} />
      </Box>
      <Box>
        <TinyButton onClick={handleCreation}>Submit</TinyButton>
      </Box>
    </Flex>
  );
};
