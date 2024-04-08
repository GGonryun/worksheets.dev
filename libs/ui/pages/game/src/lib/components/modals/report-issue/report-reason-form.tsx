import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { ReportReason } from '@worksheets/prisma';
import { FC } from 'react';

const reportReasonOptionOrder: Record<ReportReason, number> = {
  BROKEN: 0,
  HARMFUL: 1,
  INAPPROPRIATE: 2,
  LEGAL: 3,
  FRAUD: 4,
  DEFAMATORY: 5,
  OTHER: 6,
};

const reportReasonTitles: Record<ReportReason, string> = {
  BROKEN: 'Broken',
  INAPPROPRIATE: 'Inappropriate',
  OTHER: 'Other',
  DEFAMATORY: 'Defamatory',
  HARMFUL: 'Harmful',
  LEGAL: 'Legal Violation',
  FRAUD: 'Fraud',
};

const reportReasonDescription: Record<ReportReason, string> = {
  BROKEN:
    'The game is broken or not working properly, refreshing the page does not fix the issue.',
  INAPPROPRIATE: 'The game contains inappropriate or adult content.',
  OTHER: 'Any other reason not listed above.',
  DEFAMATORY:
    'The game contains libelous or defamatory content, statements, and/or images.',
  HARMFUL: 'The game attempts to harm or exploit minors, or users, in any way.',
  LEGAL: 'The game violates the law in your jurisdiction.',
  FRAUD:
    'The game attempts to defraud users in any way, or contains malicious links.',
};

const reportReasons: ReportReason[] = Object.keys(reportReasonOptionOrder).sort(
  (a, b) =>
    reportReasonOptionOrder[a as ReportReason] -
    reportReasonOptionOrder[b as ReportReason]
) as ReportReason[];

const ReportReasonRadioButton: FC<{
  value: ReportReason;
}> = ({ value }) => (
  <FormControlLabel
    sx={{
      '&.MuiFormControlLabel-root': {
        alignItems: 'flex-start',
        paddingLeft: '4px',
        marginTop: 0.5,
      },
      '& .MuiRadio-root': {
        padding: '3px',
        marginRight: 1,
      },
    }}
    value={value}
    control={<Radio size="small" />}
    label={
      <Box>
        <Typography component="span" variant="body2">
          {reportReasonTitles[value]}
        </Typography>{' '}
        &#8212;{' '}
        <Typography component="span" variant="body3" color="text.secondary">
          {reportReasonDescription[value]}
        </Typography>
      </Box>
    }
  />
);

const ReportReasonRadioGroup: FC<{
  value?: ReportReason;
  onChange: (value: ReportReason) => void;
}> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange((event.target as HTMLInputElement).value as ReportReason);
  };

  return (
    <RadioGroup
      aria-labelledby="report-reason-buttons-group-label"
      name="report-reason-selection"
      value={value ?? 'NONE'}
      onChange={handleChange}
    >
      {reportReasons.map((r) => (
        <ReportReasonRadioButton value={r} key={r} />
      ))}
    </RadioGroup>
  );
};

export const ReportReasonForm: FC<{
  error: string;
  reason?: ReportReason;
  onChange: (value: ReportReason) => void;
}> = ({ error, reason, onChange }) => {
  return (
    <FormControl error={Boolean(error)} variant="standard">
      <FormLabel id="report-reason-buttons-group-label">
        Reason for reporting
      </FormLabel>
      <ReportReasonRadioGroup value={reason} onChange={onChange} />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};
