import { DeveloperScreen } from '@worksheets/ui/pages/developer';
import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { developers, games } from '@worksheets/data-access/charity-games';

const Page: NextPageWithLayout = () => {
  const { query } = useRouter();
  const developerId = query.developerId as string;
  const developer = developers.find(
    (developer) => developer.id === developerId
  );

  if (!developer) return <CircularProgress />;

  const developerGames = games.filter((g) => g.developerId === developerId);

  return (
    <DeveloperScreen
      name={developer.name}
      socials={developer.socials}
      games={developerGames.map((g) => ({
        id: g.id,
        name: g.name,
        developer: developer.name,
        imageUrl: g.iconUrl,
        qualifier: g.qualifier,
      }))}
    />
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
