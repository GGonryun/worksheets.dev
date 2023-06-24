import {
  Alert,
  Box,
  Button,
  Divider,
  Snackbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { formatTimestampLong } from '@worksheets/util/time';
import { IconButton } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useSnackbar } from '../../shared/useSnackbar';
import EditIcon from '@mui/icons-material/EditOutlined';
import { capitalizeFirstLetter } from '@worksheets/util/strings';
import { InvocationUrl } from './invocation-url';
import { EditNameDialog } from './dialogs/edit-name';
import { EditDescriptionDialog } from './dialogs/edit-description';
import { EditLogLevelDialog } from './dialogs/edit-log-level';
import { LogLevel } from '@worksheets/data-access/tasks';
import { trpc } from '@worksheets/trpc/ide';
import { UpdateWorksheetRequest } from '../../shared/types';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { TinyToggle } from '../../shared/tiny-toggle';

type GeneralDetailsProps = {
  details: string[];
};

export const GeneralConfiguration: React.FC<GeneralDetailsProps> = ({
  details,
}) => {
  const { query, push } = useRouter();

  const worksheetId = query.id as string;

  const deleteWorksheet = trpc.worksheets.delete.useMutation();

  const handleDeleteWorksheet = async () => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        "This will also delete your worksheet's execution history and logs. Are you sure?"
      )
    ) {
      await deleteWorksheet.mutateAsync({ id: worksheetId });
      push('/worksheets');
    }
  };

  const utils = trpc.useContext();

  const { data } = trpc.worksheets.get.useQuery(
    { id: worksheetId },
    { enabled: !!worksheetId }
  );

  const updateWorksheet = trpc.worksheets.update.useMutation();

  // TODO: import notistack.
  const { open, handleClose, handleClick } = useSnackbar();
  const executableUrl = `http://worksheets.dev/api/execute/${data?.id}`;
  const [editingField, setEditingField] = useState('');

  const handleUpdateWorksheet = async (
    applyChanges: Partial<UpdateWorksheetRequest>
  ) => {
    await updateWorksheet.mutateAsync({
      id: worksheetId,
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

  const handleUpdateLogLevel = async (logging: LogLevel) => {
    await handleUpdateWorksheet({ logging });
  };

  const handleUpdateEnabled = async (enabled: boolean) => {
    await handleUpdateWorksheet({ enabled });
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
          content={<InvocationUrl url={executableUrl} onClick={handleClick} />}
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
          label={'Log Level'}
          content={capitalizeFirstLetter(data?.logging ?? '')}
          onEdit={() => setEditingField('logging')}
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
        value={data?.logging || 'trace'}
        open={editingField === 'logging'}
        onClose={() => setEditingField('')}
        onSubmit={handleUpdateLogLevel}
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

export type ConfigurationOptionProps = {
  label: string;
  content?: ReactNode;
  onEdit?: () => void;
};
export const ConfigurationOption = ({
  label,
  content,
  onEdit,
}: ConfigurationOptionProps) => (
  <Box display="flex" alignItems="center">
    <Box width="150px">
      <EditableLabel label={label} />
    </Box>
    <Box>
      <EditableField content={content} onEdit={onEdit} />
    </Box>
  </Box>
);

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
