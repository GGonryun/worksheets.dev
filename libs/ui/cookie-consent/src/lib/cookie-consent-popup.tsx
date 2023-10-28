import {
  Box,
  Button,
  ButtonProps,
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormGroup,
  Link,
  LinkProps,
  Typography,
  styled,
} from '@mui/material';
import { urls } from '@worksheets/ui-games';
import { FC, JSXElementConstructor, useEffect, useState } from 'react';
import { useCookieConsent } from './use-cookie-consent';
import { CookieConsent } from './util';

export interface CookieConsentPopupProps {
  onAccept?: () => void;
}

export const CookieConsentPopup: FC<CookieConsentPopupProps> = ({
  onAccept,
}) => {
  const { consent, setConsent } = useCookieConsent();

  const [showConsent, setShowConsent] = useState(false);
  const [selections, setSelections] = useState<CookieConsent>({
    necessary: true,
    preferences: true,
    statistics: true,
    marketing: true,
  });

  useEffect(() => {
    if (!consent.necessary) {
      setShowConsent(true);
    } else {
      setShowConsent(false);
    }
  }, [consent]);

  const handleAccept = () => {
    onAccept && onAccept();
    setConsent({ ...selections, necessary: true });
  };

  if (!showConsent) return null;

  return (
    <PopupContainer>
      <SmallText>
        This site or third-party tools used by this site use cookies necessary
        for its operation and useful for the purposes illustrated in the cookie
        policy. To learn more or opt out, see the cookie policy.
      </SmallText>
      <SmallText fontWeight={900}>
        By accepting this banner, you consent to the use of cookies.
      </SmallText>
      <SelectionGroup>
        <FormControlLabel
          disabled
          control={<SelectionBox defaultChecked disabled />}
          label={<SelectionLabel>Necessary</SelectionLabel>}
        />
        <FormControlLabel
          control={
            <SelectionBox
              checked={selections.preferences}
              onChange={() =>
                setSelections((s) => ({
                  ...s,
                  preferences: !s.preferences,
                }))
              }
            />
          }
          label={<SelectionLabel>Preferences</SelectionLabel>}
        />
        <FormControlLabel
          control={
            <SelectionBox
              checked={selections.statistics}
              onChange={() =>
                setSelections((s) => ({
                  ...s,
                  statistics: !s.statistics,
                }))
              }
            />
          }
          label={<SelectionLabel>Statistics</SelectionLabel>}
        />
        <FormControlLabel
          control={
            <SelectionBox
              checked={selections.marketing}
              onChange={() =>
                setSelections((s) => ({
                  ...s,
                  marketing: !s.marketing,
                }))
              }
            />
          }
          label={<SelectionLabel>Marketing</SelectionLabel>}
        />
      </SelectionGroup>
      <InputGroup>
        <CookiePolicyLink href={urls.charityGames.cookies}>
          Cookie Policy
        </CookiePolicyLink>
        <AcceptButton onClick={handleAccept}>Accept</AcceptButton>
      </InputGroup>
    </PopupContainer>
  );
};

export const PopupContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  borderTop: `1px solid ${theme.palette.grey[600]}`,
  padding: theme.spacing(1, 2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  zIndex: 1000,
}));

export const InputGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
}));

export const SelectionGroup = styled(FormGroup)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const SelectionBox = styled<JSXElementConstructor<CheckboxProps>>(
  (props) => <Checkbox size="small" {...props} />
)(({ theme }) => ({
  padding: theme.spacing(0, 1),
  color: theme.palette.text.primary,
}));

export const SelectionLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.text.primary,
  '@media (min-width: 600px)': {
    fontSize: theme.typography.body2.fontSize,
  },
}));

export const SmallText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.grey[800],
  '@media (min-width: 600px)': {
    fontSize: theme.typography.body2.fontSize,
  },
}));

export const CookiePolicyLink = styled<JSXElementConstructor<LinkProps>>(
  (props) => <Link {...props} />
)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecorationColor: theme.palette.text.primary,
  fontSize: theme.typography.caption.fontSize,
  fontFamily: 'serif',
  fontWeight: 900,
  '&:hover': {
    color: theme.palette.text.primary,
  },
  '@media (min-width: 600px)': {
    fontSize: theme.typography.body2.fontSize,
  },
}));

export const AcceptButton = styled<JSXElementConstructor<ButtonProps>>(
  (props) => (
    <Button disableElevation disableRipple variant="contained" {...props} />
  )
)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  color: theme.palette.primary.contrastText,
  borderRadius: 0,
  fontWeight: 900,
  padding: theme.spacing(0.3, 3),
  textTransform: 'none',
  '&:hover': {
    colbackgroundColoror: theme.palette.text.primary,
  },
}));
