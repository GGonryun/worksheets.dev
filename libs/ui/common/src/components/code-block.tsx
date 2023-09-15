import { useTheme } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export const CodeBlock: React.FC<{
  children: string;
  language: 'bash' | 'json';
}> = ({ children, language }) => {
  const theme = useTheme();

  return (
    <SyntaxHighlighter
      language={language}
      style={a11yLight}
      customStyle={{
        fontSize: 14,
        padding: 12,
        backgroundColor: theme.palette.grey[100],
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
      }}
      wrapLongLines
    >
      {children}
    </SyntaxHighlighter>
  );
};
