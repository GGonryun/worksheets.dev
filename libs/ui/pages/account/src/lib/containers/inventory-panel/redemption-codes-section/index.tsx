import { ArrowRightAlt, Close, InfoOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Column } from '@worksheets/ui/components/flex';
import { FillImage } from '@worksheets/ui/components/images';
import { BulletPoints } from '@worksheets/ui/components/lists';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { InfoModal, ModalWrapper } from '@worksheets/ui/components/modals';
import { PanelFooter } from '@worksheets/ui/components/panels';
import { useSnackbar } from '@worksheets/ui/components/snackbar';
import { InventoryPanels } from '@worksheets/util/enums';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { RedemptionCodeSchema } from '@worksheets/util/types';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const RedemptionCodesSection: React.FC = () => {
  const snackbar = useSnackbar();
  const [code, setCode] = useState<string>('');
  const [redeeming, setRedeeming] = useState<boolean>(false);
  const [reward, setReward] = useState<RedemptionCodeSchema | undefined>(
    undefined
  );
  const redeem = trpc.user.codes.redemption.redeem.useMutation();
  const utils = trpc.useUtils();

  const handleRedeem = async () => {
    try {
      setRedeeming(true);
      const result = await redeem.mutateAsync(code);
      await utils.user.inventory.invalidate();
      setCode('');
      setReward(result);
      snackbar.success('Code redeemed successfully!');
    } catch (error) {
      snackbar.error(parseTRPCClientErrorMessage(error));
    } finally {
      setRedeeming(false);
    }
  };

  if (redeeming) {
    return <LoadingBar />;
  }

  return (
    <>
      <Column gap={2}>
        <Typography variant="h6">Redeem a code</Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr auto' },
            gap: 2,
            alignItems: 'center',
            mb: 1,
          }}
        >
          <TextField
            size="small"
            value={code}
            placeholder="Enter your code"
            onChange={(e) => {
              setCode(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="remove marketplace url"
                    color="black"
                    onClick={() => setCode('')}
                  >
                    <Close />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            size="small"
            variant="arcade"
            color="primary"
            onClick={handleRedeem}
          >
            Redeem
          </Button>
        </Box>

        <BulletPoints
          icon={<InfoOutlined fontSize="small" color="info" />}
          title={'How It Works'}
          points={[
            `Redemption codes are special codes that can be used to redeem items, tokens, or other rewards.`,
            `To redeem a code, simply enter the code in the field below and click "Redeem".`,
            `Codes are case-sensitive and should be entered exactly as they appear.`,
          ]}
        />

        <PanelFooter
          learn={{
            text: 'Prizes',
            href: routes.help.prizes.path(),
          }}
        />
      </Column>
      {reward && (
        <RewardModal
          open={Boolean(reward)}
          reward={reward}
          onClose={() => setReward(undefined)}
        />
      )}
    </>
  );
};

const RewardModal: React.FC<ModalWrapper<{ reward: RedemptionCodeSchema }>> = ({
  open,
  onClose,
  reward,
}) => {
  const handleClick = () => {
    onClose?.({}, 'backdropClick');
  };
  return (
    <InfoModal open={open} onClose={onClose}>
      <Column gap={1} textAlign="center" alignItems="center" minWidth={200}>
        <Typography variant="h5">Congratulations!</Typography>
        <Typography variant="body1">
          You have successfully redeemed the following reward:
        </Typography>
        <Typography
          variant="h6"
          component={Link}
          href={routes.item.path({
            params: {
              itemId: reward.item.id,
            },
          })}
          target="_blank"
        >
          <strong>{reward.item.name}</strong>
        </Typography>
        <Typography variant="body2">{reward.item.description}</Typography>
        <Box sx={{ position: 'relative', height: 72, width: 72 }}>
          <FillImage src={reward.item.imageUrl} alt={reward.item.name} />
        </Box>
        <Button
          fullWidth
          variant="arcade"
          color="primary"
          href={routes.account.inventory.path({
            bookmark: InventoryPanels.Items,
          })}
          onClick={handleClick}
          endIcon={<ArrowRightAlt />}
        >
          My Items
        </Button>
      </Column>
    </InfoModal>
  );
};

export const DynamicRedemptionCodesSection = dynamic(
  () => Promise.resolve(RedemptionCodesSection),
  {
    ssr: false,
  }
);
