import { Ace } from 'ace-builds';
import AceEditor from 'react-ace';

import { useState } from 'react';
import * as yaml from 'js-yaml';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

type CodeEditorProps = {
  width?: string;
  value: string;
  onChange: (newValue: string) => void;
};

export default function CodeEditor({
  width,
  value,
  onChange,
}: CodeEditorProps) {
  const [annotations, setAnnotations] = useState<Ace.Annotation[]>();

  return (
    <AceEditor
      /*
       * service worker causes exception: Uncaught DOMException: Failed to execute 'importScripts' on 'WorkerGlobalScope'
       * unless disabled. read more: https://github.com/securingsincity/react-ace/issues/725#issuecomment-546080155
       */
      showPrintMargin={false}
      width={width}
      setOptions={{ useWorker: false }}
      mode="yaml"
      height="100%"
      theme="monokai"
      value={value}
      fontSize={14}
      annotations={annotations}
      onChange={(newValue) => {
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
      }}
    />
  );
}

function getYamlCodeValidationErrors(
  code: string
): yaml.YAMLException | undefined {
  let error: yaml.YAMLException | undefined;
  try {
    yaml.load(code);
  } catch (e) {
    error = e as yaml.YAMLException;
  }
  return error;
}
