import { useRouter } from 'next/router';

const Page = () => {
  const { query } = useRouter();
  return (
    <div>
      <h1>Special Official Page</h1>
      <h2>{query.domain}</h2>
    </div>
  );
};

export default Page;
