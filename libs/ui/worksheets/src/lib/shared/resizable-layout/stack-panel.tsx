import { Panel } from 'react-resizable-panels';
import { ResizablePanelProps } from './types';
import styles from './resizer.module.scss';

export const StackPanel: React.FC<ResizablePanelProps> = ({
  visible = true,
  content,
  order,
  collapsible = true,

  ...props
}) => {
  if (!visible) return null;
  return (
    <Panel
      className={styles.Panel}
      order={order}
      collapsible={collapsible}
      {...props}
    >
      <div className={styles.PanelContent}>{content}</div>
    </Panel>
  );
};
