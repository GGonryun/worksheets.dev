'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormProvider,
  useForm,
  useFormContext,
  UseFormReturn,
  useWatch,
} from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MediaUploader } from './media-uploader';
import { FileRequirements } from './file-requirements';
import NextImage from 'next/image';
import { Trash, Trash2Icon, ZoomInIcon } from 'lucide-react';
import {
  dimensionsConstraint,
  fileSchema,
  sizeConstraint,
  typeConstraint,
} from './util';
import { cn } from '../utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui';
import {
  ContainImage,
  CoverImage,
  FillImage,
} from '@worksheets/ui/components/images';

const MAX_BASIC_IMAGE_SIZE = 1.5 * 1024 * 1024; // 1.5MB
const MAX_SCREENSHOT_SIZE = 5 * 1024 * 1024; // 5MB
const VALID_BASIC_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
const VALID_SCREENSHOT_TYPES = [...VALID_BASIC_IMAGE_TYPES, 'image/gif'];
const MAX_SCREENSHOTS = 5;

const basicImageSchema = fileSchema
  .refine(sizeConstraint(MAX_BASIC_IMAGE_SIZE), {
    message: 'File must be smaller than 1.5MB',
  })
  .refine(typeConstraint(VALID_BASIC_IMAGE_TYPES), {
    message: 'Only PNG or JPG files are allowed',
  });

export const mediaFormSchema = z.object({
  thumbnail: basicImageSchema
    .refine(dimensionsConstraint({ width: 300, height: 300 }), {
      message: 'Image must be at least 300x300 pixels',
    })
    .array(),
  coverImage: basicImageSchema
    .refine(dimensionsConstraint({ width: 640 }), {
      message: 'Image must be at least 640 pixels wide',
    })
    .refine(dimensionsConstraint({ height: 360 }), {
      message: 'Image must be at least 360 pixels tall',
    })
    .array(),
  screenshots: fileSchema
    .refine(dimensionsConstraint({ width: 300, height: 300 }), {
      message: 'Image must be at least 300x300 pixels',
    })
    .refine(sizeConstraint(MAX_SCREENSHOT_SIZE), {
      message: 'File must be smaller than 5MB',
    })
    .refine(typeConstraint(VALID_SCREENSHOT_TYPES), {
      message: 'Only PNG, JPG, or GIF files are allowed',
    })
    .array()
    .optional(),
  trailerUrl: z.string().url().optional().or(z.literal('')),
});

export type MediaFormSchema = z.infer<typeof mediaFormSchema>;

