import { useEffect, useState } from 'react';
import { SourceVisualizer } from '../../shared/source-visualizer';
import { useUser } from '@worksheets/util/auth/client';
import { useRouter } from 'next/router';
import { GetWorksheetResponse } from '@worksheets/api/worksheets';
import { Box, Button } from '@mui/material';
import { getYamlCodeValidationErrors } from '@worksheets/ui/code-editor';

const editorEditingCaption =
  "press 'save' to save your changes or 'cancel' to discard them.";
export const SourceEditor = () => {
  const { query } = useRouter();
  const worksheetId = query.id as string;
  const {
    request: { secure, useSecure, mutate },
  } = useUser();

  const getWorksheetUrl = `/api/worksheets?worksheetId=${worksheetId}`;
  const { data: worksheet, isLoading } =
    useSecure<GetWorksheetResponse>(getWorksheetUrl);

  const [yaml, setYaml] = useState<string>(worksheet?.text ?? '');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!isLoading && !editing) {
      worksheet?.text && setYaml(worksheet?.text);
    }
  }, [isLoading, worksheet, setYaml, editing]);

  const handleEditSource = () => {
    setEditing(true);
  };

  const handleCancelEditing = () => {
    setEditing(false);
    setYaml(worksheet?.text ?? '');
  };

  const handleSaveChanges = async () => {
    const errors = getYamlCodeValidationErrors(yaml);
    if (errors) {
      return alert('Your code has errors. Fix them before saving.');
    }
    await secure(`/api/worksheets`, 'POST', { worksheetId, text: yaml });
    await mutate(getWorksheetUrl);
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
              <Button
                variant="contained"
                size="small"
                onClick={handleSaveChanges}
              >
                Save
              </Button>
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
