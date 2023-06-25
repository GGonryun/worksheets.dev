import { Ace } from 'ace-builds';
import AceEditor from 'react-ace';

import { ReactNode, useEffect, useState } from 'react';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/ext-language_tools';
import { getYamlCodeValidationErrors } from './yaml';
import { Box, Typography } from '@mui/material';

export type AceEditorProps = {
  width?: string;
  height?: string;
  value: string;
  mode: 'yaml' | 'json';
  theme: 'light' | 'dark';
  onChange?: (newValue: string) => void;
  disabled?: boolean;
  caption?: ReactNode | string;
  hideActiveLineHighlighter?: boolean;
  hideLineNumbers?: boolean;
};

export default function CodeEditor({
  width,
  height = '100%',
  value,
  mode,
  theme,
  onChange,
  caption,
  disabled,
  hideLineNumbers = false,
  hideActiveLineHighlighter = false,
}: AceEditorProps) {
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
    <>
      <Box px={1} display="flex" alignItems="center">
        {typeof caption === 'string' ? (
          <Typography p={0} m={0} variant="caption" color="text.secondary">
            {caption}
          </Typography>
        ) : (
          caption
        )}
      </Box>
      <AceEditor
        /*
         * service worker causes exception: Uncaught DOMException: Failed to execute 'importScripts' on 'WorkerGlobalScope'
         * unless disabled. read more: https://github.com/securingsincity/react-ace/issues/725#issuecomment-546080155
         */
        setOptions={{ useWorker: false }}
        showPrintMargin={false}
        readOnly={disabled}
        height={height}
        width={width}
        mode={mode === 'yaml' ? 'yaml' : 'json'}
        theme={theme === 'light' ? 'textmate' : 'terminal'}
        value={value}
        fontSize={14}
        style={{ borderRadius: '0px' }}
        annotations={annotations}
        onChange={onChange}
        highlightActiveLine={!hideActiveLineHighlighter}
        showGutter={!hideLineNumbers}
      />
    </>
  );
}
