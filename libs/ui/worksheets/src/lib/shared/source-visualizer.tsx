import { Box, Typography, Button, Divider } from '@mui/material';
import { CodeEditor } from '@worksheets/ui/code-editor';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { CollapsingHorizontalResizableLayout } from './resizable-layout/collapsing-horizontal-resizer';
import { ReactNode, useState } from 'react';

export const SourceVisualizer: React.FC<{
  text: string;
  onUpdate: (s: string) => void;
  disabled?: boolean;
  toolbar?: ReactNode;
  caption?: string;
}> = ({ text, onUpdate, disabled, toolbar, caption }) => {
  const [open, setOpen] = useState(true);
  return (
    <CollapsingHorizontalResizableLayout
      primary={
        <Box height="100%" width="100%">
          <Box
            display="flex"
            px={3}
            py={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Typography variant="h6">Source</Typography>
              {toolbar}
            </Box>
            <Button
              size="small"
              color="primary"
              sx={{ alignItems: 'flex-start' }}
              endIcon={<OpenInNewIcon />}
              href="/docs/worksheets/yaml-syntax"
              target="_blank"
            >
              Syntax Reference
            </Button>
          </Box>
          <Divider />
          <CodeEditor
            width="100%"
            value={text}
            disabled={disabled}
            mode={'yaml'}
            theme={'light'}
            onChange={(newValue) => onUpdate(newValue)}
            caption={caption}
          />
        </Box>
      }
      secondary={{
        content: <div>TODO</div>,
        title: 'Visualizer',
        hidden: !open,
        onClose: () => setOpen(false),
        onOpen: () => setOpen(true),
      }}
    />
  );
};
