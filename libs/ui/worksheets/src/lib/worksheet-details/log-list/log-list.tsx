import {
  Box,
  Button,
  ButtonProps,
  SxProps,
  Theme,
  Typography,
  alpha,
} from '@mui/material';
import { LogListDataTable } from './data-table';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import {
  addHoursToCurrentTime,
  dateFromTimestamp,
  formatTimestampLong,
} from '@worksheets/util/time';
import React, { useEffect, useState } from 'react';

import { CollapsingHorizontalResizableLayout } from '../../shared/resizable-layout/collapsing-horizontal-resizer';
import { CodeEditor } from '@worksheets/ui/code-editor';
import { trpc } from '@worksheets/trpc/ide';

const darken: SxProps<Theme> = {
  sx: ({ palette }) => ({
    color: palette.primary.dark,
  }),
};

export type LogListProps = {
  worksheetId: string;
};

export const LogList: React.FC<LogListProps> = ({ worksheetId }) => {
  const [viewingDetails, setViewingDetails] = useState<string>('');
  const [loadingNew, setLoadingNew] = useState(false);
  const [loadingOld, setLoadingOld] = useState(false);
  const [startRange, setStartRange] = useState<number>(0);
  const [endRange, setEndRange] = useState<number>(0);
  const [newTimeout, setNewTimeout] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const [oldTimeout, setOldTimeout] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  const { data, isLoading } = trpc.worksheets.logs.get.useQuery(
    { worksheetId },
    { enabled: !!worksheetId }
  );

  useEffect(() => {
    if (!isLoading && data) {
      setStartRange(data.startTime);
      setEndRange(data.endTime);
    }
  }, [data, isLoading]);

  const handleLoadNewLogs = () => {
    setLoadingNew(true);
    setStartRange(Date.now());

    clearInterval(newTimeout);
    const id: NodeJS.Timeout = setTimeout(() => {
      setLoadingNew(false);
      setNewTimeout(undefined);
    }, 5000);
    setNewTimeout(id);
  };

  const handleLoadOldLogs = () => {
    setLoadingOld(true);
    setEndRange(
      addHoursToCurrentTime(-1, dateFromTimestamp(endRange)).getTime()
    );

    clearInterval(oldTimeout);
    const id: NodeJS.Timeout = setTimeout(() => {
      setLoadingOld(false);
      setOldTimeout(undefined);
    }, 5000);
    setOldTimeout(id);
  };

  return (
    <CollapsingHorizontalResizableLayout
      primary={
        <Box width="100%" height="100%">
          <LogLoadingBanner
            loading={loadingNew}
            timestamp={startRange}
            action={{
              onClick: handleLoadNewLogs,
              children: 'Load newest logs',
            }}
          />
          <LogListDataTable
            onClick={(id) => setViewingDetails(id)}
            loading={isLoading || loadingOld || loadingNew}
            rows={data?.logs ?? []}
          />
          <LogLoadingBanner
            loading={loadingOld}
            timestamp={endRange}
            action={{
              onClick: handleLoadOldLogs,
              children: 'Load older logs',
            }}
          />
        </Box>
      }
      secondary={{
        content: (
          <Box height="100%" width="100%">
            <CodeEditor
              width="100%"
              value={
                data?.logs?.find((log) => log.id === viewingDetails)?.data ?? ''
              }
              disabled={true}
              mode={'json'}
              theme={'light'}
            />
          </Box>
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

const LogLoadingBanner: React.FC<{
  timestamp: number;
  action: Pick<ButtonProps, 'onClick' | 'children'>;
  loading: boolean;
}> = ({ timestamp, action, loading }) => {
  const time = formatTimestampLong(timestamp);
  return (
    <Box
      width={'100%'}
      sx={({ palette }) => ({
        backgroundColor: alpha(palette.primary.main, 0.1),
      })}
      display="flex"
      alignItems="center"
      gap={1}
      p={1}
    >
      <InfoIcon {...darken} fontSize="small" />

      <Typography {...darken} variant="body2">
        {!loading ? <>Scanned up to {time}</> : <>Searching for more</>}
      </Typography>
      <Box pl={4}>
        <Button variant="outlined" size="small" onClick={action.onClick}>
          {action.children}
        </Button>
      </Box>
    </Box>
  );
};