export const MediaForm = ({
  gameId,
  onSave,
}: {
  gameId: string;
  onSave?: () => void;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | undefined>(
    undefined
  );
  const [coverImagePreview, setCoverImagePreview] = useState<
    string | undefined
  >(undefined);
  const [screenshotsPreview, setScreenshotsPreview] = useState<string[]>([]);

  const form = useForm<MediaFormSchema>({
    resolver: zodResolver(mediaFormSchema),
    mode: 'onChange',
    defaultValues: {
      thumbnail: [],
      coverImage: [],
      screenshots: [],
      trailerUrl: '',
    },
  });

  const thumbnail = useWatch({
    control: form.control,
    name: 'thumbnail',
  });

  useEffect(() => {
    console.error('thumbnail changed', thumbnail);
  }, [thumbnail]);

  // Load game data if editing
  // useEffect(() => {
  //   if (gameId) {
  //     // In a real app, you would fetch the game data from an API
  //     // For this example, we'll use mock data
  //     form.reset({
  //       trailerUrl: mockGame.trailerUrl,
  //     });
  //     setThumbnailPreview(mockGame.thumbnail);
  //     setCoverImagePreview(mockGame.coverImage);
  //     setScreenshotsPreview(mockGame.screenshots);
  //   }
  // }, [gameId, form]);

  // Handle form submission
  function onSubmit(values: z.infer<typeof mediaFormSchema>) {
    setIsLoading(true);

    // In a real app, you would send the data to an API
    console.log(values);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onSave) {
        onSave();
      }
    }, 1000);
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <MediaFormFields
            screenshotsPreview={screenshotsPreview}
            thumbnailPreview={thumbnailPreview}
            coverImagePreview={coverImagePreview}
          />

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push('/dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Update Media'}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export const MediaFormFields: React.FC<{
  thumbnailPreview?: string;
  coverImagePreview?: string;
  screenshotsPreview?: string[];
}> = ({ thumbnailPreview, coverImagePreview, screenshotsPreview }) => {
  const form = useFormContext<MediaFormSchema>();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="thumbnail"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>
              Thumbnail Image <span className="text-red-500">*</span>
            </FormLabel>
            {!thumbnailPreview && (
              <FormControl>
                <MediaUploader
                  value={field.value ?? []}
                  onChange={field.onChange}
                  type="image"
                  label="Upload thumbnail image"
                  fileTypes={VALID_BASIC_IMAGE_TYPES}
                />
              </FormControl>
            )}
            {!field.value?.length && (
              <FileRequirements
                title="Thumbnail Requirements"
                description="This is the main image that will represent your game on the
                platform."
                items={[
                  'Must be at least 300x300 pixels.',
                  'PNG or JPG format only.',
                  'Maximum file size: 1.5MB.',
                ]}
              />
            )}
            {thumbnailPreview && (
              <ImagePreview
                url={thumbnailPreview}
                onRemove={() => {
                  field.onChange([]);
                }}
              />
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="coverImage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Cover Image <span className="text-red-500">*</span>
            </FormLabel>
            {!coverImagePreview && (
              <FormControl>
                <MediaUploader
                  value={field.value ?? []}
                  onChange={field.onChange}
                  type="image"
                  label="Upload cover image"
                  fileTypes={VALID_BASIC_IMAGE_TYPES}
                />
              </FormControl>
            )}
            {!field.value?.length && (
              <FileRequirements
                title="Cover Image Requirements"
                description="This image will be displayed when your game is shared on social media and when featured on the home screen."
                items={[
                  'Minimum dimensions: Height - 360px, Width - 640px',
                  'Recommended 16:9 format',
                  'PNG or JPG format only',
                  'Maximum file size: 1.5MB',
                ]}
              />
            )}
            {coverImagePreview && (
              <ImagePreview
                url={coverImagePreview}
                onRemove={() => {
                  field.onChange([]);
                }}
              />
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="screenshots"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Screenshots</FormLabel>

            <FormControl>
              <MultiImagePreview
                urls={screenshotsPreview ?? []}
                onPreview={() => {}}
                onRemove={(i) => {
                  const newValue = field.value?.filter(
                    (_, index) => index !== i
                  );
                  console.log('New value', newValue);
                  field.onChange(newValue ?? []);
                }}
                add={
                  <MediaUploader
                    value={field.value ?? []}
                    onChange={field.onChange}
                    type="image"
                    label="Upload screenshots"
                    max={MAX_SCREENSHOTS}
                    fileTypes={VALID_SCREENSHOT_TYPES}
                  />
                }
              />
            </FormControl>
            <FormMessage />

            {(!field.value || field.value?.length < MAX_SCREENSHOTS) && (
              <FileRequirements
                title="Screenshot Requirements"
                description="These images will be displayed in the game details page and in marketing materials."
                items={[
                  'Images should show accurate gameplay and be visually appealing.',
                  'Images must be at least 300x300 pixels.',
                  'PNG or JPG format only',
                  'Maximum file size: 5MB',
                ]}
              />
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="trailerUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Trailer URL</FormLabel>
            <FormControl>
              <Input
                placeholder="https://www.youtube.com/watch?v=..."
                {...field}
              />
            </FormControl>
            <FormDescription>
              Link to a gameplay video or trailer on YouTube or Vimeo.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const ImagePreview: React.FC<{
  url: string;
  onRemove: () => void;
  alt?: string;
}> = ({ url, onRemove, alt }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <div className="relative rounded-lg border overflow-hidden aspect-video max-w-96">
        <NextImage
          src={url || '/placeholder.svg'}
          alt={alt || 'Preview'}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 flex items-center justify-center gap-2">
          <Button
            size="icon"
            className=" h-8 w-8"
            onClick={() => setShowPreview(true)}
            type="button"
          >
            <ZoomInIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className=" h-8 w-8"
            onClick={() => onRemove()}
            type="button"
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <PreviewDialog
        showDialog={!!showPreview}
        url={url}
        setShowDialog={() => setShowPreview(false)}
      />
    </>
  );
};

const MultiImagePreview: React.FC<{
  urls: string[];
  onRemove: (index: number) => void;
  onPreview: (index: number) => void;
  add: ReactNode;
}> = ({ urls, onRemove, onPreview, add }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4',
        urls.length ? 'md:grid-cols-2' : ''
      )}
    >
      {urls.map((url, index) => (
        <ImagePreview
          key={index}
          url={url}
          onRemove={() => onRemove(index)}
          alt={`Screenshot ${index + 1}`}
        />
      ))}
      {add}
    </div>
  );
};

const PreviewDialog: React.FC<{
  showDialog: boolean;
  url?: string;
  setShowDialog: () => void;
}> = ({ showDialog, url, setShowDialog }) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <div className="relative w-full h-72 md:h-96">
          <ContainImage src={url || '/placeholder.svg'} alt={'Image Preview'} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
