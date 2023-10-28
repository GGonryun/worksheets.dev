import { Redirect } from '@worksheets/ui-core';
import { VerifierPage } from '../components/VerifierPage';

export default function Page() {
  // check if the envrionment is production
  // if it is, then redirect to the home page
  if (process.env.NODE_ENV === 'production') {
    return <Redirect to="/" />;
  }

  // otherwise, show the verifier page
  return <VerifierPage />;
}
