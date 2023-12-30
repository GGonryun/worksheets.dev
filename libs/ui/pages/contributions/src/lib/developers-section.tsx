import Paper from '@mui/material/Paper';
import { TitleText } from './title-text';
import { CoverImage } from '@worksheets/ui/images';
import { DeveloperSchema } from '@worksheets/util/types';
import { developers } from '@worksheets/data-access/charity-games';
import Box from '@mui/material/Box';
import { FC, ReactNode, useState } from 'react';
import { ButtonBase } from '@mui/material';

export const DevelopersSection = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        gap: 4,
        p: { xs: 2, sm: 4 },
      }}
    >
      <TitleText variant="h2" textAlign="center">
        Contributors &amp; Developers
      </TitleText>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(3, 1fr)',
            mobile2: 'repeat(3, 1fr)',
            sm: 'repeat(4, 1fr)',
            md: 'repeat(5, 1fr)',
            lg: 'repeat(5, 1fr)',
            xl: 'repeat(6, 1fr)',
          },
          gridTemplateRows: 'auto',
          gap: 2,
        }}
      >
        {developers.map((dev) => (
          <DeveloperBox key={dev.id} developer={dev} />
        ))}
      </Box>
    </Paper>
  </Box>
);

const DeveloperBox: FC<{ developer: DeveloperSchema }> = ({ developer }) => {
  return (
    <CustomBox href={`/developers/${developer.id}`}>
      <CoverImage src={developer.avatarUrl} alt={developer.name} />
    </CustomBox>
  );
};

const CustomBox: FC<{ href: string; children: ReactNode }> = ({
  href,
  children,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <ButtonBase
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        aspectRatio: '1/1',
        position: 'relative',
        borderRadius: 4,
        overflow: 'hidden',
        transform: hover ? 'scale(1.1)' : 'scale(1)',
        boxShadow: (theme) => theme.shadows[hover ? 5 : 2],
        transition: (theme) =>
          theme.transitions.create(['box-shadow', 'transform'], {
            duration: theme.transitions.duration.short,
          }),
      }}
    >
      {children}
    </ButtonBase>
  );
};
