import { PanelProps } from 'react-resizable-panels';

export type ResizablePanelProps = {
  content: React.ReactNode;
  visible?: boolean;
} & PanelProps;
