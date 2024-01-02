import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';

export const InteractionPreferences = () => (
  <Box display="flex" flexDirection="column" gap={1}>
    <Typography variant="h5">Interaction Preferences</Typography>
    <FormControl component="fieldset">
      <FormHelperText sx={{ p: 0, m: 0 }}>
        <b>User Comment Permissions</b> &#8212; manage the level of engagement
        with your audience, select an option below to determine whether your
        game is open to receiving comments from the community
        <br />
        <i>
          <u>Coming Soon</u>: This feature is in development
        </i>
      </FormHelperText>
      <RadioGroup sx={{ pl: 2 }} defaultValue="disabled">
        <FormControlLabel
          label="Disable User Comments"
          value="disabled"
          control={<Radio size="small" sx={{ padding: '4px' }} />}
          slotProps={{
            typography: { variant: 'body2' },
          }}
        />
        <FormControlLabel
          disabled
          value="anonymous"
          label="Allow Anonymous Comments"
          control={<Radio size="small" sx={{ padding: '4px' }} />}
          slotProps={{
            typography: { variant: 'body2' },
          }}
        />
        <FormControlLabel
          disabled
          value="logged-in"
          label="Allow Logged In User Comments"
          control={<Radio size="small" sx={{ padding: '4px' }} />}
          slotProps={{
            typography: { variant: 'body2' },
          }}
        />
      </RadioGroup>
    </FormControl>
    <FormControl component="fieldset">
      <FormHelperText sx={{ p: 0, m: 0 }}>
        <b>Membership Preferences</b> &#8212; Customize who can play your game.
        Increasing the membership requirements of your game reduces engagement{' '}
        <br />
        <i>
          <u>Coming Soon</u>: This feature is in development
        </i>
      </FormHelperText>
      <RadioGroup sx={{ pl: 2 }} defaultValue="anyone">
        <FormControlLabel
          label="Open to public"
          value="anyone"
          control={<Radio size="small" sx={{ padding: '4px' }} />}
          slotProps={{
            typography: { variant: 'body2' },
          }}
        />
        <FormControlLabel
          disabled
          value="logged-in"
          label="Restricted to logged in users"
          control={<Radio size="small" sx={{ padding: '4px' }} />}
          slotProps={{
            typography: { variant: 'body2' },
          }}
        />
        <FormControlLabel
          disabled
          value="subscribers"
          label="Exclusive to subscribers"
          control={<Radio size="small" sx={{ padding: '4px' }} />}
          slotProps={{
            typography: { variant: 'body2' },
          }}
        />
      </RadioGroup>
    </FormControl>
  </Box>
);
