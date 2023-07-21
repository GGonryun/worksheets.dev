import { Ace } from 'ace-builds';
import AceEditor from 'react-ace';

import { ReactNode, useEffect, useState } from 'react';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/ext-language_tools';

import { getYamlCodeValidationErrors } from '../yaml';

export type UnopinionatedEditorProps = {
  width?: string;
  value: string;
  mode: 'yaml' | 'json' | 'typescript';
  theme: 'textmate' | 'monokai' | 'terminal';
  onChange?: (newValue: string) => void;
  onCopy?: () => void; // if present enables the copy button at the top right corner
  // captions should not be taller than 27 pixels otherwise you'll have to manage the height of the code editor yourself
  disabled?: boolean;
  caption?: ReactNode | string;
  hideActiveLineHighlighter?: boolean;
  hideLineNumbers?: boolean;
};

export default function UnopinionatedEditor({
  width,
  value,
  mode,
  theme,
  onChange,
  disabled,
  hideLineNumbers = false,
  hideActiveLineHighlighter = false,
}: UnopinionatedEditorProps) {
  const [annotations, setAnnotations] = useState<Ace.Annotation[]>([]);
  useEffect(() => {
    if (mode === 'yaml') {
      const error = getYamlCodeValidationErrors(value);
      if (error) {
        setAnnotations([
          {
            row: error.mark.line,
            column: error.mark.column,
            text: error.reason,
            type: 'error',
          },
        ]);
      } else {
        setAnnotations([]);
      }
    }
  }, [value, mode, setAnnotations]);

  return (
    <AceEditor
      /*
       * service worker causes exception: Uncaught DOMException: Failed to execute 'importScripts' on 'WorkerGlobalScope'
       * unless disabled. read more: https://github.com/securingsincity/react-ace/issues/725#issuecomment-546080155
       */
      setOptions={{ useWorker: false }}
      showPrintMargin={false}
      readOnly={disabled}
      width={width}
      mode={mode}
      theme={theme}
      value={value}
      fontSize={14}
      style={{
        borderRadius: '0px',
      }}
      annotations={annotations}
      onChange={onChange}
      highlightActiveLine={!hideActiveLineHighlighter}
      showGutter={!hideLineNumbers}
    />
  );
}
