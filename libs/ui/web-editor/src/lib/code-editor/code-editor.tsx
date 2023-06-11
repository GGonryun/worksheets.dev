import { Box } from '@mui/material';
import { request, useUser } from '@worksheets/util/auth/client';
import dynamic from 'next/dynamic';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetWorksheetResponse } from '@worksheets/api/worksheets';

const DynamicCodeEditor = dynamic(() => import('./ace-editor'), {
  ssr: false,
});

export const CodeEditor: FC = () => {
  const router = useRouter();
  const worksheetId = router.query.worksheet as string;
  const { user } = useUser();

  const apiWorksheet = `/api/worksheets/${worksheetId}`;

  const { data } = request.query.usePrivate<GetWorksheetResponse>(
    apiWorksheet,
    user,
    Boolean(worksheetId)
  );

  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (data) {
      setText(data.text);
    }
  }, [data]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      height={'100%'}
    >
      {worksheetId && (
        <DynamicCodeEditor
          width="95%"
          value={text}
          onChange={(newValue) => setText(newValue)}
        />
      )}
    </Box>
  );
};
