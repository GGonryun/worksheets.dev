import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Link,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ApplicationDetails } from '../shared/types';
import StarIcon from '@mui/icons-material/Star';
import { TinyLogo } from '../shared/tiny-logo';

export const ApplicationCard: React.FC<{
  application: ApplicationDetails;
}> = ({ application }) => (
  <Card variant="outlined">
    <CardActionArea href={`/applications/${application.id}`}>
      <CardHeader
        avatar={
          <Box>
            <Typography variant="body2" fontWeight={900}>
              {application.name}
            </Typography>
            <Typography variant="caption">
              <Link>Worksheets.dev</Link>
            </Typography>
          </Box>
        }
        action={
          <Box pr={1} pt={1}>
            <TinyLogo
              borderless
              area={24}
              label={application.name}
              src={application.logo}
            />
          </Box>
        }
      />
      <CardContent sx={{ px: 2, py: 0, height: 60, overflow: 'scroll' }}>
        <Typography variant="body2">{application.description}</Typography>
      </CardContent>
      <CardActions>
        <Box display="flex" alignItems="center" gap={1}>
          <Box display="flex" alignItems="center">
            <StarIcon sx={{ height: 14 }} />
            <Typography variant="caption">5.0</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <SendIcon sx={{ height: 14 }} />
            <Typography variant="caption">0K+</Typography>
          </Box>
        </Box>
      </CardActions>
    </CardActionArea>
  </Card>
);
