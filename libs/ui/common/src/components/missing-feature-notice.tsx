import { Box, Typography, Link } from '@mui/material';
import { TinyLogo } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';

type MissingFeatureProps = {
  avatarId: number;
  feature: string;
  link: {
    text: string;
    href: string;
  };
};

export const MissingFeatureNotice: React.FC<MissingFeatureProps> = ({
  avatarId,
  feature,
  link,
}) => (
  <Flex gap={3}>
    <TinyLogo
      borderless
      area={160}
      src={`/art/avatar-thinking/${avatarId}.svg`}
      label="Avatar Thinking"
    />

    <Box>
      <Typography variant="h5" fontWeight={900}>
        There's nothing here
      </Typography>
      <Typography variant="body1" color="text.secondary" component="span">
        We're working on{' '}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        component="span"
        sx={{ textDecoration: 'underline' }}
      >
        {feature}
      </Typography>
      <Typography variant="body1" color="text.secondary" component="span">
        . Check back soon!
      </Typography>
      <Box pt={4}>
        <Link underline="hover" href={link.href}>
          {link.text}
        </Link>
      </Box>
    </Box>
  </Flex>
);
