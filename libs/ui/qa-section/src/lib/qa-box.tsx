import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LinkIcon from '@mui/icons-material/Link';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
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
          pb: 1.5,
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
          <Typography variant="h5" textAlign="left">
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
          mt={1}
        >
          {answer}
        </Typography>
      </Collapse>
    </Box>
  );
};
