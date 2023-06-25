import { Panel, PanelGroup, PanelProps } from 'react-resizable-panels';

import styles from './resizer.module.scss';
import { Divider } from '@mui/material';
import { ResizeHandle } from './resize-handle';

type ResizablePanelProps = {
  content: React.ReactNode;
  visible?: boolean;
} & PanelProps;

export type VerticalResizableLayoutProps = {
  atomicId?: string;
  top: ResizablePanelProps;
  bot: ResizablePanelProps;
};

export function VerticalResizableLayout({
  atomicId,
  top,
  bot,
}: VerticalResizableLayoutProps) {
  const { content: topContent, visible: topVisible, ...topProps } = top;
  const { content: botContent, visible: botVisible, ...botProps } = bot;
  return (
    <div className={styles.Container}>
      <PanelGroup direction="vertical">
        {topVisible && (
          <>
            <Panel className={styles.Panel} order={1} {...topProps}>
              <div className={styles.PanelContent}>{topContent}</div>
            </Panel>
            <ResizeHandle vertical />
            <Divider />
          </>
        )}
        {botVisible && (
          <Panel className={styles.Panel} order={2} {...botProps}>
            <div className={styles.PanelContent}>{botContent}</div>
          </Panel>
        )}
      </PanelGroup>
    </div>
  );
}
