import { Box, Button, Divider, Tooltip, Typography } from '@mui/material';
import { LogListDataTable } from './data-table';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { CollapsingHorizontalResizableLayout } from '../../shared/resizable-layout/collapsing-horizontal-resizer';
import { trpc } from '@worksheets/trpc/ide';
import { JSONViewer } from '../../execute-worksheet/json-viewer';
import { useUser } from '@worksheets/util/auth/client';
import { Emoji, useDebounce } from '@worksheets/ui/common';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Warning } from '@mui/icons-material';

export type LogListProps = {
  worksheetId?: string;
  executionId?: string;
  showExecutionIds?: boolean;
  disableRefresh?: boolean;
  disableTooltip?: string;
};

export const useThrottle = (delay: number) => {
  const [active, setActive] = useState(false);
  const stopLoading = useDebounce(delay, () => {
    setActive(false);
  });

  return {
    throttling: active,
    throttle: () => {
      setActive(true);
      stopLoading();
    },
  };
};

export const LogList: React.FC<LogListProps> = ({
  worksheetId = '',
  executionId,
  showExecutionIds,
  disableRefresh,
  disableTooltip,
}) => {
  const { throttling, throttle } = useThrottle(3000);
  const [viewingDetails, setViewingDetails] = useState<string>('');
  const { user } = useUser();

  const utils = trpc.useContext();

  const { data, isLoading } = trpc.worksheets.logs.get.useQuery(
    { worksheetId, executionId },
    {
      enabled: !!worksheetId && !!user && !throttling,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  return (
    <CollapsingHorizontalResizableLayout
      primary={
        <Box width="100%" height="100%" overflow="scroll">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={1}
          >
            <Box display="flex" alignItems="center" gap={3}>
              <Typography variant="h6">Worksheet Logs</Typography>
              <Tooltip
                title="We're actively working on our logging systems, we're only showing you your 20 most recent logs."
                placement="top"
              >
                <Warning color="warning" />
              </Tooltip>
            </Box>
            <Box display="flex" alignItems="center" gap={4}>
              <Tooltip
                title="We're currently working on this feature, clicking here will let us know you're excited for it!"
                placement="top"
              >
                <span>
                  <Button
                    startIcon={<Emoji label="instant speed" symbol={9889} />}
                    variant="outlined"
                  >
                    Live
                  </Button>
                </span>
              </Tooltip>
              <Tooltip
                placement="top"
                title={disableTooltip}
                disableHoverListener={!disableRefresh || !disableTooltip}
              >
                <span>
                  <Button
                    variant="contained"
                    disabled={disableRefresh || isLoading || throttling}
                    startIcon={<RefreshIcon />}
                    onClick={() => {
                      throttle();
                      utils.worksheets.logs.get.invalidate({
                        worksheetId,
                        executionId,
                      });
                    }}
                  >
                    {' '}
                    {isLoading
                      ? 'Loading...'
                      : throttling
                      ? 'Waiting...'
                      : 'Refresh'}
                  </Button>
                </span>
              </Tooltip>
            </Box>
          </Box>
          <Divider />
          <LogListDataTable
            showExecutionIds={showExecutionIds}
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
