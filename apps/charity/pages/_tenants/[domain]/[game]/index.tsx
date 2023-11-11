import { useRouter } from 'next/router';

const Page = () => {
  const { query } = useRouter();
  return (
    <div>
      <h1>Game Page</h1>
      <h2>
        {query.domain} - {query.game}
      </h2>
    </div>
  );
};

export default Page;
