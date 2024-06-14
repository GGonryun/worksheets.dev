import { openInNewTab } from './window';

export const createTwitterPostIntent = ({
  text,
  url,
}: {
  text: string;
  url: string;
}) => {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}`;
};

export const twitterPostIntent =
  (
    game: {
      id: string;
      name: string;
      url: string;
    },
    highScore: number
  ) =>
  () =>
    openInNewTab(
      createTwitterPostIntent({
        text: `I am playing this game '${game.name}' and my best score is ${highScore}. Can you beat me?`,
        url: game.url,
      })
    );
