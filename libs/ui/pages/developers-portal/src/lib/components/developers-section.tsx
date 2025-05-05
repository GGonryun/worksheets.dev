import { ButtonBase, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { routes } from '@worksheets/routes';
import { CoverImage } from '@worksheets/ui/components/images';
import { TeamSchema } from '@worksheets/util/types';
import { FC, ReactNode, useState } from 'react';

export const DevelopersSection: React.FC<{ teams: TeamSchema[] }> = ({
  teams,
}) => (
  <Box display="flex" flexDirection="column" gap={2}>
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        gap: 4,
        p: { xs: 2, sm: 4 },
        color: (theme) => theme.palette.text.arcade,
        backgroundColor: (theme) => theme.palette.background['solid-blue'],
        background: (theme) => theme.palette.background['gradient-blue'],
      }}
    >
      <Typography
        component="h2"
        sx={{
          textAlign: 'center',
          typography: { xs: 'h4', sm: 'h3' },
        }}
      >
        Contributors &amp; Developers
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(3, 1fr)',
            mobile2: 'repeat(4, 1fr)',
            sm: 'repeat(5, 1fr)',
            md: 'repeat(6, 1fr)',
            lg: 'repeat(7, 1fr)',
            xl: 'repeat(8, 1fr)',
          },
          gridTemplateRows: 'auto',
          gap: 2,
        }}
      >
        {teams.map((team) => (
          <DeveloperBox key={team.id} team={team} />
        ))}
      </Box>
    </Paper>
  </Box>
);

const DeveloperBox: FC<{ team: TeamSchema }> = ({ team }) => {
  return (
    <CustomBox
      href={routes.team.path({
        params: { teamId: team.id },
      })}
    >
      <CoverImage src={team.logo} alt={team.name} />
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
        transform: hover ? 'scale(1.05)' : 'scale(1)',
        backgroundColor: (theme) => theme.palette.background.paper,
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
