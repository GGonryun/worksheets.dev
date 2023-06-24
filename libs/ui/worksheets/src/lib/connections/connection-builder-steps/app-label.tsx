import { Box } from '@mui/material';
import { GetApplicationResponse } from '../../shared/types';
import Image from 'next/image';

export const AppLabel: React.FC<{ app: GetApplicationResponse }> = ({
  app,
}) => (
  <Box display="flex" alignItems="center" gap={1}>
    {app?.name && app?.logo && (
      <Box
        border={({ palette }) => `1px solid ${palette.divider}`}
        display="flex"
        alignItems="center"
        justifyContent={'center'}
        padding={0.25}
      >
        <Image
          height={20}
          width={20}
          src={app.logo}
          alt={`${app?.name} logo`}
        />
      </Box>
    )}
    <Box>{app?.name}</Box>
  </Box>
);
