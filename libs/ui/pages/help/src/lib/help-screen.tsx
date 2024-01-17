import { NavigateNext } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  LinkProps,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import { UnderConstruction } from '@worksheets/ui/pages/under-construction';
import { QuestionAnswerSection } from '@worksheets/ui/qa-section';
import { useBookmark } from '@worksheets/ui-core';
import { QuestionAnswer } from '@worksheets/util/types';
import { FC, JSXElementConstructor } from 'react';

export type HelpScreenProps = {
  title: string;
  description: string;
  qa: QuestionAnswer[];
};

export const HelpScreen: FC<HelpScreenProps> = ({ title, description, qa }) => {
  const bookmark = useBookmark();

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
        }}
      >
        <HelpCenterBreadcrumbs crumb={{ title }} />
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '2rem', sm: '3rem' },
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" my={1}>
          {description}
        </Typography>
        {qa.length ? (
          <QuestionAnswerSection qa={qa} bookmark={bookmark} />
        ) : (
          <Box mt={8}>
            <UnderConstruction />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

const HelpCenterBreadcrumbs: FC<{ crumb: { title: string } }> = ({ crumb }) => {
  return (
    <StyledBreadcrumbs
      separator={<BreadcrumbSeparator />}
      aria-label="category-breadcrumbs"
    >
      <BreadcrumbLink key="1" href="/help">
        Help Center
      </BreadcrumbLink>
      <BreadcrumbLink key="1" underline="none">
        {crumb.title}
      </BreadcrumbLink>
    </StyledBreadcrumbs>
  );
};

const BreadcrumbSeparator = styled(NavigateNext)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(16),
}));

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiBreadcrumbs-separator': {
    margin: 0,
    marginBottom: -1,
    padding: 0,
  },
  '& .MuiBreadcrumbs-li': {
    lineHeight: 1,
  },
}));

const BreadcrumbLink = styled<JSXElementConstructor<LinkProps>>((props) => (
  <Link color="inherit" underline="hover" {...props} />
))(({ theme, underline }) => ({
  fontFamily: theme.typography.body1.fontFamily,
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 700,
  textTransform: 'none',
  cursor: underline ? 'default' : 'pointer',
  color: theme.palette.text.primary,
  '&:hover, &:focus': {
    color: theme.palette.text.secondary,
  },
}));
