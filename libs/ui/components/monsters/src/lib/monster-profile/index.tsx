import { Box, SxProps, Theme } from '@mui/material';
import { ContainImage } from '@worksheets/ui/components/images';
import { MonsterSchema } from '@worksheets/util/types';
import React from 'react';

export const MonsterProfile: React.FC<{
  monster: MonsterSchema;
  sx?: SxProps<Theme>;
  fightButton?: React.ReactNode;
  infoButton?: React.ReactNode;
  healthBar?: React.ReactNode;
}> = (props) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative',
        display: 'grid',
        placeItems: 'center',
        p: 2,
      }}
    >
      {props.healthBar && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {props.healthBar}
        </Box>
      )}
      <Box
        position="relative"
        minWidth={125}
        minHeight={125}
        width="100%"
        height="100%"
        maxWidth={300}
        maxHeight={300}
        sx={props.sx}
      >
        <ContainImage src={props.monster.imageUrl} alt={props.monster.name} />
      </Box>
      {props.infoButton && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
          }}
        >
          {props.infoButton}
        </Box>
      )}
      {props.fightButton && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
          }}
        >
          {props.fightButton}
        </Box>
      )}
    </Box>
  );
};
