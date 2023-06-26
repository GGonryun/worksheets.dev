import { useClipboard } from '@worksheets/ui/common';
import { JSONEditor } from './json-editor';

const DEFAULT_CAPTION = 'Editor is in read-only mode';
export const JSONViewer: React.FC<{
  title?: string;
  value: string;
  caption?: string;
}> = ({ title, value, caption = DEFAULT_CAPTION }) => {
  const clipboard = useClipboard();
  return (
    <JSONEditor
      title={title}
      hideActiveLine
      onCopy={() => clipboard.copy(value)}
      value={value}
      caption={caption}
    />
  );
};
