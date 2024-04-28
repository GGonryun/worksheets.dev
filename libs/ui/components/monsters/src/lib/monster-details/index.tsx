import { Box } from '@mui/material';
import { MonsterSchema } from '@worksheets/util/types';

import { MonsterProfile } from '../monster-profile';
import { Elements } from './elements';
import { Loot } from './loot';
import { Statistics } from './stats';
import { BORDER_KEY, BORDER_KEY_2 } from './styles';
import { TitleBar } from './title';

export const MonsterDetails: React.FC<{
  monster: MonsterSchema;
  titleHref?: string;
  profile?: React.ReactNode;
}> = (props) => (
  <Box
    sx={{
      width: '100%',
      border: BORDER_KEY_2,
      borderRadius: (theme) => theme.shape.borderRadius,
      overflow: 'hidden',
      backgroundColor: (theme) => theme.palette.background.soft,
    }}
  >
    <TitleBar monster={props.monster} href={props.titleHref} />
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 0.5fr' },
      }}
    >
      <Box
        sx={{
          gridRow: { xs: 0, sm: 1 },
          borderRight: { xs: 'none', sm: BORDER_KEY },
          borderTop: { xs: BORDER_KEY, sm: 'none' },
        }}
      >
        <Statistics {...props.monster} />
      </Box>
      <Box sx={{ gridRow: { xs: 1, sm: 0 } }}>
        {props.profile ?? <MonsterProfile monster={props.monster} />}
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          borderLeft: BORDER_KEY,
        }}
      >
        <Elements {...props.monster} />
      </Box>
    </Box>
    <Box
      sx={{
        display: { xs: 'block', md: 'none' },
        borderTop: BORDER_KEY,
      }}
    >
      <Elements {...props.monster} />
    </Box>
    <Loot {...props.monster} />
  </Box>
);
