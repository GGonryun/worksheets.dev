import TreeItem from '@mui/lab/TreeItem';
import { Box, Button, Typography } from '@mui/material';
import { ShowDataField } from '../common/show-data-field';
import ContentPasteGoOutlinedIcon from '@mui/icons-material/ContentPasteGoOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { Template } from '@worksheets/templates';

export type TemplatesProps = {
  templates: Template[];
  onClipboard: (t: Template) => void;
  onClone: (t: Template) => void;
};
export function Templates({ templates, onClipboard, onClone }: TemplatesProps) {
  return (
    <TreeItem
      nodeId={'templates'}
      label={<Typography>Templates ({templates?.length})</Typography>}
    >
      {templates?.map((d) => (
        <TemplateItem
          onClipboard={onClipboard}
          onClone={onClone}
          key={d.id}
          {...d}
        ></TemplateItem>
      ))}
    </TreeItem>
  );
}

export type TemplateItemProps = Template & {
  onClipboard: (t: Template) => void;
  onClone: (t: Template) => void;
};

function TemplateItem({ id, text, onClipboard, onClone }: TemplateItemProps) {
  return (
    <TreeItem nodeId={id} label={id} sx={{ borderLeft: '1px solid grey' }}>
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
        <Button
          onClick={() => onClone({ id, text })}
          fullWidth
          variant="contained"
          color="success"
          endIcon={<ContentCopyOutlinedIcon fontSize="small" />}
        >
          clone
        </Button>
      </Box>
    </TreeItem>
  );
}
