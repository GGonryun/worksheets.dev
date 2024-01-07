import { DEFAULT_VALUES, FormContextType } from '../game-submission-screen';
import { action } from '@storybook/addon-actions';

export const defaultValues: FormContextType = {
  ...DEFAULT_VALUES,
  onSubmit: action('onSubmit'),
  setFieldValue: action('setFieldValue'),

  uploadThumbnail: (req) =>
    new Promise((resolve) => {
      console.log('uploadThumbnail', req);
      action('uploadThumbnail')(req);
      setTimeout(() => resolve(), 3000);
    }),
  deleteThumbnail: (req) =>
    new Promise((resolve) => {
      action('deleteThumbnail')(req);
      setTimeout(() => resolve(), 3000);
    }),

  uploadCover: (req) =>
    new Promise((resolve) => {
      action('uploadCover')(req);
      setTimeout(() => resolve(), 3000);
    }),
  deleteCover: (req) =>
    new Promise((resolve) => {
      action('deleteCover')(req);
      setTimeout(() => resolve(), 3000);
    }),

  uploadScreenshots: (files) => {
    return new Promise((resolve) => {
      action('uploadScreenshots')(files);
      setTimeout(() => resolve(), 3000);
    });
  },
  deleteScreenshot: (req) =>
    new Promise((resolve) => {
      action('deleteScreenshot')(req);
      setTimeout(() => resolve(), 3000);
    }),

  uploadGame: (req) =>
    new Promise((resolve) => {
      console.log('uploadGame', req);
      action('uploadGame')(req);
      setTimeout(() => resolve(), 3000);
    }),
  deleteGame: (req) =>
    new Promise((resolve) => {
      action('deleteGame')(req);
      setTimeout(() => resolve(), 3000);
    }),
};
