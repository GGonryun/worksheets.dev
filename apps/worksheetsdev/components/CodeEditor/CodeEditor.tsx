import React, { useState } from 'react';
import AceEditor from 'react-ace';
import * as yaml from 'js-yaml';
import { Ace } from 'ace-builds';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

type CodeEditorProps = {
  value: string;
  onChange: (newValue: string) => void;
};
export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  const [annotations, setAnnotations] = useState<Ace.Annotation[]>();

  return (
    <AceEditor
      mode="yaml"
      theme="monokai"
      value={value}
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
