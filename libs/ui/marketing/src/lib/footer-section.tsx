import { Divider, Link, Typography, useTheme } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { SharedWebsiteFooter } from '@worksheets/ui/common';
import { FC } from 'react';

const footerUrls = [
  {
    title: 'Docs',
    links: [
      { title: 'Applications', url: '/applications' },
      { title: 'Quick Start', url: '/docs/quick-start' },
      { title: 'FAQ', url: '/docs/faq' },
      { title: 'Roadmap', url: '/docs/roadmap' },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About', url: '/about' },
      { title: 'Blog', url: '/blog' },
      { title: 'Contact', url: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { title: 'Privacy', url: '/privacy' },
      { title: 'Terms', url: '/terms' },
    ],
  },
  {
    title: 'Social',
    links: [
      { title: 'Twitter', url: 'https://worksheets.dev/twitter' },
      { title: 'GitHub', url: 'https://worksheets.dev/github' },
      { title: 'Discord', url: 'https://worksheets.dev/discord' },
      { title: 'Facebook', url: 'https://worksheets.dev/facebook' },
    ],
  },
  {
    title: 'Newsletter',
    links: [
      { title: 'Subscribe', url: '/subscribe' },
      { title: 'Unsubscribe', url: '/unsubscribe' },
    ],
  },
];

export const FooterSection: FC<{
  hideLinks?: boolean;
}> = ({ hideLinks }) => {
  const theme = useTheme();
  return (
    <Flex
      column
      gap={4}
      fullWidth
      sx={{ backgroundColor: theme.palette.background.paper, p: 3, py: 4 }}
    >
      {!hideLinks && (
        <>
          <FooterSectionLinks />
          <Divider />
        </>
      )}

      <SharedWebsiteFooter />
    </Flex>
  );
};

const FooterSectionLinks = () => {
  return (
    <Flex gap={3} justifyContent="space-evenly" alignItems="start">
      {footerUrls.map((section) => (
        <Flex column gap={1} key={section.title}>
          <Typography variant="body1" fontWeight={900}>
            {section.title}
          </Typography>
          {section.links.map((link) => (
            <Typography variant="body2" key={link.url}>
              <Link color="inherit" underline="hover" href={link.url}>
                {link.title}
              </Link>
            </Typography>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};
