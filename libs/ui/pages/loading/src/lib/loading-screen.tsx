import {
  LinearProgress,
  Paper,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { AbsolutelyCentered, useInterval } from '@worksheets/ui-core';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const emptyLoadingMessage =
  'Loading... Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const possibleLoadingMessages: string[] = [
  'Summoning dragons... and making sure they brush their teeth!',
  'Loading... Please wait patiently while our hamsters sprint on their wheels.',
  'Preparing epic battles... and making sure the villains have matching socks.',
  'Loading... Just a moment, our wizards are casting spells to banish bugs.',
  'Gathering magical ingredients... and making sure the potions taste like victory.',
  'Loading... Just a moment, our wizards are casting spells to banish bugs.',
  "Summoning loading screen magic... Don't worry, no wizards were harmed in the making of this website.",
  'Loading... because even pixels need a moment to stretch before the epic adventure begins.',
  'Gathering loot and loading screens, two things that take longer than expected.',
  "Loading... Grab a snack, make some tea, and practice your victory dance - we'll be ready soon!",
  'Unleashing the game magic... Meanwhile, in a parallel loading screen universe.',
  "Assembling digital realms... It's like building IKEA furniture, but with more dragons.",
  'Fueling the pixels... Because even game characters need their caffeine fix.',
  'Optimizing the gaming cosmos... Sit tight, our virtual architects are at work.',
  'One ring to rule them all, and one loading screen to test our patience. Frodo had it easy.',
  'In Middle-earth, even Sauron had to deal with software updates. Loading... the Eye of Bug-fixing.',
  "When Gandalf said, 'You shall not pass!' he clearly wasn't talking about our download speeds.",
  'Even in the Shire, hobbits know the struggle of waiting for the game to load. Second breakfast, anyone?',
  'Why did the gamer bring a ladder to the arcade? To reach the high scores!',
  "In a parallel universe, Mario doesn't save Princess Peach. He's stuck in traffic, waiting for the next green shell.",
  "If life gives you lemons, throw them at the screen during a rage-inducing level. Just don't blame us for the broken monitor.",
  "Why don't skeletons play video games? No guts, no glory - and they've got neither!",
  'If life gives you loading screens, make memes. Bonus points if you can load them quickly.',
  'I used to be a patient gamer, but then I took an arrow to the loading bar and had to find a new favorite game.',
  'Why did the skeleton avoid playing online? Because waiting for respawn felt like an eternity.',
  "I asked a wizard for a spell to speed up loading times. Now I can cast 'Quickium Leviosa' on my game console.",
  "If Pac-Man had loading screens, his chase with ghosts would be interrupted by 'Loading... Insert Coin.'",
];

const selectRandomLoadingMessage = () => {
  const random = Math.floor(Math.random() * possibleLoadingMessages.length);
  return possibleLoadingMessages[random];
};

const LOADING_INTERVAL = 6000;
export const LoadingScreen: React.FC<{ message?: string }> = ({ message }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const [loadingMessage, setLoadingMessage] = useState<string>(
    message ?? emptyLoadingMessage
  );

  // set a random message
  useEffect(() => {
    if (message) return;

    setLoadingMessage(selectRandomLoadingMessage());
    // only happens once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // then change it every now and then
  useInterval(() => {
    if (message) return;
    setLoadingMessage(selectRandomLoadingMessage());
  }, LOADING_INTERVAL);

  return (
    <AbsolutelyCentered blur>
      <Paper
        elevation={10}
        sx={{
          display: 'grid',
          placeItems: 'center',
          m: 2,
          p: 2,
          mb: { xs: 12, sm: 6 },
          textAlign: 'center',
          maxWidth: 400,
        }}
      >
        <Image
          priority
          src="/common/charity-games/logos/square.png"
          alt="Charity Games Logo"
          width={isMobile ? 64 : 128}
          height={isMobile ? 64 : 128}
        />
        <LinearProgress
          color="love"
          sx={{
            mb: 4,
            width: '100%',
            height: isMobile ? 6 : 12,
            borderRadius: 6,
          }}
        />
        <Typography variant={isMobile ? 'body3' : 'body2'}>
          {loadingMessage}
        </Typography>
      </Paper>
    </AbsolutelyCentered>
  );
};
