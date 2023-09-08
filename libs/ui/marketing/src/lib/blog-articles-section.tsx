import { ArrowRight } from '@mui/icons-material';
import { Typography, Link, TextField, Paper } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import Image from 'next/image';
import { FC } from 'react';
import { MarketingSection } from './marketing-section';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { StandardProductButton } from './product-buttons';

export const BlogArticlesSection = () => (
  <MarketingSection
    title="News & Updates"
    description=""
    footer={
      <Flex centered p={3} gap={5}>
        <Flex column maxWidth={400}>
          <Typography variant="h6" fontWeight={900}>
            Get weekly productivity tips
          </Typography>
          <Typography variant="body2" color={'text.secondary'}>
            We'll send you a weekly email with productivity tips and tricks to
            help you get the most out of Worksheets.
          </Typography>
          <Flex pt={3} gap={1}>
            <Paper elevation={0}>
              <TextField size="small" placeholder="email address" />
            </Paper>
            <StandardProductButton
              sx={{ px: 5 }}
              onClick={() => alert('TODO: redirect to email subscription form')}
            >
              Subscribe
            </StandardProductButton>
          </Flex>
        </Flex>
        <TinyLogo src="/art/incoming-mail.svg" area={164} borderless />
      </Flex>
    }
  >
    <Flex fullWidth justifyContent="space-around" wrap gap={3}>
      <BlogArticlesCard
        title="Low-code vs No-code: What are the differences?"
        description={
          "Developer's don't have many options when it comes to IPaaS. Find out what your options are and how they differ. We'll also discuss the pros and cons of each and how Worksheets can help fill in the gaps."
        }
        href={'/blog/low-code-vs-no-code'}
      />
      <BlogArticlesCard
        title="You won't believe how many apps we can fit in this API."
        description={
          "No, seriously, you won't believe it. We've got a lot of apps. Like, a lot. Our competitors actually have more than us. We're not sure why you'd need that many apps, but we've got them."
        }
        href={'/blog/who-has-the-most-connectors'}
      />
      <BlogArticlesCard
        title="Build a Slack bot in less than 5 minutes or your money back, guaranteed."
        description={
          "Join us while we discuss how to build a Slack bot as fast as possible using Worksheets. We'll also discuss the benefits of using Worksheets over other platforms. This tutorial is free and open to the public."
        }
        href={''}
      />
    </Flex>
  </MarketingSection>
);

const BlogArticlesCard: FC<{
  title: string;
  description: string;
  href: string;
}> = ({ title, description, href = '/blog' }) => (
  <Flex column gap={2} maxWidth={320}>
    <Image
      src="/placeholders/16x9.png"
      alt="placeholder"
      width={320}
      height={180}
    />
    <Typography variant="body1" fontWeight={900}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" minHeight={120}>
      {description}
    </Typography>
    <Link href={href}>
      <Typography
        variant="body2"
        color="primary"
        display="flex"
        alignItems="center"
      >
        Read more <ArrowRight />
      </Typography>
    </Link>
  </Flex>
);
