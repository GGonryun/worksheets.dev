import { DynamicCodeEditor } from './dynamic-editor';

export type AceEditorProps = {
  width?: string;
  value: string;
  mode: 'yaml' | 'json';
  theme: 'light' | 'dark';
  onChange: (newValue: string) => void;
};

export function CodeEditor(props: AceEditorProps) {
  return <DynamicCodeEditor {...props} />;
}
