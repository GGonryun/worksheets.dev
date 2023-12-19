import { DeveloperScreen } from '@worksheets/ui/pages/developer';
import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { developers, games } from '@worksheets/data-access/charity-games';
import { NextSeo, NextSeoProps } from 'next-seo';
import { DeveloperSchema, GameQualifier } from '@worksheets/util/types';
import { GetServerSideProps } from 'next';
import { developerSeo } from '../../util/seo';

type Props = {
  developer: DeveloperSchema;
  games: {
    id: string;
    name: string;
    developer: string;
    imageUrl: string;
    qualifier: GameQualifier;
  }[];
  seo: NextSeoProps;
};

const Page: NextPageWithLayout<Props> = ({ developer, games, seo }) => {
  return (
    <>
      <NextSeo {...seo} />
      <DeveloperScreen {...developer} games={games} />
    </>
  );
};

export const getServerSideProps = (async ({ params }) => {
  const developerId = params?.developerId as string;

  const developer = developers.find(
    (developer) => developer.id === developerId
  );

  if (!developer) throw new Error('Developer does not exist');

  const developerGames = games
    .filter((g) => g.developerId === developerId)
    .map((g) => ({
      id: g.id,
      name: g.name,
      developer: developer.name,
      imageUrl: g.iconUrl,
      qualifier: g.qualifier,
    }));

  const seo = developerSeo(developer);

  return { props: { developer, games: developerGames, seo } };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
