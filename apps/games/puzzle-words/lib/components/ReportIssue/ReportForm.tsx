import { Typography, NativeSelect, Button } from '@mui/material';
import { Flex, TextArea } from '@worksheets/ui-core';
import { FC, useState } from 'react';
import { thinBorder } from '../../layouts';
import { ContactLink } from '../Links';

type ReportCategory = 'bug' | 'suggestion' | 'other';

export const categoryLabels: Record<ReportCategory, string> = {
  bug: 'Bug',
  suggestion: 'Suggestion',
  other: 'Other',
};

export const categoryIcons: Record<ReportCategory, string> = {
  bug: '🐛',
  suggestion: '💡',
  other: '🤔',
};

export const ReportForm: FC<{
  text: string;
  category: ReportCategory;
  onClose: () => void;
}> = ({ category: defaultCategory, text: defaultText, onClose }) => {
  const [text, setText] = useState(defaultText ?? '');
  const [category, setCategory] = useState<ReportCategory>(
    defaultCategory ?? 'other'
  );
  return (
    <Flex column gap={2}>
      <Flex column gap={1}>
        <Typography>Select Report Category</Typography>
        <NativeSelect
          fullWidth
          value={category}
          onChange={(e) => {
            setCategory(e.target.value as ReportCategory);
          }}
          sx={(theme) => ({
            '.MuiNativeSelect-select': {
              paddingLeft: 1,
              border: thinBorder(theme),
            },
          })}
        >
          {Object.entries(categoryLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {categoryIcons[key as ReportCategory]} {label}
            </option>
          ))}
        </NativeSelect>
      </Flex>
      <Flex column gap={1}>
        <Typography>Report Description</Typography>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          minRows={2}
          sx={{
            fontFamily: (theme) => theme.typography.fontFamily,
            resize: 'vertical',
          }}
          placeholder="Enter a description of the issue you found."
        />
      </Flex>
      <Flex column gap={1}>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={() => {
            //clear form
            setText('');
            setCategory('bug');
            alert("Thanks for your feedback! We'll look into it.");
            onClose();
          }}
        >
          Submit Report
        </Button>
        <Typography variant="caption">
          All reports are anonymous, if you would like to leave your contact
          information please use the <ContactLink>contact form</ContactLink>.
        </Typography>
      </Flex>
    </Flex>
  );
};
