import styles from './execution-info.module.css';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

// stack
import LineWeightRoundedIcon from '@mui/icons-material/LineWeightRounded';
//depth
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
// mass
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
// width
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import { ShowDataField } from '../common/show-data-field';
import { request, useUser } from '@worksheets/util/auth/client';
import { useRouter } from 'next/router';
import { warn } from '@worksheets/ui/common';
import { GetExecutionsResponse } from '@worksheets/api/executions';
import { DryExecutionRequest } from '@worksheets/api/test-run';

export function ExecutionInformation() {
  const { user } = useUser();
  const router = useRouter();
  const { worksheet } = router.query;
  const mutate = request.query.useMutate();
  const privateCommand = request.command.private(user);

  const worksheetId = worksheet as string;
  const executionsUrl = `/api/worksheets/${worksheetId}/executions`;

  const { data: executionsData } =
    request.query.usePublic<GetExecutionsResponse>(executionsUrl);

  function handleClearExecutions() {
    privateCommand(executionsUrl, 'DELETE')
      .then(() => mutate(executionsUrl))
      .catch(warn('failed to clear executions'));
  }

  function handleDeleteExecution(executionId: string) {
    privateCommand(executionsUrl, 'DELETE', { executionId })
      .then(() => mutate(executionsUrl))
      .catch(warn('failed to delete execution'));
  }

  function handleReplayExecution(executionId: string) {
    if (
      // we don't have context of the current text, so we need to save the state before replaying so we can just use the worksheet id
      // eslint-disable-next-line no-restricted-globals
      confirm(
        'must save current worksheet before replaying, press ok to save and continue'
      )
    ) {
      privateCommand<DryExecutionRequest>('/api/x/dry', 'POST', {
        worksheetId,
        replay: executionId,
      })
        .then(() => mutate(executionsUrl))
        .catch(warn('failed to replay execution'));
    }
  }
  return (
    <div>
      <Box display="flex" gap={3}>
        <Typography fontWeight={900}>Executions</Typography>
        {!!executionsData?.length && user && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            fullWidth
            onClick={() => handleClearExecutions()}
          >
            clear
          </Button>
        )}
      </Box>
      {executionsData?.map((execution, index) => (
        <Info
          key={index}
          index={index}
          onDelete={() => handleDeleteExecution(execution.id)}
          onReplay={() => handleReplayExecution(execution.id)}
          {...execution}
        />
      ))}
    </div>
  );
}

export type InfoProps = {
  index: number;
  onReplay: () => void;
  onDelete: () => void;
};

export function Info({
  dimensions,
  result,
  worksheetId,
  text,
  id,
  timestamp,
  index,
  userId,
  onDelete,
  onReplay,
}: GetExecutionsResponse[number] & InfoProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { user } = useUser();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Typography fontSize={14}>{index}.</Typography>
        <Button
          className={styles['info']}
          onClick={() => setOpen(!open)}
          color={result?.error ? 'error' : 'primary'}
        >
          {new Date(timestamp).toISOString()}
        </Button>
      </Box>
      <Collapse in={open}>
        <Box display="flex">
          <Tabs
            className={styles['tabs']}
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab
              classes={{ root: styles['tab'] }}
              icon={<InfoOutlinedIcon fontSize="small" />}
              iconPosition="start"
            />
            <Tab
              classes={{ root: styles['tab'] }}
              icon={<ArticleOutlinedIcon fontSize="small" />}
              iconPosition="start"
            />

            <Tab
              classes={{ root: styles['tab'] }}
              icon={<DeleteIcon fontSize="small" />}
              iconPosition="start"
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Divider>created at</Divider>
            <Box>{new Date(timestamp).toUTCString()}</Box>
            <br />
            <Divider>dimensions</Divider>
            <Box display="flex" flexDirection="column" gap={1} marginTop={1}>
              <Box display="flex" gap={1} alignItems="center">
                <TimerOutlinedIcon /> {(dimensions.depth / 1000).toFixed(2)}{' '}
                duration (sec)
              </Box>
              <Box display="flex" gap={1} alignItems="center">
                <LineWeightRoundedIcon /> {dimensions.height} stack (max height)
              </Box>
              <Box display="flex" gap={1} alignItems="center">
                <StraightenOutlinedIcon /> {dimensions.width} total
                (instructions)
              </Box>
              <Box display="flex" gap={1} alignItems="center">
                <ViewInArRoundedIcon /> {dimensions.mass.toFixed(2)} storage
                (units)
              </Box>
            </Box>
            <br />
            <Divider>identifiers</Divider>
            <Box>
              <Typography variant="overline">execution id:</Typography>
              <br />
              {id}
            </Box>
            <Box>
              <Typography variant="overline">worksheet id:</Typography>
              <br />
              {worksheetId}
            </Box>
            <Box>
              <Typography variant="overline">user id:</Typography>
              <br />
              {userId}
            </Box>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Box display="flex" flexDirection="column" gap={1}>
              <ShowDataField label="worksheet" text={text ?? ''} />
              {!!result?.error && (
                <ShowDataField
                  label="error"
                  text={JSON.stringify(result.error, null, 2)}
                />
              )}
              {!!result?.input && (
                <ShowDataField
                  label="input"
                  text={JSON.stringify(result.input, null, 2)}
                />
              )}
              {!!result?.output && (
                <ShowDataField
                  label="output"
                  text={JSON.stringify(result.output, null, 2)}
                />
              )}
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => onReplay()}
              >
                Replay
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Tooltip
              title={
                !user
                  ? 'anonymous users cannot delete execution history'
                  : undefined
              }
            >
              <Box>
                <Button
                  fullWidth
                  disabled={!user}
                  variant="contained"
                  color="error"
                  onClick={() => {
                    onDelete();
                    setOpen(false);
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Tooltip>
          </TabPanel>
        </Box>
      </Collapse>
    </Box>
  );
}

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box pb={1} pl={1}>
          <Typography variant="caption">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default ExecutionInformation;
