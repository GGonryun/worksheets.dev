import { Ace } from 'ace-builds';
import AceEditor from 'react-ace';

import { ReactNode, useEffect, useState } from 'react';

import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-cloud9_day';
import 'ace-builds/src-noconflict/theme-dawn';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/ext-language_tools';

import { getYamlCodeValidationErrors } from '../yaml';
import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

export type AceEditorProps = {
  width?: string;
  height?: string;
  value: string;
  mode: 'yaml' | 'json' | 'typescript' | 'sh';
  theme:
    | 'textmate'
    | 'monokai'
    | 'terminal'
    | 'xcode'
    | 'github'
    | 'cloud9_day'
    | 'dawn';
  onChange?: (newValue: string) => void;
  onCopy?: () => void; // if present enables the copy button at the top right corner
  // captions should not be taller than 27 pixels otherwise you'll have to manage the height of the code editor yourself
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
  onCopy,
  caption,
  disabled,
  hideLineNumbers = false,
  hideActiveLineHighlighter = false,
}: AceEditorProps) {
  const captionHeight = '27px';
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

  const calculateCodeEditorHeight = () => {
    if (caption) {
      return `calc(100% - ${captionHeight})`;
    }
    return '100%';
  };
  return (
    <Box height="100%" width="100%" position="relative">
      {caption && (
        <Box height={captionHeight} px={1} py={0} overflow={'hidden'}>
          {typeof caption === 'string' ? (
            <Typography p={0} m={0} variant="caption" color="text.secondary">
              {caption}
            </Typography>
          ) : (
            caption
          )}
        </Box>
      )}
      {onCopy && (
        <Box position="absolute" zIndex={100} right={4} top={4}>
          <Tooltip
            placement="top"
            title="Copy contents of the editor into your clipboard"
          >
            <span>
              <Paper sx={{ borderRadius: '50%' }}>
                <IconButton size="small" onClick={onCopy}>
                  <ContentCopy fontSize="small" />
                </IconButton>
              </Paper>
            </span>
          </Tooltip>
        </Box>
      )}
      <Box height={calculateCodeEditorHeight()}>
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
      </Box>
    </Box>
  );
}
