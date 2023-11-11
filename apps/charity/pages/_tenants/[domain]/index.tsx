import { useRouter } from 'next/router';

const Page = () => {
  const { query } = useRouter();
  return (
    <div>
      <h1>Subdomain Page</h1>
      <h2>{query.domain}</h2>
    </div>
  );
};

export default Page;
