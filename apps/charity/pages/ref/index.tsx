import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { GetServerSideProps } from 'next';

const Page = () => <ErrorScreen />;

export const getServerSideProps = (async () => {
  return {
    redirect: {
      destination: '/',
      permanent: true,
    },
  };
}) satisfies GetServerSideProps;

export default Page;
