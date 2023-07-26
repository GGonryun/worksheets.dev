import { AddCircle } from '@mui/icons-material';
import {
  Box,
  ButtonBase,
  Typography,
  Collapse,
  List,
  ListItem,
} from '@mui/material';

export const ApplicationInformation: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <ButtonBase>
        <Box display="flex" alignItems="center" gap={2} py={0.5} px={1}>
          <AddCircle color="primary" />
          <Typography fontWeight={900} color="primary">
            Instructions
          </Typography>
        </Box>
      </ButtonBase>
      <Box pl={6}>
        <Collapse in={true}>
          <Typography variant="body1">
            An API token is needed to validate a user's identity from one server
            to another by retrieving client resources from the server where the
            connection is made.
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 2 }}>
            <ListItem sx={{ display: 'list-item' }}>
              <Typography variant="body2">
                An API token is needed to validate a user's identity from one
                server to another by retrieving client resources from the server
                where the connection is made.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <Typography variant="body2">
                An API token is needed to validate a user's identity from one
                server to another by retrieving client resources from the server
                where the connection is made.
              </Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <Typography variant="body2">
                An API token is needed to validate a user's identity from one
                server to another by retrieving client resources from the server
                where the connection is made.
              </Typography>
            </ListItem>
          </List>
        </Collapse>
      </Box>
      <ButtonBase>
        <Box display="flex" alignItems="center" gap={2} py={0.5} px={1}>
          <AddCircle color="primary" />
          <Typography fontWeight={900} color="primary">
            Description
          </Typography>
        </Box>
      </ButtonBase>
      <ButtonBase>
        <Box display="flex" alignItems="center" gap={2} py={0.5} px={1}>
          <AddCircle color="primary" />
          <Typography fontWeight={900} color="primary">
            Security
          </Typography>
        </Box>
      </ButtonBase>
    </Box>
  );
};
