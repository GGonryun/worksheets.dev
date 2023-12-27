import Box from '@mui/material/Box';
import { CategoryBreadcrumbs } from '../category-breadcrumbs';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { SupportedDeviceIcons } from '../supported-device-icons';
import Link, { LinkProps } from '@mui/material/Link';
import { FC, JSXElementConstructor } from 'react';
import { styled } from '@mui/material/styles';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StarIcon from '@mui/icons-material/Star';
import { GameSchema } from '@worksheets/util/types';

export const GameHeader: FC<{
  title: string;
  developer: {
    id: string;
    name: string;
  };
  plays: string;
  score: string;
  category: GameSchema['category'];
  platforms: GameSchema['platforms'];
}> = ({ category, platforms, title, developer, plays, score }) => {
  return (
    <Box>
      <CategoryBreadcrumbs categories={category} />
      <Box mt={1} mb={0.5} display="flex" gap={3} alignItems="center">
        <Typography
          variant="h4"
          sx={{
            lineHeight: 1,
          }}
        >
          {title}
        </Typography>
        <SupportedDeviceIcons platforms={platforms} />
      </Box>
      <Box
        mb={0.5}
        display="flex"
        gap={{ xs: 2, sm: 1 }}
        alignItems="center"
        flexWrap="wrap"
      >
        <GameDeveloperLink href={`/developers/${developer.id}`}>
          by {developer.name}
        </GameDeveloperLink>
        <Box display="flex" gap={1}>
          <TextSquare>
            <PlayCircleIcon />
            {plays} plays
          </TextSquare>
          <TextSquare>
            <StarIcon />
            {score} score
          </TextSquare>
        </Box>
      </Box>
    </Box>
  );
};

const GameDeveloperLink = styled((props) => (
  <Link underline="hover" color="inherit" {...props} />
))<LinkProps>(({ theme }) => ({
  lineHeight: 1,
  color: theme.palette.grey[700],
  fontFamily: theme.typography.mPlus1p.fontFamily,
  fontSize: theme.typography.pxToRem(16),
  fontWeight: 700,
}));

const TextSquare = styled<JSXElementConstructor<TypographyProps>>((props) => (
  <Typography variant="body2" {...props} />
))(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  backgroundColor: theme.palette.grey[200],
  fontFamily: theme.typography.dangrek.fontFamily,
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5, 1),
  lineHeight: '1rem',
  '& .MuiSvgIcon-root': {
    fontSize: '1rem',
    marginTop: '-1px',
  },
}));
