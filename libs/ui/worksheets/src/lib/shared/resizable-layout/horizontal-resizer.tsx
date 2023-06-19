import { Panel, PanelGroup, PanelProps } from 'react-resizable-panels';
import { PanelResizeHandle } from 'react-resizable-panels';

import styles from './horizontal-resizer.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { Divider } from '@mui/material';
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

type ResizablePanelProps = {
  content: React.ReactNode;
  visible?: boolean;
} & PanelProps;

export type HorizontalResizableLayoutProps = {
  left: ResizablePanelProps;
  right: ResizablePanelProps;
};

export function HorizontalResizableLayout({
  left,
  right,
}: HorizontalResizableLayoutProps) {
  const { content: leftContent, visible: leftVisible, ...leftProps } = left;
  const { content: rightContent, visible: rightVisible, ...rightProps } = right;
  return (
    <div className={styles.Container}>
      <div className={styles.BottomRow}>
        <PanelGroup autoSaveId={uuidv4()} direction="horizontal">
          {leftVisible && (
            <Panel {...leftProps} className={styles.Panel} order={1}>
              <div className={styles.PanelContent}>{leftContent}</div>
            </Panel>
          )}

          {rightVisible && (
            <>
              <ResizeHandle />
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
