import { Box, Divider, IconButton, Typography } from '@mui/material';
import WebsiteLayout from '../website-layout';
import { CreationProgress } from './progress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ConfigFormValues, ConfigureForm } from './configure/form';
import { useReducer, useState } from 'react';
import { useRouter } from 'next/router';
import { isEqual } from 'lodash';
import { DefineInstructionsForm } from './define-instructions/form';
import { ConnectionsForm } from './connection-form';
import { warn } from '@worksheets/ui/common';
import { trpc } from '@worksheets/trpc/ide';
import { CreateWorksheetRequest } from '../shared/types';

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

const newWorksheetRequest: CreateWorksheetRequest = {
  name: '',
  text: defaultYaml.trim(),
  description: '',
  logging: 'trace',
  schedules: [],
  events: [],
  connections: [],
};

// checks to see if the values matches the default entities values
const hasNoChanges = (value: CreateWorksheetRequest) => {
  return Object.entries(value).every(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ([k, v]) => isEqual((newWorksheetRequest as any)[k], v)
  );
};

// create a reducer that allows us to update properties of the worksheet
type WorksheetBuilderActions =
  | ({ type: 'update-config' } & ConfigFormValues)
  | { type: 'update-yaml'; text: string };

type WorksheetBuilderState = CreateWorksheetRequest;

function worksheetBuilderReducer(
  state: WorksheetBuilderState,
  action: WorksheetBuilderActions
): WorksheetBuilderState {
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
  const [step, setStep] = useState(0);
  const [state, dispatch] = useReducer(
    worksheetBuilderReducer,
    newWorksheetRequest
  );

  const createWorksheet = trpc.worksheets.create.useMutation();

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
    try {
      const payload = { ...state, connections };
      console.log('mutating async with payload', payload);
      const data = await createWorksheet.mutateAsync(payload);
      push(`/worksheets/${data}`);
    } catch (error) {
      warn(`Failed to save worksheet ${state.name}`)(error);
    }
  };

  return (
    <WebsiteLayout>
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
    </WebsiteLayout>
  );
}