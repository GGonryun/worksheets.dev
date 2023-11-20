import { Box } from '@mui/material';
import { useRouter } from 'next/router';

const Page = () => {
  const { query } = useRouter();
  // TODO: fetch team data
  // TODO: add an imag if no game exists.
  // TODO: make nav bar
  return <Box>Team Page: {query.teamId}</Box>;
};

export default Page;
