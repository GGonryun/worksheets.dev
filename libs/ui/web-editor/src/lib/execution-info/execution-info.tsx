import styles from './execution-info.module.css';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { GetExecutionsResponse } from '../../api/execution/get';
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

export interface ExecutionInformationProps {
  worksheets?: GetExecutionsResponse;
  onClear: () => void;
  onDelete: (executionId: string) => void;
  onReplay: (executionId: string) => void;
}

export function ExecutionInformation({
  worksheets,
  onClear,
  onDelete,
  onReplay,
}: ExecutionInformationProps) {
  return (
    <div className={styles['container']}>
      <Box display="flex" gap={3} alignItems="center">
        <Typography fontWeight={900}>Executions</Typography>
        <Button
          variant="outlined"
          color="error"
          size="small"
          fullWidth
          onClick={() => onClear()}
        >
          clear
        </Button>
      </Box>
      {worksheets?.map((execution, index) => (
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
            <Divider>CREATED AT</Divider>
            <Box>{new Date(timestamp).toUTCString()}</Box>
            <br />
            <Divider>DIMENSIONS</Divider>
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
            <br />
            <Divider>IDENTIFIERS</Divider>

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
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Box display="flex" flexDirection="column" gap={1}>
              <BlockedTextField label="worksheet" text={text ?? ''} />
              {!!result?.error && (
                <BlockedTextField
                  label="error"
                  text={JSON.stringify(result.error, null, 2)}
                />
              )}
              {!!result?.input && (
                <BlockedTextField
                  label="input"
                  text={JSON.stringify(result.input, null, 2)}
                />
              )}
              {!!result?.output && (
                <BlockedTextField
                  label="output"
                  text={JSON.stringify(result.output, null, 2)}
                />
              )}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  onReplay();
                  setOpen(false);
                }}
              >
                Replay
              </Button>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
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
        <Box pb={1} pl={1}>
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
      <Divider sx={{ pb: 1 }}>{label}</Divider>

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
