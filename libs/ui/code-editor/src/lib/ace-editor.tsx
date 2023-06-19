import { Ace } from 'ace-builds';
import AceEditor from 'react-ace';

import { useState } from 'react';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-sqlserver';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/ext-language_tools';
import { getYamlCodeValidationErrors } from './yaml';

export type AceEditorProps = {
  width?: string;
  value: string;
  mode: 'yaml' | 'json';
  theme: 'light' | 'dark';
  onChange: (newValue: string) => void;
};

export default function CodeEditor({
  width,
  value,
  mode,
  theme,
  onChange,
}: AceEditorProps) {
  const [annotations, setAnnotations] = useState<Ace.Annotation[]>();

  // if we're using a yaml based editor we'll throw in-line validation annotations.
  const additionalProps: Partial<Pick<AceEditor, 'onChange'>> =
    mode === 'yaml'
      ? {
          onChange: (newValue) => {
            const error = getYamlCodeValidationErrors(newValue);
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
            onChange(newValue);
          },
        }
      : {};

  return (
    <AceEditor
      /*
       * service worker causes exception: Uncaught DOMException: Failed to execute 'importScripts' on 'WorkerGlobalScope'
       * unless disabled. read more: https://github.com/securingsincity/react-ace/issues/725#issuecomment-546080155
       */
      showPrintMargin={false}
      setOptions={{ useWorker: false }}
      height="100%"
      width={width}
      mode={mode === 'yaml' ? 'yaml' : 'json'}
      theme={theme === 'light' ? 'sqlserver' : 'terminal'}
      value={value}
      fontSize={14}
      style={{ borderRadius: '0px' }}
      annotations={annotations}
      {...additionalProps}
    />
  );
}
