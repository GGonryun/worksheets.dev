import { PanelGroup } from 'react-resizable-panels';

import styles from './resizer.module.scss';
import { Box } from '@mui/material';
import { ResizablePanelProps } from './types';
import { HorizontalResizeHandler } from './horizontal-resize-handle';
import { Fragment } from 'react';
import { StackPanel } from './stack-panel';

export type HorizontalResizerLayoutProps = {
  atomicId?: string;
  panels: ResizablePanelProps[];
  hideHandles?: boolean;
};

export function HorizontalResizerLayout({
  panels,
  hideHandles,
}: HorizontalResizerLayoutProps) {
  return (
    <div className={styles.Container}>
      <PanelGroup direction="horizontal">
        {panels.map((p, i) => (
          <Fragment key={i}>
            <StackPanel {...p} order={i} />
            {!hideHandles && i !== panels.length - 1 && <ResizeHandler />}
          </Fragment>
        ))}
      </PanelGroup>
    </div>
  );
}

export const ResizeHandler = () => (
  <Box
    sx={(theme) => ({
      borderLeft: `1px solid ${theme.palette.divider}`,
      borderRight: `1px solid ${theme.palette.divider}`,
      stroke: theme.palette.grey[600],
      backgroundColor: theme.palette.grey[200],
    })}
  >
    <HorizontalResizeHandler />
  </Box>
);
