import { useState } from 'react';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { PanelResizeHandle } from 'react-resizable-panels';

import styles from './resizer.module.scss';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { v4 as uuidv4 } from 'uuid';
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
        <svg
          className={styles.Icon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 14H19M5 10H19" stroke="#000000" />
        </svg>
      </div>
    </PanelResizeHandle>
  );
}

export type ResizableLayoutProps = {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
};
export function ResizableLayout({
  leftContent,
  rightContent,
}: ResizableLayoutProps) {
  const [showLastPanel, setShowLastPanel] = useState(true);

  return (
    <div className={styles.Container}>
      <div className={styles.BottomRow}>
        <PanelGroup autoSaveId={uuidv4()} direction="horizontal">
          <Panel className={styles.Panel} collapsible={true} order={1}>
            <div className={styles.PanelContent}>{leftContent}</div>
          </Panel>

          {showLastPanel ? (
            <>
              <ResizeHandle />
              <Divider orientation="vertical" />
              <Panel
                className={styles.Panel}
                collapsible={false}
                defaultSize={30}
                minSize={20}
                order={2}
              >
                <Box
                  display="flex"
                  px={3}
                  py={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6">Visualization</Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => setShowLastPanel(!showLastPanel)}
                    sx={{ alignItems: 'flex-start' }}
                  >
                    <LastPageIcon />
                  </Button>
                </Box>
                <Divider />
                <div className={styles.PanelContent}>{rightContent}</div>
              </Panel>
            </>
          ) : (
            <Box height="100%" display="flex">
              <Divider orientation="vertical" />
              <Box py={1}>
                <IconButton
                  onClick={() => setShowLastPanel(!showLastPanel)}
                  sx={{ alignItems: 'flex-start' }}
                >
                  <FirstPageIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </PanelGroup>
      </div>
    </div>
  );
}
