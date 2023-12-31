import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

export type ProjectType = 'html' | 'embed';

export const projectTypeFieldId = 'project-type';

export const ProjectTypeField: FC<{
  error: string | undefined;
  value?: ProjectType;
  onChange: (v: ProjectType) => void;
}> = ({ error, value, onChange }) => (
  <FormControl fullWidth>
    <InputLabel size="small" id="project-type-label">
      Project Type
    </InputLabel>
    <Select
      size="small"
      labelId="project-type-label"
      id={projectTypeFieldId}
      error={Boolean(error)}
      value={value ?? ''}
      label="Project Type"
      onChange={(e) => onChange(e.target.value as ProjectType)}
    >
      <MenuItem dense value={'html'}>
        <CustomListItemText
          primary="HTML"
          secondary=" &#8212; You have a zip file containing an HTML5 game."
        />
      </MenuItem>
      <MenuItem dense value={'embed'}>
        <CustomListItemText
          primary="Web Embed"
          secondary=" &#8212; You have a website that hosts your game."
        />
      </MenuItem>
    </Select>
    <FormHelperText error={Boolean(error)}>
      {error ??
        'Whether your game should be hosted on our platform or if we should link to an external site.'}
    </FormHelperText>
  </FormControl>
);

const CustomListItemText: FC<{
  primary: string;
  secondary: string;
}> = ({ primary, secondary }) => (
  <ListItemText disableTypography>
    <Typography component="span" variant="body2">
      {primary}
    </Typography>
    <Typography component="span" variant="body3" color="text.secondary">
      {secondary}
    </Typography>
  </ListItemText>
);
