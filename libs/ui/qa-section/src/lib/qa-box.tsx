import Box, { BoxProps } from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';
import { FC, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Markdown } from '@worksheets/ui-core';

export type QuestionAnswerBoxProps = {
  open?: boolean;
  question: string;
  answer: string;
  id: string;
  onOpen: () => void;
  markdownSx?: BoxProps['sx'];
};

export const QuestionAnswerBox: FC<QuestionAnswerBoxProps> = ({
  open,
  question,
  answer,
  id,
  onOpen,
  markdownSx,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(open ?? false);
  }, [open, id]);

  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      {/* Offset the anchor because of a fixed header */}
      <Box
        component="a"
        id={id}
        sx={{
          display: 'block',
          position: 'relative',
          top: { xs: -60, sm: -80 },
          visibility: 'hidden',
        }}
      />
      <ButtonBase
        onClick={onOpen}
        sx={{
          p: 2,
          display: 'flex',
          width: '100%',
          pr: 1,
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" gap={1} alignItems={'flex-start'}>
          <IconButton
            size="small"
            href={'#' + id}
            onClick={(e) => {
              // stops the event from opening the collapsed content
              if (show) {
                e.stopPropagation();
              }
            }}
          >
            <LinkIcon color="primary" />
          </IconButton>
          <Typography variant="h6" textAlign="left">
            {question}
          </Typography>
        </Box>
        <ChevronRightIcon />
      </ButtonBase>
      <Collapse in={show}>
        <Typography
          component="div"
          variant="body2"
          whiteSpace="pre-line"
          m={2}
          mt={0}
        >
          <Markdown text={answer} sx={markdownSx} />
        </Typography>
      </Collapse>
    </Box>
  );
};
