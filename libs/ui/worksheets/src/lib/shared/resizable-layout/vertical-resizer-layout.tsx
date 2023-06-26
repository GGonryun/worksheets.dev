import styles from './resizer.module.scss';
import { PanelGroup } from 'react-resizable-panels';
import { Box } from '@mui/material';
import { ResizablePanelProps } from './types';
import { VerticalResizeHandle } from './vertical-resize-handle';
import { Fragment } from 'react';
import { StackPanel } from './stack-panel';

export type VerticalResizerLayoutProps = {
  panels: ResizablePanelProps[];
};

export function VerticalResizerLayout({ panels }: VerticalResizerLayoutProps) {
  return (
    <div className={styles.Container}>
      <PanelGroup direction="vertical">
        {panels.map((p, i) => (
          <Fragment key={i}>
            <StackPanel {...p} order={i} />
            {i !== panels.length - 1 && <ResizeHandler />}
          </Fragment>
        ))}
      </PanelGroup>
    </div>
  );
}

export const ResizeHandler = () => (
  <Box
    sx={(theme) => ({
      borderTop: `1px solid ${theme.palette.divider}`,
      borderBottom: `1px solid ${theme.palette.divider}`,
      stroke: theme.palette.grey[600],
      backgroundColor: theme.palette.grey[200],
    })}
  >
    <VerticalResizeHandle />
  </Box>
);
