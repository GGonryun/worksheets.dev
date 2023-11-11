import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Page = () => {
  const { data: session } = useSession();

  const { query } = useRouter();
  return (
    <div>
      <h1>Subdomain Page</h1>
      <h2>{query.domain}</h2>
      <h3>User Id: {session?.user.id}</h3>
      <h3>User Name: {session?.user.username}</h3>
    </div>
  );
};

export default Page;
