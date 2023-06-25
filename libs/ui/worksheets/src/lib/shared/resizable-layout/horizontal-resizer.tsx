import { Panel, PanelGroup, PanelProps } from 'react-resizable-panels';

import styles from './resizer.module.scss';
import { Divider } from '@mui/material';
import { ResizeHandle } from './resize-handle';

type ResizablePanelProps = {
  content: React.ReactNode;
  visible?: boolean;
} & PanelProps;

export type HorizontalResizableLayoutProps = {
  atomicId?: string;
  left: ResizablePanelProps;
  right: ResizablePanelProps;
};

export function HorizontalResizableLayout({
  atomicId,
  left,
  right,
}: HorizontalResizableLayoutProps) {
  const { content: leftContent, visible: leftVisible, ...leftProps } = left;
  const { content: rightContent, visible: rightVisible, ...rightProps } = right;
  return (
    <div className={styles.Container}>
      <div className={styles.BottomRow}>
        <PanelGroup direction="horizontal">
          {leftVisible && (
            <Panel {...leftProps} className={styles.Panel} order={1}>
              <div className={styles.PanelContent}>{leftContent}</div>
            </Panel>
          )}

          {rightVisible && (
            <>
              <ResizeHandle horizontal />
              <Divider orientation="vertical" />

              <Panel {...rightProps} className={styles.Panel} order={2}>
                <div className={styles.PanelContent}>{rightContent}</div>
              </Panel>
            </>
          )}
        </PanelGroup>
      </div>
    </div>
  );
}
