import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React from 'react';
import { styled } from '@mui/material/styles';
import { TermsOfServiceStatement } from '@worksheets/ui/pages/terms-of-service';
import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';

export const GettingStarted: React.FC<{
  canSubmit: boolean;
  onSubmit: () => Promise<void>;
}> = ({ onSubmit, canSubmit }) => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography
        variant="h6"
        fontSize={{
          xs: '1.25rem',
          sm: '1.5rem',
        }}
      >
        Become a Charity Games Publisher
      </Typography>
      <Divider
        sx={{
          mt: -1,
        }}
      />
      <Typography>
        In order to start publishing your games you must agree to our terms and
        conditions. The publisher terms are included in our standard terms of
        service which you can review below.
      </Typography>

      <Typography>
        We've included a copy of our terms of service for your review below. We
        urge you to make an informed decision before you agree to our terms of
        service. We put special effort to make our terms of service easy to
        understand and fair to contributors. If you have any questions or
        concerns please <Link href={`/contact`}>contact us</Link>.
      </Typography>

      <PolicyBox>
        <TermsOfServiceStatement />
      </PolicyBox>

      <IncompleteProfileAlert visible={!canSubmit} />

      <CheckboxGroup
        disabled={!canSubmit}
        checked={checked}
        setChecked={setChecked}
      />

      <SubmissionButton
        loading={loading}
        disabled={!canSubmit || !checked}
        onClick={async () => {
          setLoading(true);
          await onSubmit();
          setLoading(false);
        }}
      />
    </Box>
  );
};

const IncompleteProfileAlert: React.FC<{ visible: boolean | undefined }> = ({
  visible,
}) => (
  <Box my={1} display={visible ? 'block' : 'none'}>
    <Alert severity="error">
      <Typography variant="body2" fontWeight={900}>
        Incomplete Developer Profile &#8212;{' '}
        <Link href="/account" color="primary">
          Edit Account
        </Link>
      </Typography>
      <Typography variant="body3">
        You must complete your profile before you can accept the terms of
        service.
      </Typography>
    </Alert>
  </Box>
);

const PolicyBox = styled(Box)(({ theme }) => ({
  border: `2px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(2),
  paddingTop: 0,
  overflow: 'scroll',
  maxHeight: 300,
  [theme.breakpoints.up('sm')]: {
    maxHeight: 500,
  },
}));

const CheckboxGroup: React.FC<{
  checked: boolean;
  disabled: boolean;
  setChecked: (checked: boolean) => void;
}> = ({ disabled, checked, setChecked }) => {
  return (
    <FormControl component="fieldset" disabled={disabled}>
      <FormHelperText sx={{ p: 0, m: 0 }}>
        Please review the following:
      </FormHelperText>
      <FormGroup sx={{ pl: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              sx={{ padding: '4px' }}
              checked={checked}
              disabled={disabled}
              onChange={(e) => setChecked(e.target.checked)}
            />
          }
          label={
            <Typography
              variant="body2"
              color={disabled ? 'text.secondary' : 'text.primary'}
            >
              I have read the terms of service.
            </Typography>
          }
        />
      </FormGroup>
    </FormControl>
  );
};

const SubmissionButton: React.FC<
  Pick<ButtonProps, 'disabled' | 'onClick'> & { loading: boolean }
> = ({ loading, disabled, ...props }) => (
  <Button
    {...props}
    disabled={disabled || loading}
    variant="contained"
    size="small"
    color="error"
    startIcon={
      loading ? (
        <CircularProgress color="primary" size="1rem" />
      ) : (
        <CheckCircleOutlineIcon />
      )
    }
    sx={{
      width: 'fit-content',
      borderRadius: 8,
      px: 3,
      textTransform: 'none',
      fontFamily: (theme) => theme.typography.body1.fontFamily,
    }}
  >
    I accept the terms of service for publishers
  </Button>
);
