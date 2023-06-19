import { PanelResizeHandle } from 'react-resizable-panels';

import styles from './horizontal-resizer.module.scss';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { HorizontalResizableLayout } from './horizontal-resizer';

export function ResizeHandle({
  className = '',
  id,
}: {
  className?: string;
  id?: string;
}) {
  return (
    <PanelResizeHandle
      className={[styles.ResizeHandleOuter, className].join(' ')}
      id={id}
    >
      <div className={styles.ResizeHandleInner}>
        <div className={styles.IconBox}>
          <svg
            className={styles.Icon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 14H19M5 10H19" stroke="#000000" />
          </svg>
        </div>
      </div>
    </PanelResizeHandle>
  );
}

export type ResizableLayoutProps = {
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
  primary,
  secondary,
}: ResizableLayoutProps) {
  return (
    <Box display="flex" height="100%">
      <HorizontalResizableLayout
        left={{ content: primary, visible: true }}
        right={{
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
        }}
      />
      {secondary.onOpen && secondary.hidden && (
        <Box height="100%" display="flex">
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
