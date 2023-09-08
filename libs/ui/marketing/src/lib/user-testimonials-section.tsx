import { Avatar, Paper, Typography } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { MarketingSection } from './marketing-section';
import { FC } from 'react';

export const UserTestimonialsSection = () => (
  <MarketingSection
    title="Trusted by absolutely no-one"
    description={`Nobody is using Worksheets to build apps yet, but we're hopeful that will change soon.\n\nHere's what we hope customer's will say about us.`}
  >
    <Flex fullWidth justifyContent={'center'} gap={3} wrap pt={3}>
      <UserTestimonial
        quote="I'm not sure what this is, but I like it."
        avatar="/art/avatars/5.svg"
        name="Jose Guerrero"
        title="Dabbler of the Dark Arts"
      />
      <UserTestimonial
        quote="Saves me a lot of time, and I'm all about saving time."
        avatar="/art/avatars/4.svg"
        name="Karen William"
        title="Backend Developer"
      />
      <UserTestimonial
        quote="If there can be no victory, then I will fight forever."
        avatar="/art/avatars/3.svg"
        name="Koth of the Hammer"
        title="Legendary Planeswalker"
      />
    </Flex>
  </MarketingSection>
);

const UserTestimonial: FC<{
  quote: string;
  avatar: string;
  name: string;
  title: string;
}> = ({ quote, avatar, name, title }) => {
  const size = 72;
  return (
    <Paper variant="outlined">
      <Flex column gap={1} maxWidth={360} height={200} p={3} spaceBetween>
        <Typography variant="h5" color="text.primary" fontFamily="serif">
          <i>"{quote}"</i>
        </Typography>
        <Flex gap={2} fullWidth>
          <Avatar alt={name} src={avatar} sx={{ width: size, height: size }} />
          <Flex column gap={0}>
            <Typography variant="body1" color="text.primary">
              {name}
            </Typography>
            <Typography variant="body2" color="text.disabled">
              {title}
            </Typography>
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  );
};
