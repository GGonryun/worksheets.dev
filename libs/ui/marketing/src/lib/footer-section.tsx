import { Divider, Link, Typography, useTheme } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { SharedWebsiteFooter, urls } from '@worksheets/ui/common';
import { motion } from 'framer-motion';
import { FC } from 'react';

const footerUrls = [
  {
    title: 'Docs',
    links: [
      { title: 'Applications', url: urls.app.applications },
      { title: 'Quick Start', url: urls.docs.home },
      { title: 'FAQ', url: urls.docs.home },
      { title: 'Roadmap', url: urls.docs.home },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About', url: urls.app.about },
      { title: 'Blog', url: urls.docs.blog },
      { title: 'Contact', url: urls.app.contact },
      { title: 'Mission Statement', url: urls.app.missionStatement },
    ],
  },
  {
    title: 'Legal',
    links: [
      { title: 'Privacy', url: urls.app.privacy },
      { title: 'Terms', url: urls.app.terms },
    ],
  },
  {
    title: 'Social',
    links: [
      { title: 'Twitter', url: urls.app.social.twitter },
      { title: 'GitHub', url: urls.app.social.github },
      { title: 'Discord', url: urls.app.social.discord },
      { title: 'Facebook', url: urls.app.social.facebook },
    ],
  },
  {
    title: 'Newsletter',
    links: [
      { title: 'Subscribe', url: urls.app.subscribe },
      { title: 'Unsubscribe', url: urls.app.unsubscribe },
    ],
  },
];

export const FooterSection: FC<{
  hideLinks?: boolean;
  onEnter?: (e: IntersectionObserverEntry) => void;
  onExit?: (e: IntersectionObserverEntry) => void;
}> = ({ hideLinks, onEnter, onExit }) => {
  const theme = useTheme();
  return (
    <motion.div
      onViewportEnter={(e) => e && onEnter && onEnter(e)}
      onViewportLeave={(e) => e && onExit && onExit(e)}
    >
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
    </motion.div>
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
          {section.links.map((link, i) => (
            <Typography variant="body2" key={i}>
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
