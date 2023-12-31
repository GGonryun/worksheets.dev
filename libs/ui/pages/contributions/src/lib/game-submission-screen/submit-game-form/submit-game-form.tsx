import { Add, Close, OpenInNew, Publish, Remove } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { StickyContactBox } from '@worksheets/ui/qa-section';
import urls from '@worksheets/util/urls';
import { BasicInformationSection } from './sections';
import { FC, JSXElementConstructor } from 'react';
import { PrefixTextField } from '@worksheets/ui/inputs';

type SubmitGameFormProps = {
  errors: Record<string, string>;
};

export const SubmitGameForm: FC<SubmitGameFormProps> = ({ errors }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '100%', sm: '67% 30%' },
        justifyContent: 'space-around',
        gap: 3,
      }}
    >
      <Box
        sx={{
          order: { xs: 1, sm: 0 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <BasicInformationSection errors={errors} />
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h5">External Website</Typography>
          <FormHelperText>
            <b>Embed an external web page on our website.</b> Your web page must
            be fully responsive across a wide variety of devices. For more
            information on our embedded web page requirements see the{' '}
            <Link href="/contribute#how-do-i-embed-a-web-page" target="_blank">
              FAQ: 'How do I embed a web page?'{' '}
              <OpenInNew fontSize="inherit" sx={{ mb: '-2px' }} />
            </Link>
            .
          </FormHelperText>
          <PrefixTextField
            size="small"
            required
            label="URL"
            helperText="A standalone URL where your game is hosted, this website will be embedded in our site."
            prefix={`https://`}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h5">Game Files</Typography>
          <FormHelperText>
            <b>Upload a ZIP file containing your game.</b> Your ZIP file must
            include an index.html file. For more information on the zip file
            requirements, see the{' '}
            <Link
              href="/contribute#what-file-formats-are-supported"
              target="_blank"
            >
              FAQ: 'How do I upload an HTML5 Game?'{' '}
              <OpenInNew fontSize="inherit" sx={{ mb: '-2px' }} />
            </Link>
            .
          </FormHelperText>
          <FormControl variant="standard">
            <Input
              size="small"
              type="file"
              disableUnderline
              id="file-upload"
              inputProps={{
                accept: '.zip',
              }}
            />
            <FormHelperText>
              File size limit: 50MB.{' '}
              <Link href={`mailto:${urls.email.admin}`} target="_blank">
                Contact us
              </Link>{' '}
              if you need more space.
            </FormHelperText>
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h5">Embed Options</Typography>

          <FormControl component="fieldset">
            <FormHelperText sx={{ p: 0, m: 0 }}>
              <b>Supported Devices</b> &#8212; Your game will be playable on all
              devices by default. If your game is not compatible with certain
              devices, you can uncheck them here.
            </FormHelperText>
            <FormHelperText sx={{ p: 0, m: 0 }} error>
              You must select at least one device.
            </FormHelperText>
            <FormGroup sx={{ pl: 2 }}>
              <FormControlLabel
                control={<Checkbox size="small" sx={{ padding: '4px' }} />}
                label="Computer & Laptop"
                slotProps={{
                  typography: { variant: 'body2' },
                }}
              />
              <FormControlLabel
                control={<Checkbox size="small" sx={{ padding: '4px' }} />}
                label="Mobile & Tablet"
                slotProps={{
                  typography: { variant: 'body2' },
                }}
              />
            </FormGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormHelperText sx={{ p: 0, m: 0 }}>
              <b>Supported Orientations</b> &#8212; Select all orientations that
              your game supports. This option only applies to mobile and tablet
              devices.
            </FormHelperText>
            <FormHelperText sx={{ p: 0, m: 0 }} error>
              You must select at least one orientation.
            </FormHelperText>
            <FormGroup sx={{ pl: 2 }}>
              <FormControlLabel
                control={<Checkbox size="small" sx={{ padding: '4px' }} />}
                label="Portrait"
                slotProps={{
                  typography: { variant: 'body2' },
                }}
              />
              <FormControlLabel
                control={<Checkbox size="small" sx={{ padding: '4px' }} />}
                label="Landscape"
                slotProps={{
                  typography: { variant: 'body2' },
                }}
              />
            </FormGroup>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="h5">Game Details</Typography>
          <TextField
            size="small"
            required
            label="Description"
            multiline
            rows={3}
            helperText={
              "A short description of your game, max 255 characters. If you need rich text formatting, please indicate that in the description and we'll contact you to discuss your options."
            }
          />
          <TextField
            size="small"
            required
            label="Instructions"
            multiline
            rows={3}
            helperText="A short manual describing how to play your game, max 255 characters"
          />
          {/* TODO: convert to a dropdown */}
          <TextField
            size="small"
            required
            label="Category"
            helperText="The primary category of your game, max 50 characters"
          />
          {/* TODO: convert to a multi-select dropdown */}
          <TextField
            size="small"
            required
            label="Tags"
            helperText="Additional keywords or categories that someone might search to find your game, max 10."
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Box>
            <Typography variant="h5">Purchase Options</Typography>
            <FormHelperText>
              Include links to marketplaces where your app is available for
              purchase or download.
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
                    <Close />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
          />
          <Box
            display="flex"
            flexDirection="row"
            gap={1}
            flexWrap={'wrap'}
            mt={1}
          >
            <MarketplaceButton color="error" startIcon={<Remove />}>
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h5" sx={{ mb: -1 }}>
            Media
          </Typography>
          <Box display="flex" flexDirection="column" gap={0.5}>
            <FormHelperText>
              <b>Upload a thumbnail image for your game.*</b> This image will be
              displayed in the game list. The thumbnail should be a square
              image.
              <br />
              (Minimum: 250x250 pixels. Recommended: 512x512 pixels.)
            </FormHelperText>
            <Input
              id="thumbnail-upload"
              size="small"
              type="file"
              disableUnderline
              inputProps={{ accept: 'image/*' }}
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={0.5}>
            <FormHelperText>
              <b>Upload a cover image for your game.*</b> The cover is used on
              load screens and other places where a wider image is needed. The
              cover should be a wide image.
              <br />
              (Minimum: 500 pixels wide. Recommended: 1080 pixels wide.)
              <br />
            </FormHelperText>
            <Input
              id="cover-upload"
              size="small"
              type="file"
              disableUnderline
              inputProps={{ accept: 'image/*' }}
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={0.5}>
            <FormHelperText>
              <b>Optionally upload screenshots of your game.</b> Screenshots are
              used to showcase your game on the game page. You can upload up to
              5 screenshots.
            </FormHelperText>

            <Input
              id="screenshots-upload"
              size="small"
              type="file"
              disableUnderline
              inputProps={{ multiple: true, accept: 'image/*' }}
            />
          </Box>
          <FormControl>
            <FormHelperText sx={{ p: 0, m: 0, mb: 0.5 }}>
              <b>Game play video or trailer</b> &#8212; An optional game play
              video or trailer for your game. Use a YouTube or Vimeo link
            </FormHelperText>
            <TextField
              size="small"
              placeholder="https://www.youtube.com/watch?v=o8PWi-cJOx0"
            />
          </FormControl>
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h5">Interaction Preferences</Typography>
          <FormControl component="fieldset">
            <FormHelperText sx={{ p: 0, m: 0 }}>
              <b>User Comment Permissions</b> &#8212; manage the level of
              engagement with your audience, select an option below to determine
              whether your game is open to receiving comments from the community
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
              <b>Membership Preferences</b> &#8212; Customize who can play your
              game. Increasing the membership requirements of your game reduces
              engagement <br />
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
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Publish sx={{ mr: -0.5 }} />}
          sx={{
            mt: 3,
            px: 4,
            py: 0.5,
            borderRadius: 6,
            width: 'fit-content',
            fontFamily: (theme) => theme.typography.body1.fontFamily,
            textTransform: 'none',
            fontWeight: 700,
          }}
        >
          Save & Submit
        </Button>
      </Box>

      <StickyContactBox
        text={
          'Need help with your game submission? Our team is standing by, ready to assist you.'
        }
      />
    </Box>
  );
};

const MarketplaceButton = styled<JSXElementConstructor<ButtonProps>>(
  (props) => (
    <Button
      variant="contained"
      size="small"
      startIcon={
        <Add
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
