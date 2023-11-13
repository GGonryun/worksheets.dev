import { Box, Container, Link, styled } from '@mui/material';
import { urls } from '@worksheets/ui-games';
import { NextPageWithLayout } from '@worksheets/util-next';
import { WebsiteLayout } from '../components/Layout';
import { SmallHeaderText } from '@worksheets/ui-charity';

const pages = [
  { title: 'Home', href: urls.relative.home },
  { title: 'Games', href: urls.relative.games },
  { title: 'Blog', href: urls.relative.blog },
  { title: 'About', href: urls.relative.about },
  { title: 'Donate', href: urls.relative.donate },
  { title: 'FAQ', href: urls.relative.faq },
  { title: 'Contact', href: urls.relative.contact },
  { title: 'Directory', href: urls.relative.directory },
  { title: 'Terms', href: urls.relative.terms },
  { title: 'Privacy', href: urls.relative.privacy },
  { title: 'Cookies', href: urls.relative.cookies },
];

const games = [
  { title: 'Word Pack', href: urls.games.wordPack() },
  { title: 'Puzzle Words', href: urls.games.puzzleWords() },
  { title: 'Word Search', href: urls.games.wordSearch() },
  { title: 'Emoji War', href: urls.games.emojiWar() },
  { title: 'Word Smith', href: urls.games.wordSmith() },
  { title: 'Nonograms', href: urls.games.nonograms() },
  { title: 'Word Search', href: urls.games.wordSearch() },
];

const DirectoryLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontFamily: theme.typography.secondary.fontFamily,
  textDecoration: 'underline',
}));

const DirectoryList = styled('ol')(({ theme }) => ({
  paddingLeft: '22px',
  margin: 0,
}));

const DirectoryListItem = styled('li')(({ theme }) => ({
  margin: 0,
  padding: 0,
}));

const Page: NextPageWithLayout = () => (
  <Container
    sx={{
      py: 3,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 3,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SmallHeaderText>Website Directory</SmallHeaderText>
      <DirectoryList
        style={{
          paddingLeft: '22px',
          margin: 0,
        }}
      >
        {pages.map(({ href, title }, i) => (
          <DirectoryListItem key={i}>
            <DirectoryLink href={href}>{title}</DirectoryLink>
          </DirectoryListItem>
        ))}
      </DirectoryList>
    </Box>
    <Box>
      <SmallHeaderText>Games Directory</SmallHeaderText>
      <DirectoryList>
        {games.map(({ href, title }, i) => (
          <DirectoryListItem key={i}>
            <DirectoryLink href={href}>{title}</DirectoryLink>
          </DirectoryListItem>
        ))}
      </DirectoryList>
    </Box>
  </Container>
);

Page.getLayout = (page) => {
  return <WebsiteLayout>{page}</WebsiteLayout>;
};

export default Page;
