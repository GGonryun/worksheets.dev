import { Box } from '@mui/material';
import { useRouter } from 'next/router';

const Page = () => {
  const { query } = useRouter();
  return <Box>Team Page: {query.teamId}</Box>;
};

export default Page;
