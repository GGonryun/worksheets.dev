import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import { JSXElementConstructor } from 'react';
import { styled } from '@mui/material/styles';

export const PurchaseOptions = () => (
  <Box display="flex" flexDirection="column" gap={1}>
    <Box>
      <Typography variant="h5">Purchase Options</Typography>
      <FormHelperText>
        Include links to marketplaces where your app is available for purchase
        or download.
      </FormHelperText>
    </Box>
    <TextField
      size="small"
      required
      label="Steam URL"
      placeholder="https://store.steampowered.com/app/..."
      type="url"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              aria-label="remove marketplace url"
              color="black"
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{ flexGrow: 1 }}
    />
    <Box display="flex" flexDirection="row" gap={1} flexWrap={'wrap'} mt={1}>
      <MarketplaceButton color="error" startIcon={<RemoveIcon />}>
        Steam
      </MarketplaceButton>
      <MarketplaceButton>Itch.io</MarketplaceButton>
      <MarketplaceButton>Apple App Store</MarketplaceButton>
      <MarketplaceButton>Google Play</MarketplaceButton>
      <MarketplaceButton>Amazon App Store</MarketplaceButton>
      <MarketplaceButton>Windows Store</MarketplaceButton>
      <MarketplaceButton>Game Jolt</MarketplaceButton>
      <MarketplaceButton>Direct Link</MarketplaceButton>
    </Box>
  </Box>
);

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
