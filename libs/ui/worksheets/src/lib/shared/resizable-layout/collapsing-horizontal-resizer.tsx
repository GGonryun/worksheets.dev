import styles from './resizer.module.scss';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { HorizontalResizerLayout } from './horizontal-resizer-layout';

export type ResizableLayoutProps = {
  atomicId?: string;
  primary: React.ReactNode;
  secondary: {
    content: React.ReactNode;
    title: string;
    hidden: boolean;
    closeIcon?: React.ReactNode;
    openIcon?: React.ReactNode;
    defaultSize?: number;
    minSize?: number;
    // if provided renders the sidebar opener
    onOpen?: () => void;
    onClose: () => void;
  };
};

export function CollapsingHorizontalResizableLayout({
  atomicId,
  primary,
  secondary,
}: ResizableLayoutProps) {
  return (
    <Box display="flex" height="100%">
      <HorizontalResizerLayout
        atomicId={atomicId}
        hideHandles={secondary.hidden}
        panels={[
          { content: primary, visible: true },
          {
            visible: !secondary.hidden,
            collapsible: false,
            defaultSize: secondary.defaultSize ?? 30,
            minSize: secondary.minSize ?? 20,
            content: (
              <Box width="100%" height="100%">
                <Box
                  display="flex"
                  px={3}
                  py={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6">{secondary.title}</Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => secondary.onClose()}
                    sx={{ alignItems: 'flex-start' }}
                  >
                    {secondary.closeIcon ?? <LastPageIcon />}
                  </Button>
                </Box>
                <Divider />
                <div className={styles.PanelContent}>{secondary.content}</div>
              </Box>
            ),
          },
        ]}
      />
      {secondary.onOpen && secondary.hidden && (
        <Box display="flex" height="100%">
          <Divider orientation="vertical" />
          <Box py={1}>
            <IconButton
              onClick={secondary.onOpen}
              sx={{ alignItems: 'flex-start' }}
            >
              {secondary.openIcon ?? <FirstPageIcon />}
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}
