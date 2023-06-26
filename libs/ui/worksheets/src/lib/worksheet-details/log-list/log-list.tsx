import { Box, Divider } from '@mui/material';
import { LogListDataTable } from './data-table';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { CollapsingHorizontalResizableLayout } from '../../shared/resizable-layout/collapsing-horizontal-resizer';
import { trpc } from '@worksheets/trpc/ide';
import { JSONViewer } from '../../execute-worksheet/json-viewer';

export type LogListProps = {
  worksheetId: string;
  executionId?: string;
  refetchInterval?: number;
};

export const LogList: React.FC<LogListProps> = ({
  worksheetId,
  executionId,
  refetchInterval,
}) => {
  const [viewingDetails, setViewingDetails] = useState<string>('');

  const { data, isLoading } = trpc.worksheets.logs.get.useQuery(
    { worksheetId, executionId },
    { enabled: !!worksheetId, refetchInterval: refetchInterval }
  );

  return (
    <CollapsingHorizontalResizableLayout
      primary={
        <Box width="100%" height="100%" overflow="scroll">
          <LogListDataTable
            onClick={(id) => setViewingDetails(id)}
            loading={isLoading}
            rows={data ?? []}
          />
          <Divider />
        </Box>
      }
      secondary={{
        content: (
          <JSONViewer
            value={data?.find((log) => log.id === viewingDetails)?.data ?? ''}
          />
        ),
        defaultSize: 50,
        title: 'Log details',
        hidden: !viewingDetails,
        closeIcon: <CloseIcon />,
        onClose: () => {
          setViewingDetails('');
        },
      }}
    />
  );
};
