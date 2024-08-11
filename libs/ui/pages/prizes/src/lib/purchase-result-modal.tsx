import { Close, OpenInNew } from '@mui/icons-material';
import { Box, Button, Link, Typography } from '@mui/material';
import { ActivationCodeType } from '@prisma/client';
import { routes } from '@worksheets/routes';
import { CopyableActivationCodes } from '@worksheets/ui/components/activation-codes';
import { Column } from '@worksheets/ui/components/flex';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { HelpPrizesQuestions, InventoryPanels } from '@worksheets/util/enums';
import { PurchaseResultSchema } from '@worksheets/util/types';
import React from 'react';
export const PurchaseResultModal: React.FC<
  ModalWrapper<{ result: PurchaseResultSchema | null }>
> = ({ open, onClose, result }) => {
  if (!result) return null;

  return (
    <InfoModal
      open={open}
      onClose={onClose}
      background={(theme) => theme.palette.background['solid-blue']}
    >
      <Column gap={2}>
        <Typography variant="h4" color="text.arcade">
          {result ? 'Prize Unlocked!' : 'Failed to unlock prize'}
        </Typography>
        {result ? (
          <SuccessfulPurchaseContent result={result} />
        ) : (
          <FailedPurchaseContent />
        )}
        <Button
          variant="arcade"
          color="secondary"
          startIcon={<Close />}
          onClick={() => onClose?.({}, 'escapeKeyDown')}
        >
          Close
        </Button>
      </Column>
    </InfoModal>
  );
};

const SuccessfulPurchaseContent: React.FC<{ result: PurchaseResultSchema }> = ({
  result,
}) => {
  return (
    <Column gap={2} color={(theme) => theme.palette.text.arcade}>
      <Typography fontWeight={700}>
        Use the code below to access your{' '}
        <Link
          href={result.url}
          target="_blank"
          fontWeight={700}
          color="inherit"
        >
          {result.name}{' '}
          {result.type === ActivationCodeType.STEAM ? 'Steam Key' : ''}
        </Link>
        .
      </Typography>

      <Box
        sx={{
          backgroundColor: 'background.paper',
          py: 1,
          px: 2,
          borderRadius: (theme) => theme.shape.borderRadius,
        }}
      >
        <CopyableActivationCodes content={result.code} />
      </Box>

      <Column>
        <Button
          sx={{ width: 'fit-content' }}
          color="inherit"
          target="_blank"
          href={routes.help.prizes.path({
            bookmark:
              result.type === ActivationCodeType.STEAM
                ? HelpPrizesQuestions.SteamKeys
                : HelpPrizesQuestions.HowToClaim,
          })}
          startIcon={<OpenInNew />}
        >
          How do I claim prizes?
        </Button>
        <Button
          sx={{ width: 'fit-content' }}
          color="inherit"
          target="_blank"
          startIcon={<OpenInNew />}
          href={routes.account.inventory.path({
            bookmark: InventoryPanels.ActivationCodes,
          })}
        >
          View my activation codes
        </Button>
      </Column>
    </Column>
  );
};

const FailedPurchaseContent = () => {
  return (
    <Typography variant="body1" color="text.arcade">
      Something went wrong. Refresh the page and try again. If the problem
      persists, please contact support.
    </Typography>
  );
};
