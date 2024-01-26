import { developers, games } from '@worksheets/data-access/charity-games';
import { DynamicLayout } from '@worksheets/ui/layout';
import { DeveloperScreen } from '@worksheets/ui/pages/developer';
import { BasicGameInfo, DeveloperSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { developerSeo } from '../../util/seo';

type Props = {
  developer: DeveloperSchema;
  games: BasicGameInfo[];
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

  const developerGames: BasicGameInfo[] = games
    .filter((g) => g.developerId === developerId)
    .map((g) => ({
      id: g.id,
      name: g.name,
      image: g.iconUrl,
    }));

  const seo = developerSeo(developer);

  return { props: { developer, games: developerGames, seo } };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
