import { AccountCircle, Login } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import React from 'react';

import { LoadingButton } from '../components/shared/loading-button';
import { SquareButton } from '../components/shared/square-button';

const ConnectionButton: React.FC<{
  connected: boolean;
}> = ({ connected }) => {
  return (
    <SquareButton
      href={connected ? '/account' : '/login'}
      color={connected ? 'primary' : 'warning'}
    >
      {connected ? (
        <AccountCircle fontSize="small" />
      ) : (
        <Login fontSize="small" />
      )}
    </SquareButton>
  );
};

export const DynamicConnectionButton = dynamic(
  () => Promise.resolve(ConnectionButton),
  { ssr: false, loading: () => <LoadingButton /> }
);
