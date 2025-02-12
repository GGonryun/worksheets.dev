import {
  alpha,
  Box,
  Link,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';
import { routes } from '@worksheets/routes';
import { Row } from '@worksheets/ui/components/flex';
import { ResponsiveImage } from '@worksheets/ui/components/images';
import { PaletteColor } from '@worksheets/ui/theme';
import { toPercentage } from '@worksheets/util/numbers';
import { ItemSchema, ItemSourcesSchema } from '@worksheets/util/types';
import pluralize from 'pluralize';
import React, { Fragment, ReactNode } from 'react';

import { itemRarityLabel, itemTypeLabel } from './data';

export const ItemDetails: React.FC<{
  item: ItemSchema;
  sources: ItemSourcesSchema;
}> = (props) => {
  return (
    <Box
      sx={{
        borderRadius: (theme) => theme.shape.borderRadius,
        border: '2px solid grey',
        overflow: 'hidden',
      }}
    >
      <Row
        width="100%"
        gap={1}
        sx={{
          backgroundColor: (theme) => theme.palette.background['solid-blue'],
          px: 2,
          py: 0.5,
        }}
      >
        <Typography
          typography={{ xs: 'body1', sm: 'h6' }}
          fontWeight={{ xs: 900, sm: 900 }}
          color="text.arcade"
        >
          {props.item.name}
        </Typography>
      </Row>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            placeItems: 'center',
            p: 2,
            position: 'relative',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'grid',
              placeItems: 'center',
              height: '100%',
              width: '100%',
              maxWidth: '200px',
            }}
          >
            <ResponsiveImage src={props.item.imageUrl} alt={props.item.name} />
          </Box>
        </Box>
        <Box
          sx={{
            borderTop: { xs: '2px solid grey', sm: 'none' },
            borderLeft: { xs: 'none', sm: '2px solid grey' },
            width: '100%',
            '& > div:not(:last-child)': {
              borderBottom: '1px solid grey',
            },
          }}
        >
          <Data label={'ID'} value={props.item.id} />
          <Data label={'Type'} value={itemTypeLabel[props.item.type]} />
          <Data label={'Rarity'} value={itemRarityLabel[props.item.rarity]} />
          <Data wrap label={'Description'} value={props.item.description} />
          <Data
            label={'Sells For'}
            value={`${props.item.sell} ${pluralize('token', props.item.sell)}`}
          />
          <Data
            label={'Buy For'}
            value={
              props.item.buy
                ? `${props.item.buy} ${pluralize('token', props.item.buy)}`
                : 'N/A'
            }
          />
          <Data
            wrap
            label={'Dropped By'}
            value={
              props.sources.monsters.length ? (
                <span>
                  {props.sources.monsters.map((monster, index) => (
                    <Fragment>
                      <Link
                        key={monster.id}
                        href={routes.monster.path({
                          params: {
                            monsterId: monster.id,
                          },
                        })}
                      >
                        {monster.mvp ? '[MVP] ' : ''}
                        {monster.name} ({toPercentage(monster.chance, 1, 2)})
                      </Link>
                      {index < props.sources.monsters.length - 1 ? ', ' : ''}
                    </Fragment>
                  ))}
                </span>
              ) : (
                'N/A'
              )
            }
          />
          <Data
            wrap
            label={'Quest Reward'}
            value={
              props.sources.quests.length ? (
                <span>
                  {props.sources.quests.map((quest, index) => (
                    <Fragment>
                      <Link key={quest.id} href={routes.account.path()}>
                        {quest.name}
                      </Link>
                      {index < props.sources.quests.length - 1 ? ', ' : ''}
                    </Fragment>
                  ))}
                </span>
              ) : (
                'N/A'
              )
            }
          />
          <Data
            wrap
            label={'Obtainable From'}
            value={
              props.sources.items.length ? (
                <span>
                  {props.sources.items.map((item, index) => (
                    <Fragment>
                      <Link
                        key={item.id}
                        href={routes.item.path({
                          params: {
                            itemId: item.id,
                          },
                        })}
                      >
                        {item.name}
                      </Link>
                      {index < props.sources.items.length - 1 ? ', ' : ''}
                    </Fragment>
                  ))}
                </span>
              ) : (
                'N/A'
              )
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export const Data: React.FC<{
  label: string;
  value: string | number | ReactNode;
  wrap?: boolean;
  color?: PaletteColor;
}> = ({ label, value, color, wrap }) => (
  <Box
    component="div"
    sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', mobile2: '1fr 2fr' },
    }}
  >
    <DataCell
      fontWeight={900}
      variant="body2"
      sx={{
        borderRight: { xs: 'none', sm: '1px solid grey' },
        color: (theme) => theme.palette.text.blue.darker,
        backgroundColor: (theme) =>
          alpha(theme.palette.background['solid-blue'], 0.2),
      }}
    >
      {label}
    </DataCell>
    <DataCell
      component="span"
      wrap={wrap}
      variant="body3"
      sx={{
        color: (theme) =>
          color ? theme.palette[color].main : theme.palette.text.blue.darker,
      }}
    >
      {value}
    </DataCell>
  </Box>
);

export const DataCell = styled(
  (props: TypographyProps & { wrap?: boolean }) => (
    <Typography component="span" fontWeight={500} {...props} />
  ),
  {
    shouldForwardProp: (prop) => prop !== 'wrap',
  }
)(({ theme, wrap }) => ({
  width: '100%',
  ...(!wrap
    ? { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
    : {}),
  padding: theme.spacing(0.5, 1),
}));
