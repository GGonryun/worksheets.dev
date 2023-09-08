import { TinyLogo } from '@worksheets/ui-basic-style';
import { FC, SyntheticEvent } from 'react';
import { HeaderSection } from './header-section';
import { SectionLayout } from './section-layout';
import { Flex, MicroMarkdown, MicroMarkdownText } from '@worksheets/ui-core';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { BackgroundColors, Emoji, urls } from '@worksheets/ui/common';

export const FrequentlyAskedQuestionsMarketingSection: FC<{
  backgroundColor?: BackgroundColors;
  title: string;
  subtitle: string;
  icon: string;
  questions: QuestionAnswerPair[];
}> = ({ backgroundColor, title, subtitle, icon, questions }) => {
  return (
    <SectionLayout
      backgroundColor={backgroundColor}
      py={8}
      px={6}
      maxWidth="md"
    >
      <Flex centered column gap={3}>
        <HeaderSection
          title={title}
          subtitle={subtitle}
          icon={<TinyLogo src={icon} borderless area={28} />}
        />
        <QuestionAnswerAccordion pairs={questions} />

        <Typography variant="caption" color="text.secondary">
          <Link href={urls.app.contact}>
            I have a question <Emoji code="thinking" />
          </Link>
        </Typography>
      </Flex>
    </SectionLayout>
  );
};
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:first-child': {
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
  },
  '&:last-child': {
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  },
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-root:hover:not(:disabled)': {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    textDecoration: 'underline',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export type QuestionAnswerPair = {
  question: string;
  answer: MicroMarkdownText;
};

const QuestionAnswerAccordion: FC<{ pairs: QuestionAnswerPair[] }> = ({
  pairs,
}) => {
  const [expanded, setExpanded] = React.useState<number>(-1);

  const handleChange =
    (panel: number) => (_: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : -1);
    };

  return (
    <div>
      {pairs.map((pair, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={handleChange(index)}
        >
          <AccordionSummary>
            <Typography variant="body2">{pair.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="caption">
              <MicroMarkdown text={pair.answer} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
