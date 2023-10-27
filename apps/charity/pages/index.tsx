import {
  Box,
  BoxProps,
  Container,
  Link,
  LinkProps,
  styled,
} from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import {
  glowBoxShadow,
  dokaBoxShadow,
  tabletBoxShadow,
  textShadow,
  urls,
} from '@worksheets/ui-games';
import { HoverProps, useOnHover } from '../hooks/useOnHover';
import { WebsiteLayout } from '../components/Layout';
import { NextPageWithLayout } from '@worksheets/util-next';
import { assets } from '../util/assets';

type GameEntry = {
  src: string;
  title: string;
  url: string;
};

const games: GameEntry[] = [
  {
    src: assets.icons.puzzleWords,
    title: 'Puzzle Words',
    url: urls.games.puzzleWords(),
  },
  {
    src: assets.icons.wordSearch,
    title: 'Word Search',
    url: urls.games.wordSearch(),
  },
  {
    src: assets.icons.emojiWar,
    title: 'Emoji War',
    url: urls.games.emojiWar(),
  },
  {
    src: assets.icons.wordPack,
    title: 'Word Pack',
    url: urls.games.wordPack(),
  },
  {
    src: assets.icons.placeholder,
    title: 'Word Smith',
    url: urls.games.wordSmith(),
  },
  {
    src: assets.icons.placeholder,
    title: 'Nonograms',
    url: urls.games.nonograms(),
  },
  {
    src: assets.icons.placeholder,
    title: 'Solitaire',
    url: urls.games.solitaire(),
  },
];

type GameIconProps = {
  src: string;
  title: string;
  href: string;
};

const GameIcon: FC<GameIconProps> = ({ src, title, href }) => {
  const { onMouseEnter, onMouseLeave, hover } = useOnHover();
  return (
    <GameIconContainer gap={1}>
      <GameIconImage
        hover={hover}
        src={src}
        title={title}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        href={href}
      />
      <GameIconText href={href}>{title}</GameIconText>
    </GameIconContainer>
  );
};

type GameIconImageProps = {
  src: string;
  title: string;
  href: string;
} & HoverProps;

const GameIconImage: FC<GameIconImageProps> = ({
  hover,
  src,
  title,
  onMouseEnter,
  onMouseLeave,
  href,
}) => (
  <Link href={href} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <Box
      sx={{
        display: 'flex',
        cursor: 'pointer',
        borderRadius: '10px',
        boxShadow: hover
          ? `${glowBoxShadow}, ${dokaBoxShadow}, ${tabletBoxShadow}`
          : tabletBoxShadow,
        overflow: 'hidden',
      }}
    >
      <Image
        style={{ pointerEvents: 'none' }}
        priority
        src={src}
        alt={title}
        width={100}
        height={100}
      />
    </Box>
  </Link>
);

const GameIconText = styled((props) => <Link {...props} />)<LinkProps>(
  ({ theme }) => ({
    color: theme.palette.text.primary,
    textShadow: textShadow(0.5, 0.5),
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: theme.typography.secondary.fontFamily,
    textDecoration: 'none',
  })
);

const GameIconContainer = styled((props) => <Box {...props} />)<BoxProps>({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  flex: '1 0 auto',
});

const GameIconsContainer = styled((props) => <Box {...props} />)<BoxProps>(
  ({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    gap: theme.spacing(8),
    '@media (max-width: 600px)': {
      gap: theme.spacing(4),
    },
  })
);

const Page: NextPageWithLayout = () => {
  return (
    <Container sx={{ py: 3 }}>
      <GameIconsContainer>
        {games.map((game) => (
          <GameIcon
            key={game.title}
            title={game.title}
            src={game.src}
            href={game.url}
          />
        ))}
      </GameIconsContainer>
    </Container>
  );
};

Page.getLayout = (page) => {
  return <WebsiteLayout>{page}</WebsiteLayout>;
};

export default Page;
