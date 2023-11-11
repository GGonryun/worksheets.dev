import { NextPageWithLayout } from '@worksheets/util-next';
import { WebsiteLayout } from '../../components/Layout';
import { Box, Container } from '@mui/material';
import { ParagraphText, SubHeaderText } from '../../components/Typography';
import {
  MarkdownMetadata,
  getAllPostsMetadata,
} from '@worksheets/util-markdown';
import { POSTS_PATH } from '../../util/paths';
import { PostPreview } from '../../components/blog';

type Props = {
  metadatas: MarkdownMetadata[];
};

const Page: NextPageWithLayout<Props> = ({ metadatas }) => (
  <Container
    sx={{
      py: 3,
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}
  >
    <SubHeaderText>Our Blog</SubHeaderText>
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.grey[500]}`,
        margin: '-1px',
        px: 1,
        py: 0.5,
        backgroundColor: (theme) => theme.palette.grey[200],
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <ParagraphText
        sx={{
          textDecoration: 'underline',
          textDecorationThickness: '3px',
          textUnderlineOffset: '8px',
          textDecorationColor: (theme) => theme.palette.primary.main,
        }}
      >
        All Posts
      </ParagraphText>
    </Box>
    {metadatas.map((metadata, i) => (
      <PostPreview key={i} {...metadata} />
    ))}
  </Container>
);

Page.getLayout = (page) => {
  return <WebsiteLayout>{page}</WebsiteLayout>;
};

export const getStaticProps = async (): Promise<{ props: Props }> => {
  const metadatas = getAllPostsMetadata(POSTS_PATH);
  return { props: { metadatas } };
};

export default Page;
