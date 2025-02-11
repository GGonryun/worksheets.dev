import { Button, Link, Typography } from '@mui/material';
import { ActivationCodeType } from '@prisma/client';
import { playRoutes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import {
  ActivationCodeImage,
  CopyableActivationCodes,
} from '@worksheets/ui/components/activation-codes';
import { Row } from '@worksheets/ui/components/flex';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { BasicModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { HelpPrizesQuestions } from '@worksheets/util/enums';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import {
  ActivationCodeContentSchema,
  ActivationCodeDetailSchema,
} from '@worksheets/util/types';
import Image from 'next/image';
import { useState } from 'react';

export const ActivationCodeModal: React.FC<
  ModalWrapper<{
    code: ActivationCodeDetailSchema;
  }>
> = ({ open, onClose, code }) => {
  const snackbar = useSnackbar();
  const utils = trpc.useUtils();
  const [content, setContent] = useState<
    ActivationCodeContentSchema | undefined
  >(undefined);
  const [fetching, setFetching] = useState(false);
  const accessCode = trpc.user.codes.activation.access.useMutation();

  const handleClose = () => {
    onClose && onClose({}, 'escapeKeyDown');
    setContent(undefined);
    setFetching(false);
  };

  const handleFetchContent = async () => {
    try {
      setFetching(true);
      const content = await accessCode.mutateAsync(code.id);
      await utils.user.codes.activation.list.invalidate();
      setContent(content);
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      setFetching(false);
    }
  };

  return (
    <BasicModal open={open} onClose={handleClose}>
      {fetching ? (
        <PulsingLogo message="Decrypting your code..." />
      ) : content ? (
        <ActivationCode code={code} data={content} onClose={handleClose} />
      ) : (
        <ViewCode code={code} onAccessCode={handleFetchContent} />
      )}
    </BasicModal>
  );
};

const ActivationCode: React.FC<{
  onClose: () => void;
  code: ActivationCodeDetailSchema;
  data: ActivationCodeContentSchema;
}> = ({ data, code, onClose }) => {
  return (
    <>
      <Typography variant="h4" color="secondary.main" pt={2}>
        Copy Your Code
      </Typography>

      <Typography textAlign="center">
        Use the code below to access your <br />
        <Link href={code.sourceUrl} target="_blank" fontWeight={700}>
          {code.name}{' '}
          {code.type === ActivationCodeType.STEAM ? 'Steam Key' : ''}
        </Link>
        .
      </Typography>

      <ActivationCodeImage src={code.imageUrl} alt={code.name} width={200} />

      <CopyableActivationCodes content={data.content} />

      <Button
        onClick={onClose}
        fullWidth
        variant="arcade"
        size="large"
        color="secondary"
      >
        Close
      </Button>
      <Button
        href={playRoutes.help.prizes.path({
          bookmark:
            code.type === ActivationCodeType.STEAM
              ? HelpPrizesQuestions.SteamKeys
              : HelpPrizesQuestions.HowToClaim,
        })}
      >
        How do I claim prizes?
      </Button>
    </>
  );
};

const ViewCode: React.FC<{
  code: ActivationCodeDetailSchema;
  onAccessCode: () => void;
}> = ({ code, onAccessCode }) => {
  return (
    <>
      <Typography variant="h4" color="secondary.main" pt={2}>
        Access Your Code
      </Typography>

      <Typography textAlign="center">
        Use the code below to access your <br />
        <Link href={code.sourceUrl} target="_blank" fontWeight={700}>
          {code.name}
        </Link>
        .
      </Typography>

      <ActivationCodeImage src={code.imageUrl} alt={code.name} width={200} />

      {!code.accessedAt && (
        <Typography textAlign="center" variant="body2">
          Once you access the code, it will{' '}
          <Link
            href={playRoutes.help.prizes.path({
              bookmark: HelpPrizesQuestions.TradeCode,
            })}
            fontWeight={700}
          >
            become ineligible for trading
          </Link>
          .
        </Typography>
      )}

      <Button
        sx={{ mt: 1 }}
        onClick={onAccessCode}
        fullWidth
        variant="arcade"
        size="large"
        color="secondary"
      >
        Access Code
      </Button>
      <Row justifyContent="space-evenly" gap={1} flexWrap="wrap" width="100%">
        <Button
          href={playRoutes.help.prizes.path({
            bookmark: HelpPrizesQuestions.HowToClaim,
          })}
        >
          Help Center
        </Button>
        <Button
          href={playRoutes.help.prizes.path({
            bookmark: HelpPrizesQuestions.TradeCode,
          })}
        >
          Trade Code
        </Button>
      </Row>
    </>
  );
};
