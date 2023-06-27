import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Link,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ApplicationDetails, GetTemplateDetails } from '../shared/types';
import { TinyLogo } from '../shared/tiny-logo';
import { useRouter } from 'next/router';

export const TemplateCard: React.FC<{
  template: GetTemplateDetails;
  onAppClick: (app: ApplicationDetails) => void;
}> = ({ template, onAppClick }) => {
  const { push } = useRouter();
  return (
    <Card>
      <CardHeader
        avatar={
          <Box>
            {template.apps.map((app) => (
              <ButtonBase key={app.id} onClick={() => onAppClick(app)}>
                <TinyLogo label={app.name} src={app.logo} />
              </ButtonBase>
            ))}
          </Box>
        }
        action={
          <Typography variant="caption">
            <Link href={`/templates/${template.id}`}>Learn more</Link>
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1">{template.description}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box display="flex" gap={1} alignItems="center">
          {template.categories.map((category) => (
            <Chip
              label={category}
              size="small"
              clickable
              sx={{
                borderRadius: 2,
              }}
              onClick={() => alert('TODO: filter templates by tags')}
            />
          ))}
        </Box>
        <Button
          size="small"
          variant="outlined"
          sx={{ py: 0, px: 1, marginLeft: 'auto' }}
          endIcon={<SendIcon />}
          onClick={() => push(`/worksheets/create?templateId=${template.id}`)}
        >
          Create template
        </Button>
      </CardActions>
    </Card>
  );
};
