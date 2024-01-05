import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import { FC, JSXElementConstructor } from 'react';
import { styled } from '@mui/material/styles';
import { useFormContext, FormFields } from '../context';

type PurchaseOptions = FormFields['purchaseOptions'];
type PurchaseOptionKeys = keyof PurchaseOptions;

const purchaseOptionLabels: Record<PurchaseOptionKeys, string> = {
  steam: 'Steam',
  itch: 'Itch.io',
  googlePlay: 'Google Play',
  appStore: 'App Store',
  windowsStore: 'Windows Store',
  amazon: 'Amazon App Store',
  gameJolt: 'Game Jolt',
  website: 'Website',
};

const purchaseOptionPlaceholders: Record<PurchaseOptionKeys, string> = {
  steam: 'https://store.steampowered.com/app/...',
  itch: 'https://username.itch.io/game-name',
  googlePlay: 'https://play.google.com/store/apps/details?id=...',
  appStore: 'https://apps.apple.com/us/app/...',
  windowsStore: 'https://www.microsoft.com/en-us/p/...',
  amazon: 'https://www.amazon.com/...',
  gameJolt: 'https://gamejolt.com/games/...',
  website: 'https://...',
};

export const PurchaseOptions = () => {
  const { values, errors, setFieldValue } = useFormContext();

  const id = 'purchaseOptions';
  const value = values[id];
  const error = errors[id];

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="h5" mb={-1}>
        Purchase Options
      </Typography>
      <FormHelperText error={Boolean(error)}>
        {error ||
          'Include links to marketplaces where your app is available for purchase or download.'}
      </FormHelperText>

      <MarketplaceTextFields
        purchaseOptions={value}
        onChange={(key, data) => {
          setFieldValue(id, {
            ...value,
            [key]: data,
          });
        }}
      />

      <MarketplaceButtons
        purchaseOptions={value}
        onClick={(key) =>
          setFieldValue(id, {
            ...value,
            [key]: value[key] ? undefined : '',
          })
        }
      />
    </Box>
  );
};

const MarketplaceTextFields: FC<{
  purchaseOptions: PurchaseOptions;
  onChange: <T extends PurchaseOptionKeys>(
    key: T,
    value: PurchaseOptions[T]
  ) => void;
}> = ({ purchaseOptions, onChange }) => {
  const hasContent = Object.values(purchaseOptions).some((v) => v != null);
  return (
    <Box
      display={hasContent ? 'flex' : 'none'}
      flexDirection="column"
      gap={3}
      my={1}
    >
      {Object.entries(purchaseOptionLabels).map(([key, label]) => {
        //
        const k = key as PurchaseOptionKeys;
        const opt = purchaseOptions[k];
        const exists = opt != null;

        const error = validateUrl(opt);

        return (
          <Box display={exists ? 'flex' : 'none'} key={key}>
            <MarketplaceTextField
              error={Boolean(error)}
              helperText={error}
              label={`${label} URL`}
              value={opt || ''}
              onChange={(e) => onChange(k, e.target.value)}
              placeholder={
                purchaseOptionPlaceholders[key as PurchaseOptionKeys]
              }
              onClear={() => {
                onChange(k, undefined);
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

const validateUrl = (url: string | undefined) => {
  if (url == null) {
    return;
  }

  try {
    new URL(url);
  } catch (e) {
    return 'Must specify a valid URL starting with https://';
  }

  // url must start with https://
  if (!url.startsWith('https://')) {
    return 'URL must start with https://';
  }
};

const MarketplaceButtons: FC<{
  purchaseOptions: PurchaseOptions;
  onClick: (key: PurchaseOptionKeys) => void;
}> = ({ purchaseOptions, onClick }) => (
  <Box display="flex" flexDirection="row" gap={1} flexWrap={'wrap'}>
    {Object.entries(purchaseOptionLabels).map(([key, label]) => {
      //
      const k = key as PurchaseOptionKeys;
      const opt = purchaseOptions[k];
      const exists = opt != null;

      return (
        <MarketplaceButton
          key={key}
          color={exists ? 'error' : 'primary'}
          startIcon={exists ? <RemoveIcon /> : <AddIcon />}
          onClick={() => onClick(k)}
        >
          {label}
        </MarketplaceButton>
      );
    })}
  </Box>
);

const MarketplaceTextField = styled<
  JSXElementConstructor<
    TextFieldProps & {
      onClear: () => void;
    }
  >
>(
  ({ onClear, ...props }) => (
    <TextField
      size="small"
      required
      type="url"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              aria-label="remove marketplace url"
              color="black"
              onClick={onClear}
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  ),
  {
    shouldForwardProp: (prop) => prop !== 'onClear',
  }
)(({ theme }) => ({
  flexGrow: 1,
}));

const MarketplaceButton = styled<JSXElementConstructor<ButtonProps>>(
  (props) => (
    <Button
      variant="contained"
      size="small"
      startIcon={
        <AddIcon
          sx={{
            mr: -0.5,
          }}
        />
      }
      {...props}
    />
  )
)(({ theme }) => ({
  fontWeight: 700,
  padding: theme.spacing(0, 1),
  borderRadius: theme.shape.borderRadius * 4,
  textTransform: 'none',
  fontFamily: theme.typography.body1.fontFamily,
  width: 'fit-content',
}));
