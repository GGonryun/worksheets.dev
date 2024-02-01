import { GameSchema, ViewportKeys } from '@worksheets/util/types';

export const viewports: Record<ViewportKeys, GameSchema['viewport']> = {
  'ALL-DEVICES': {
    id: 'ALL-DEVICES',
    type: 'RESPONSIVE',
    devices: ['COMPUTER', 'MOBILE'],
    orientations: ['LANDSCAPE', 'PORTRAIT'],
  },
  'COMPUTER-ONLY': {
    id: 'COMPUTER-ONLY',
    type: 'RESPONSIVE',
    devices: ['COMPUTER'],
    orientations: ['LANDSCAPE', 'PORTRAIT'],
  },
  'DESKTOP-PORTRAIT': {
    id: 'DESKTOP-PORTRAIT',
    type: 'RESPONSIVE',
    devices: ['COMPUTER'],
    orientations: ['PORTRAIT'],
  },
  'DESKTOP-LANDSCAPE': {
    id: 'DESKTOP-LANDSCAPE',
    type: 'RESPONSIVE',
    devices: ['COMPUTER'],
    orientations: ['LANDSCAPE'],
  },
  'MOBILE-ONLY': {
    id: 'MOBILE-ONLY',
    type: 'RESPONSIVE',
    devices: ['MOBILE'],
    orientations: ['LANDSCAPE', 'PORTRAIT'],
  },
  'MOBILE-LANDSCAPE': {
    id: 'MOBILE-LANDSCAPE',
    type: 'RESPONSIVE',
    devices: ['MOBILE'],
    orientations: ['LANDSCAPE'],
  },
  'MOBILE-PORTRAIT': {
    id: 'MOBILE-PORTRAIT',
    type: 'RESPONSIVE',
    devices: ['MOBILE'],
    orientations: ['PORTRAIT'],
  },
  'LANDSCAPE-ONLY': {
    id: 'LANDSCAPE-ONLY',
    type: 'RESPONSIVE',
    devices: ['COMPUTER', 'MOBILE'],
    orientations: ['LANDSCAPE'],
  },
  'PORTRAIT-ONLY': {
    id: 'PORTRAIT-ONLY',
    type: 'RESPONSIVE',
    devices: ['COMPUTER', 'MOBILE'],
    orientations: ['PORTRAIT'],
  },
};
