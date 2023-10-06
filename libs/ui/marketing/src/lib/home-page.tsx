import { Flex } from '@worksheets/ui-core';
import { Container, Divider } from '@mui/material';
import { UserTestimonialsSection } from './user-testimonials-section';
import { IntegrationsSection } from './integrations-section';
import { DeveloperToolsSection } from './developer-tools-section';
import { UseCasesSection } from './use-cases-section';
import { GetStartedSection } from './get-started-section';
import { BlogArticlesSection } from './blog-articles-section';
import { HeroSection } from './hero-section';

/* eslint-disable-next-line */
export interface HomePageProps {}

export function HomePage(props: HomePageProps) {
  return (
    <Container maxWidth="xl">
      <Flex column fullWidth alignItems="center" pt={3} pb={3} gap={5}>
        <HeroSection />
        <Divider sx={{ width: 120 }} />
        <IntegrationsSection />
        <DeveloperToolsSection />
        <UseCasesSection />
        <BlogArticlesSection />
        <UserTestimonialsSection />
        <GetStartedSection />
      </Flex>
    </Container>
  );
}
