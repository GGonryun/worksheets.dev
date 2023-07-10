import { Box, Divider, IconButton, Typography } from '@mui/material';
import WebsiteLayout from '../website-layout';
import { CreationProgress } from './progress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ConfigFormValues, ConfigureForm } from './configure/form';
import { useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/router';
import { isEqual } from 'lodash';
import { DefineInstructionsForm } from './define-instructions/form';
import { ConnectionsForm } from './connection-form';
import { warn } from '@worksheets/ui/common';
import { trpc } from '@worksheets/trpc/ide';
import { CreateWorksheetRequest } from '../shared/types';
import { useUser } from '@worksheets/util/auth/client';
import { DEFAULT_SAMPLE_TEMPLATE } from '@worksheets/util-worksheets';

const newWorksheetRequest: CreateWorksheetRequest = {
  name: '',
  text: DEFAULT_SAMPLE_TEMPLATE,
  description: '',
  verbosity: 'info',
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
  | ({ type: 'update-config' } & Partial<ConfigFormValues>)
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
  const { push, query } = useRouter();
  const templateId = query.templateId as string;

  const { user } = useUser();

  const [step, setStep] = useState(0);
  const [state, dispatch] = useReducer(
    worksheetBuilderReducer,
    newWorksheetRequest
  );

  const { data: worksheets } = trpc.worksheets.table.useQuery(undefined, {
    enabled: !!user,
  });

  const { data: template, isLoading } = trpc.templates.get.useQuery(
    { templateId },
    {
      enabled: !!templateId,
    }
  );

  const createWorksheet = trpc.worksheets.create.useMutation();

  useEffect(() => {
    if (template && !isLoading) {
      dispatch({
        ...newWorksheetRequest,
        type: 'update-config',
        name: template.description,
        description: `copied from template ${template.id}`,
      });

      dispatch({
        type: 'update-yaml',
        text: template.text,
      });
    }
  }, [template, isLoading]);

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
            worksheets={worksheets}
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
