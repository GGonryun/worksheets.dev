import useSWR from 'swr';
import styles from './execution-info.module.css';
import { web } from '@worksheets/auth/client';
import {
  Box,
  Button,
  Collapse,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { GetExecutionsResponse } from '../../api/execution/get';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import BubbleChartOutlinedIcon from '@mui/icons-material/BubbleChartOutlined';
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

/* eslint-disable-next-line */
export interface ExecutionInformationProps {
  worksheetId: string;
  onDelete: (executionId: string) => void;
  onReplay: (executionId: string) => void;
}

export function ExecutionInformation({
  worksheetId,
  onDelete,
  onReplay,
}: ExecutionInformationProps) {
  const { data, isLoading } = useSWR<GetExecutionsResponse>(
    ...web.swr.basic(`/api/x?id=${worksheetId}`)
  );
  if (isLoading) {
    return <Box>Loading...</Box>;
  }
  return (
    <div className={styles['container']}>
      <Typography fontWeight={900}>Executions</Typography>
      {data?.map((execution, index) => (
        <Info
          key={index}
          index={index}
          onDelete={() => onDelete(execution.id)}
          onReplay={() => onReplay(execution.id)}
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
  onDelete,
  onReplay,
}: GetExecutionsResponse[number] & InfoProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box width={300}>
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
              icon={<BubbleChartOutlinedIcon fontSize="small" />}
              iconPosition="start"
            />
            <Tab
              classes={{ root: styles['tab'] }}
              icon={<ReplayIcon fontSize="small" />}
              iconPosition="start"
            />
            <Tab
              classes={{ root: styles['tab'] }}
              icon={<DeleteIcon fontSize="small" />}
              iconPosition="start"
            />
          </Tabs>
          <TabPanel value={value} index={0}>
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
              <Typography variant="overline">created at:</Typography>
              <br />
              {new Date(timestamp).toUTCString()}
            </Box>

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
                (bytes)
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BlockedTextField label="yaml" text={text ?? ''} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BlockedTextField
              label="error"
              text={JSON.stringify(result?.error, null, 2)}
            />
            <BlockedTextField
              label="input"
              text={JSON.stringify(result?.input, null, 2)}
            />
            <BlockedTextField
              label="output"
              text={JSON.stringify(result?.output, null, 2)}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <BlockedTextField
              label="input"
              text={JSON.stringify(result?.input, null, 2)}
            />
            <br />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onReplay()}
            >
              Replay
            </Button>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Button
              variant="contained"
              color="error"
              onClick={() => onDelete()}
            >
              Delete
            </Button>
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
    >
      {value === index && (
        <Box p={1}>
          <Typography variant="caption">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

type TextDataFieldProps = { label: string; text: string };
function BlockedTextField({ label, text }: TextDataFieldProps) {
  return (
    <Box display="flex" flexDirection="column">
      {label}
      <TextField
        InputProps={{
          className: styles['text'],
          classes: { disabled: styles['text'], root: styles['text'] },
        }}
        disabled
        value={text}
        multiline
        minRows={1}
        maxRows={8}
      />
    </Box>
  );
}

export default ExecutionInformation;
