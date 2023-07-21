import { DynamicCodeEditor } from './dynamic-editor';
import { UnopinionatedEditorProps } from './unopinionated-editor';

export function UnopinionatedCodeEditor(props: UnopinionatedEditorProps) {
  return <DynamicCodeEditor {...props} />;
}
