import { DynamicCodeEditor } from './dynamic-editor';
import { AceEditorProps } from './ace-editor';

export function CodeEditor(props: AceEditorProps) {
  return <DynamicCodeEditor {...props} />;
}
