import TreeItem from '@mui/lab/TreeItem';
import { Box, Button, Typography } from '@mui/material';
import { ShowDataField } from '../common/show-data-field';
import ContentPasteGoOutlinedIcon from '@mui/icons-material/ContentPasteGoOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import {
  Template,
  listTemplates,
  listNumTemplates,
} from '@worksheets/feat/templates';
import { useUser } from '@worksheets/util/auth/client';

export type TemplatesProps = {
  onClipboard: (t: Template) => void;
  onClone: (t: Template) => void;
};
export function Templates({ onClipboard, onClone }: TemplatesProps) {
  const templates = listTemplates();
  const numTemplates = listNumTemplates();

  return (
    <TreeItem
      nodeId={'templates'}
      label={<Typography>Templates ({numTemplates})</Typography>}
    >
      {Object.keys(templates)?.map((folderName, i) => (
        <TreeItem
          key={`${folderName}${i}`}
          nodeId={`${folderName}${i}`}
          label={folderName}
          sx={{ borderLeft: '1px solid grey' }}
        >
          {Object.keys(templates[folderName]).map((fileName) => (
            <TemplateItem
              onClipboard={onClipboard}
              onClone={onClone}
              label={fileName}
              key={`${folderName}${fileName}${i}`}
              id={`${folderName}${fileName}${i}`}
              text={templates[folderName][fileName]}
            />
          ))}
        </TreeItem>
      ))}
    </TreeItem>
  );
}

export type TemplateItemProps = Template & {
  label: string;
  onClipboard: (t: Template) => void;
  onClone: (t: Template) => void;
};

function TemplateItem({
  id,
  text,
  label,
  onClipboard,
  onClone,
}: TemplateItemProps) {
  const { user } = useUser();
  return (
    <TreeItem nodeId={id} label={label} sx={{ borderLeft: '1px solid grey' }}>
      <Box
        p={1}
        display="flex"
        flexDirection="column"
        gap={1}
        sx={{ borderLeft: '1px solid grey' }}
      >
        <ShowDataField text={text ?? ''} />
        <Button
          onClick={() => onClipboard({ id, text })}
          fullWidth
          variant="contained"
          color="secondary"
          endIcon={<ContentPasteGoOutlinedIcon fontSize="small" />}
        >
          clipboard
        </Button>
        {user && (
          <Button
            onClick={() => onClone({ id, text })}
            fullWidth
            variant="contained"
            color="success"
            endIcon={<ContentCopyOutlinedIcon fontSize="small" />}
          >
            clone
          </Button>
        )}
      </Box>
    </TreeItem>
  );
}