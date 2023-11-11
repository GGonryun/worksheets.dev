import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';

const Page = () => {
  const { data: session } = useSession();
  return <Box>Dashboard: {session?.user.username}</Box>;
};

export default Page;
