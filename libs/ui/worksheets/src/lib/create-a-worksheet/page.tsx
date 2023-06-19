import { Box, Divider, IconButton, Typography } from '@mui/material';
import Layout from '../layout';
import { CreationProgress } from './progress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ConfigFormValues, ConfigureForm } from './configure/form';
import { useReducer, useState } from 'react';
import { useRouter } from 'next/router';
import { isEqual } from 'lodash';
import { DefineInstructionsForm } from './define-instructions/form';
import { ConnectionsForm } from './connection-form';
import { useUser } from '@worksheets/util/auth/client';
import { warn } from '@worksheets/ui/common';
import {
  PostWorksheetRequest,
  PostWorksheetResponse,
} from '@worksheets/api/worksheets';

const defaultYaml = `
name: iterating loops
assign:
  loop: [1, 2, 3, 4, apple]
  data:

steps:
  - for: loop
    index: i
    value: v
    steps:
      - assign:
        data: \${v}

return: \${data}
`;

const newWorksheetRequest: PostWorksheetRequest = {
  name: '',
  text: defaultYaml.trim(),
  description: '',
  logging: 'trace',
  trigger: '',
  schedules: [],
  events: [],
  connections: [],
};

// checks to see if the values matches the default entities values
const hasNoChanges = (value: PostWorksheetRequest) => {
  return Object.entries(value).every(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ([k, v]) => isEqual((newWorksheetRequest as any)[k], v)
  );
};

// create a reducer that allows us to update properties of the worksheet
type WorksheetBuilderActions =
  | ({ type: 'update-config' } & ConfigFormValues)
  | { type: 'update-yaml'; text: string };

type WorksheetBuilderState = PostWorksheetRequest;

function worksheetBuilderReducer(
  state: WorksheetBuilderState,
  action: WorksheetBuilderActions
): WorksheetBuilderState {
  console.log('action', action);
  switch (action.type) {
    case 'update-config':
      return { ...state, ...action };
    case 'update-yaml':
      return { ...state, text: action.text };

    default:
      return state;
  }
}

export function CreateAWorksheetPage() {
  const { push } = useRouter();
  const {
    request: { secure },
  } = useUser();
  const [step, setStep] = useState(0);
  const [state, dispatch] = useReducer(
    worksheetBuilderReducer,
    newWorksheetRequest
  );

  const leavePage = () => {
    if (
      hasNoChanges(state) ||
      // eslint-disable-next-line no-restricted-globals
      confirm('You have unfinished changes. Are you sure?')
    ) {
      push('/worksheets');
    }
  };

  const handleSaveWorksheet = async (connections: string[]) => {
    // TODO: dispatch a creation event to save the worksheet w/ connections + current state.
    try {
      const result = await secure<PutWorksheetResponse>(
        '/api/worksheets',
        'PUT',
        { ...state, connections }
      );
      push(`/worksheets/${result}`);
    } catch (error) {
      warn(`Failed to save worksheet ${state.name}`)(error);
    }
  };

  return (
    <Layout>
      <Box display="flex" flexDirection="column" height="100%">
        <Box display="flex" alignItems="center" gap={3} padding={1}>
          <IconButton onClick={leavePage}>
            <ArrowBackIcon color="primary" />
          </IconButton>
          <Typography variant="h6">Create a Worksheet</Typography>
        </Box>
        <Divider />
        <Box maxWidth={'500px'} p={3}>
          <CreationProgress activeStep={step} />
        </Box>
        <Divider />
        {step === 0 && (
          <ConfigureForm
            state={state}
            onCancel={leavePage}
            onSubmit={(values) => {
              dispatch({ type: 'update-config', ...values });
              setStep(1);
            }}
          />
        )}
        {step === 1 && (
          <DefineInstructionsForm
            yaml={state.text}
            onPrevious={() => setStep(0)}
            onSubmit={(values) => {
              dispatch({ type: 'update-yaml', text: values.yaml });
              setStep(2);
            }}
            onCancel={leavePage}
          />
        )}
        {step === 2 && (
          <ConnectionsForm
            onPrevious={() => setStep(1)}
            onSubmit={(values) => handleSaveWorksheet(values.connections)}
            onCancel={leavePage}
          />
        )}
      </Box>
    </Layout>
  );
}
