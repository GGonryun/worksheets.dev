import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {
  ColoredFacebook,
  ColoredReddit,
  ColoredTwitter,
} from '@worksheets/ui/icons';
import { FC } from 'react';

const CHARITY_GAMES_TWITTER_HANDLE = 'charitydotgames';

export type GameInfo = { title: string; url: string };

export const SocialButtons: FC<GameInfo> = (props) => {
  const encodedProps = {
    title: encodeURIComponent(props.title),
    url: encodeURIComponent(props.url),
  };
  return (
    <Box>
      <IconButton
        href={getTwitterIntent(encodedProps)}
        target="_blank"
        size="large"
      >
        <ColoredTwitter fontSize="large" />
      </IconButton>
      <IconButton
        href={getFacebookIntent(encodedProps)}
        target="_blank"
        size="large"
      >
        <ColoredFacebook fontSize="large" />
      </IconButton>
      <IconButton href={getRedditIntent(encodedProps)}>
        <ColoredReddit fontSize="large" />
      </IconButton>
    </Box>
  );
};

const getTwitterIntent = ({ title, url }: GameInfo) =>
  `https://twitter.com/intent/tweet?url=${url}&text=${title}&hashtags=browsergames%20%23html5games&via=${CHARITY_GAMES_TWITTER_HANDLE}`;

const getFacebookIntent = ({ url }: GameInfo) =>
  `https://www.facebook.com/sharer.php?u=${url}`;

const getRedditIntent = ({ title, url }: GameInfo) =>
  `https://www.reddit.com/r/webgames/submit?url=${url}&title=${title}`;
