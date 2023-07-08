import {
  Alert,
  Box,
  Button,
  Divider,
  Snackbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import {
  durationFromSeconds,
  formatTimestampLong,
  printCountdownDuration,
} from '@worksheets/util/time';
import { IconButton } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useSnackbar } from '../../shared/useSnackbar';
import EditIcon from '@mui/icons-material/EditOutlined';
import { InvocationUrl } from './invocation-url';
import { EditNameDialog } from './dialogs/edit-name';
import { EditDescriptionDialog } from './dialogs/edit-description';
import { EditLogLevelDialog } from './dialogs/edit-log-level';
import { LogLevel } from '@worksheets/data-access/tasks';
import { trpc } from '@worksheets/trpc/ide';
import { UpdateWorksheetRequest } from '../../shared/types';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { TinyToggle } from '../../shared/tiny-toggle';
import { EditTimeoutDialog } from './dialogs/edit-timeout';
import { ConfigurationOption } from '../../shared/configuration-option';
import { LogLevelVerbosityChip } from '../../shared/log-level-verbosity-chip';
import { useUser } from '@worksheets/util/auth/client';
import { SERVER_SETTINGS } from '@worksheets/data-access/server-settings';

export const GeneralConfiguration: React.FC = () => {
  const { query, push } = useRouter();
  const { user } = useUser();

  const worksheetId = query.id as string;

  const deleteWorksheet = trpc.worksheets.delete.useMutation();

  const handleDeleteWorksheet = async () => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        "This will also delete your worksheet's execution history and logs. Are you sure?"
      )
    ) {
      await deleteWorksheet.mutateAsync({ id: worksheetId }).then(() => {
        push('/worksheets');
      });
    }
  };

  const utils = trpc.useContext();

  const { data } = trpc.worksheets.get.useQuery(
    { worksheetId },
    { enabled: !!worksheetId && !!user }
  );

  const updateWorksheet = trpc.worksheets.update.useMutation();

  // TODO: import notistack.
  const { open, handleClose, handleClick } = useSnackbar();
  const [editingField, setEditingField] = useState('');

  const handleUpdateWorksheet = async (
    applyChanges: Partial<UpdateWorksheetRequest>
  ) => {
    await updateWorksheet.mutateAsync({
      worksheetId,
      ...applyChanges,
    });
    utils.worksheets.get.invalidate();
  };

  const handleUpdateWorksheetName = async (name: string) => {
    await handleUpdateWorksheet({ name });
  };

  const handleUpdateWorksheetDescription = async (description: string) => {
    await handleUpdateWorksheet({ description });
  };

  const handleUpdateLogLevel = async (logLevel: LogLevel) => {
    await handleUpdateWorksheet({ logLevel });
  };

  const handleUpdateEnabled = async (enabled: boolean) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        'This will affect all current and future executions of this worksheet. Are you sure?'
      )
    ) {
      await handleUpdateWorksheet({ enabled });
    }
  };

  const handleUpdateTimeout = async (timeout: number) => {
    await handleUpdateWorksheet({ timeout });
  };

  return (
    <>
      {/* General Configuration Form */}
      <Box p={3} display="flex" flexDirection="column" gap={1.25}>
        <ConfigurationOption
          label={'Enabled'}
          content={
            <TinyToggle value={data?.enabled} onChange={handleUpdateEnabled} />
          }
        />
        <ConfigurationOption label={'Identifier'} content={data?.id} />

        <ConfigurationOption
          label={'Published time'}
          content={formatTimestampLong(data?.createdAt)}
        />
        <ConfigurationOption
          label={'Most recent update'}
          content={formatTimestampLong(data?.updatedAt)}
        />
        <ConfigurationOption
          label={'Execution URL'}
          content={
            <InvocationUrl
              url={SERVER_SETTINGS.WEBSITES.APP_URL(`/api/execute/${data?.id}`)}
              onClick={handleClick}
            />
          }
        />
        <Divider />
        <ConfigurationOption
          label={'Name'}
          content={data?.name}
          onEdit={() => setEditingField('name')}
        />
        <ConfigurationOption
          label={'Description'}
          content={data?.description || 'None'}
          onEdit={() => setEditingField('description')}
        />
        <ConfigurationOption
          label={'Defalt log Level'}
          tooltip={'Set a default value. You can override this later.'}
          content={<LogLevelVerbosityChip verbosity={data?.logLevel} />}
          onEdit={() => setEditingField('logging')}
        />
        <ConfigurationOption
          label={'Default timeout'}
          tooltip={'Set a default value. You can override this later.'}
          content={printCountdownDuration(
            durationFromSeconds(data?.timeout ?? 0)
          )}
          onEdit={() => setEditingField('timeout')}
        />
        <br />
        <ConfigurationOption
          label={'Delete'}
          content={
            <Box>
              <Button
                color="inherit"
                size="small"
                startIcon={<DeleteOutlineOutlinedIcon />}
                onClick={handleDeleteWorksheet}
                sx={{ fontWeight: 900, p: 0 }}
              >
                Destroy permanently
              </Button>
            </Box>
          }
        />
      </Box>

      {/* Dialog Fields */}
      <EditNameDialog
        value={data?.name || ''}
        open={editingField === 'name'}
        onClose={() => setEditingField('')}
        onSubmit={handleUpdateWorksheetName}
      />

      <EditDescriptionDialog
        value={data?.description || ''}
        open={editingField === 'description'}
        onClose={() => setEditingField('')}
        onSubmit={handleUpdateWorksheetDescription}
      />

      <EditLogLevelDialog
        value={data?.logLevel || 'trace'}
        open={editingField === 'logging'}
        onClose={() => setEditingField('')}
        onSubmit={handleUpdateLogLevel}
      />

      <EditTimeoutDialog
        value={data?.timeout ?? 0}
        open={editingField === 'timeout'}
        onClose={() => setEditingField('')}
        onSubmit={handleUpdateTimeout}
      />

      {/* TODO: Globalize Snackbars */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Copied to clipboard
        </Alert>
      </Snackbar>
    </>
  );
};

export const EditableLabel: React.FC<{ label: string }> = ({ label }) => (
  <Box>
    <Typography fontWeight={900} variant="body2">
      {label}
    </Typography>
  </Box>
);

export const EditableField: React.FC<{
  content: ReactNode;
  onEdit?: () => void;
}> = ({ content, onEdit }) => (
  <Box display="flex" alignItems="center" gap={1}>
    {typeof content === 'string' ? (
      <Typography variant="body2">{content}</Typography>
    ) : (
      content
    )}
    {Boolean(onEdit) && (
      <IconButton sx={{ p: 0, m: 0 }} onClick={onEdit}>
        <EditIcon color="primary" fontSize="small" />
      </IconButton>
    )}
  </Box>
);
