import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SourceVisualizer } from '../../shared/source-visualizer';
import { Box, Button, Tooltip } from '@mui/material';
import { getYamlCodeValidationErrors } from '@worksheets/ui/code-editor';
import { trpc } from '@worksheets/trpc/ide';

const editorEditingCaption =
  "press 'save' to save your changes or 'cancel' to discard them.";
export const SourceEditor = () => {
  const { query } = useRouter();
  const worksheetId = query.id as string;
  const editingQueryValue = query.edit as string;
  console.log('editing', editingQueryValue, !!editingQueryValue);

  const utils = trpc.useContext();
  const { data: worksheet, isLoading } = trpc.worksheets.get.useQuery(
    { worksheetId },
    { enabled: !!worksheetId }
  );

  const updateWorksheet = trpc.worksheets.update.useMutation();

  const [yaml, setYaml] = useState<string>(worksheet?.text ?? '');
  const [editing, setEditing] = useState<boolean>(false);
  const errors = getYamlCodeValidationErrors(yaml);

  useEffect(() => {
    setEditing(!!editingQueryValue);
  }, [editingQueryValue]);

  useEffect(() => {
    if (!isLoading) {
      worksheet?.text && setYaml(worksheet?.text);
    }
  }, [isLoading, worksheet, setYaml]);

  const handleEditSource = () => {
    setEditing(true);
  };

  const handleCancelEditing = () => {
    setEditing(false);
    setYaml(worksheet?.text ?? '');
  };

  const handleSaveChanges = async () => {
    if (errors) {
      return alert('Your code has errors. Fix them before saving.');
    }

    await updateWorksheet.mutateAsync({
      worksheetId,
      text: yaml,
    });
    utils.worksheets.get.invalidate();

    setEditing(false);
  };

  return (
    <SourceVisualizer
      toolbar={
        <Box px={6}>
          {!editing ? (
            <Button variant="contained" size="small" onClick={handleEditSource}>
              Edit
            </Button>
          ) : (
            <Box display="flex" gap={3}>
              <Tooltip
                title={`Line ${errors?.mark.line} contains invalid YAML: ${errors?.reason}`}
                disableHoverListener={!errors}
              >
                <span>
                  <Button
                    variant="contained"
                    size="small"
                    disabled={updateWorksheet.isLoading || !!errors}
                    onClick={handleSaveChanges}
                  >
                    Save
                  </Button>
                </span>
              </Tooltip>
              <Button size="small" onClick={handleCancelEditing}>
                Cancel
              </Button>
            </Box>
          )}
        </Box>
      }
      caption={editing ? editorEditingCaption : ''}
      disabled={!editing}
      text={yaml}
      onUpdate={(data) => {
        setYaml(data);
      }}
    />
  );
};
