import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LinkIcon from '@mui/icons-material/Link';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { BookmarkAnchor } from '@worksheets/ui-core';
import { FC, ReactNode, useEffect, useState } from 'react';

export type QuestionAnswerBoxProps = {
  open?: boolean;
  question: string;
  answer: ReactNode;
  id: string;
  onOpen: () => void;
};

export const QuestionAnswerBox: FC<QuestionAnswerBoxProps> = ({
  open,
  question,
  answer,
  id,
  onOpen,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(open ?? false);
  }, [open, id]);

  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.text.arcade}`,
        borderRadius: 4,
        overflow: 'hidden',
        color: 'text.arcade',
      }}
    >
      {/* Offset the anchor because of a fixed header */}
      <BookmarkAnchor id={id} />
      <ButtonBase
        onClick={onOpen}
        sx={{
          p: 2,
          display: 'flex',
          width: '100%',
          pr: 1,
          pb: 1.5,
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box display="flex" gap={1} alignItems={'flex-start'}>
          <IconButton
            size="small"
            href={'#' + id}
            color="inherit"
            onClick={(e) => {
              // stops the event from opening the collapsed content
              if (show) {
                e.stopPropagation();
              }
            }}
          >
            <LinkIcon />
          </IconButton>
          <Typography variant="h5" textAlign="left">
            {question}
          </Typography>
        </Box>
        {show ? <ExpandLessIcon /> : <ChevronRightIcon />}
      </ButtonBase>
      <Collapse in={show}>
        <Typography
          color="text.arcade"
          component="div"
          variant="body2"
          m={2}
          mt={1}
          sx={{
            '& a': {
              color: 'text.arcade',
              textDecorationColor: 'inherit',
            },
          }}
        >
          {answer}
        </Typography>
      </Collapse>
    </Box>
  );
};
