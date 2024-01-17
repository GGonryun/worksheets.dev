import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { GetServerSideProps } from 'next';

const Page = () => <ErrorScreen />;

export const getServerSideProps = (async () => {
  return {
    redirect: {
      destination: '/help/contributions',
      permanent: false,
    },
  };
}) satisfies GetServerSideProps;

export default Page;
