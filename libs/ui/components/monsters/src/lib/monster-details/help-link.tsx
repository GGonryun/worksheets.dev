import { InfoOutlined } from '@mui/icons-material';
import { Link, Typography } from '@mui/material';
import { Column } from '@worksheets/ui/components/flex';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { Questions } from '@worksheets/ui/components/qa-section';
import { QuestionAnswer } from '@worksheets/util/types';
import React from 'react';

export const HelpLink: React.FC<{
  children: React.ReactNode;
  modalProps: {
    questions: QuestionAnswer[];
    title: string;
  };
}> = ({ children, modalProps }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Link
        color="inherit"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={0.5}
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <InfoOutlined fontSize="small" />
        {children}
      </Link>
      <HelpModal open={open} onClose={() => setOpen(false)} {...modalProps} />
    </>
  );
};

const HelpModal: React.FC<
  ModalWrapper<{ questions: QuestionAnswer[]; title: string }>
> = ({ title, questions, open, onClose }) => {
  return (
    <InfoModal
      open={open}
      onClose={onClose}
      gutter={3}
      background={(theme) => theme.palette.background.soft}
    >
      <Column gap={5} color={(theme) => theme.palette.text.blue.dark}>
        <Typography typography={{ xs: 'h5', sm: 'h4' }}>{title}</Typography>
        <Questions qa={questions} gap={3} />
      </Column>
    </InfoModal>
  );
};
