import { MoreHoriz } from '@mui/icons-material';
import { lighten, useTheme } from '@mui/material';
import { Box, Collapse, LinearProgress, Typography } from '@mui/material';
import { Column, Row } from '@worksheets/ui/components/flex';
import { FillImage } from '@worksheets/ui/components/images';
import { calculatePercentage, toPercentage } from '@worksheets/util/numbers';
import { printShortDateTime } from '@worksheets/util/time';
import {
  GameAchievementSchema,
  PlayerGameAchievementSchema,
} from '@worksheets/util/types';
import { useState } from 'react';

export const GlobalAchievementsList: React.FC<{
  global: GameAchievementSchema[];
  player: PlayerGameAchievementSchema[];
  total: number;
}> = ({ global, player, total }) => {
  return (
    <Column gap={1}>
      {global.map((achievement) => {
        const progress = player.find((p) => p.achievementId === achievement.id);
        return (
          <GlobalAchievementListItem
            key={achievement.id}
            achievement={achievement}
            progress={progress}
            total={total}
          />
        );
      })}
    </Column>
  );
};

const GlobalAchievementListItem: React.FC<{
  total: number;
  achievement: GameAchievementSchema;
  progress: PlayerGameAchievementSchema | undefined;
}> = ({ total, achievement, progress }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const color = progress ? 'success' : 'primary';
  const lightenedColor = lighten(theme.palette[color].main, 0.2);
  return (
    <Box
      sx={{
        color: theme.palette.text.primary,
        border: `3px solid ${lightenedColor}`,
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.01)',
        },
      }}
    >
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          cursor: 'pointer',
          position: 'relative',
          p: 1,
        }}
      >
        <LinearProgress
          variant="determinate"
          color={color}
          value={calculatePercentage(achievement.players, total)}
          sx={{
            position: 'absolute',
            opacity: 0.2,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: '100%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            right: -4,
            px: 1,
            bottom: -8,
          }}
        >
          <MoreHoriz sx={{ color: lightenedColor }} fontSize="large" />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 64px',
          }}
        >
          <Row gap={1}>
            <Box
              sx={{
                height: 64,
                minWidth: 64,
                width: 64,
                borderRadius: theme.shape.borderRadius,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <FillImage
                src={achievement.iconUrl}
                alt={`achievement.name achievement logo`}
              />
            </Box>
            <Column>
              <Typography
                typography={{ xs: 'body2', sm: 'body1' }}
                fontWeight={{ xs: 700, sm: 700 }}
                color={theme.palette[color].dark}
              >
                {achievement.name}
              </Typography>
            </Column>
          </Row>
          <Box
            sx={{
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Typography
              color={`${color}.main`}
              typography={{ xs: 'body3', sm: 'body2' }}
              mb={1}
              fontWeight={{ xs: 900, sm: 900 }}
            >
              {toPercentage(achievement.players, total, 1)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Collapse in={open}>
        <Box
          sx={{
            userSelect: 'none',
            borderTop: `1px solid ${lighten(theme.palette[color].main, 0.2)}`,
            p: progress?.unlockedAt ? 1 : 1.5,
            pl: 1.5,
          }}
        >
          <Typography
            typography={{ xs: 'body3', sm: 'body3' }}
            fontWeight={{ xs: 500, sm: 500 }}
            color={theme.palette[color].main}
          >
            {achievement.description}
          </Typography>
          {progress?.unlockedAt && (
            <Typography
              typography={{ xs: 'body3', sm: 'body3' }}
              fontWeight={{ xs: 500, sm: 500 }}
              color={theme.palette[color].main}
              fontStyle={{ xs: 'italic', sm: 'italic' }}
              mt={2}
            >
              Unlocked at ${printShortDateTime(progress.unlockedAt)}
            </Typography>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};
