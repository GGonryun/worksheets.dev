import Layout from './layout';
import { useRouter } from 'next/router';

export function WorksheetDetailsPage() {
  const { query } = useRouter();

  return <Layout>Hi Mom! Worksheet Details! {query.id}</Layout>;
}
