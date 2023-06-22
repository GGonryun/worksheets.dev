import {
  Box,
  Button,
  ButtonProps,
  SxProps,
  Theme,
  Typography,
  alpha,
} from '@mui/material';
import { LogListDataRow, LogListDataTable } from './data-table';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import {
  addHoursToCurrentTime,
  dateFromTimestamp,
  formatTimestampLong,
} from '@worksheets/util/time';
import React, { useState } from 'react';

import { CollapsingHorizontalResizableLayout } from '../../shared/resizable-layout/collapsing-horizontal-resizer';
import { CodeEditor } from '@worksheets/ui/code-editor';

export type LogListProps = {
  logs: string[];
};

const SAMPLE_JSON = {
  glossary: {
    title: 'example glossary',
    GlossDiv: {
      title: 'S',
      GlossList: {
        GlossEntry: {
          ID: 'SGML',
          SortAs: 'SGML',
          GlossTerm: 'Standard Generalized Markup Language',
          Acronym: 'SGML',
          Abbrev: 'ISO 8879:1986',
          GlossDef: {
            para: 'A meta-markup language, used to create markup languages such as DocBook.',
            GlossSeeAlso: ['GML', 'XML'],
          },
          GlossSee: 'markup',
        },
      },
    },
  },
};

const SAMPLE_LOGS: Record<string, LogListDataRow> = {
  '1': {
    id: '1',
    level: 'trace',
    timestamp: Date.now(),
    message: 'This is a test message from the worksheets system',
    data: JSON.stringify(SAMPLE_JSON, null, 2),
  },
  '2': {
    id: '2',
    level: 'debug',
    timestamp: Date.now(),
    message: 'This is a test message from the worksheets system',
    data: JSON.stringify(
      {
        test: 'test',
        test2: 'test2',
        test3: 'test3',
      },
      null,
      2
    ),
  },
  '3': {
    id: '3',
    level: 'warn',
    timestamp: Date.now(),
    message: 'This is a test message from the worksheets system',
    data: JSON.stringify({
      test: 'test',
      test2: 'test2',
      test3: 'test3',
    }),
  },
};

const darken: SxProps<Theme> = {
  sx: ({ palette }) => ({
    color: palette.primary.dark,
  }),
};

export const LogList: React.FC<LogListProps> = ({ logs }) => {
  const [viewingDetails, setViewingDetails] = useState<string>('');
  const [loadingNew, setLoadingNew] = useState(false);
  const [loadingOld, setLoadingOld] = useState(false);
  const [startRange, setStartRange] = useState<number>(Date.now() - 1);
  const [endRange, setEndRange] = useState<number>(
    addHoursToCurrentTime(-1).getTime()
  );
  const [newTimeout, setNewTimeout] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const [oldTimeout, setOldTimeout] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

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
            loading={loadingOld || loadingNew}
            rows={Object.values(SAMPLE_LOGS)}
          />
          <LogLoadingBanner
            loading={loadingOld}
            timestamp={endRange}
            action={{
              onClick: handleLoadOldLogs,
              children: 'Extend by one hour',
            }}
          />
        </Box>
      }
      secondary={{
        content: (
          <Box height="100%" width="100%">
            <CodeEditor
              width="100%"
              value={SAMPLE_LOGS[viewingDetails]?.data ?? ''}
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
