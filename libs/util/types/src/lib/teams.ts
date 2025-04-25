import { GameVisibility } from '@prisma/client';
import { z } from 'zod';

export const gameDeviceSchema = z.union([
  z.literal('COMPUTER'),
  z.literal('MOBILE'),
]);
export type GameDeviceSchema = z.infer<typeof gameDeviceSchema>;

export const gameOrientationSchema = z.union([
  z.literal('PORTRAIT'),
  z.literal('LANDSCAPE'),
]);
export type GameOrientationSchema = z.infer<typeof gameOrientationSchema>;

export const gameViewportSchema = z.literal('RESPONSIVE');
export type GameViewportSchema = z.infer<typeof gameViewportSchema>;

export const detailsFormSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must be at least 3 characters.',
  }),
  slug: z
    .string()
    .min(3, {
      message: 'Slug must be at least 3 characters.',
    })
    .regex(/^[a-z0-9-]+$/, {
      message: 'Slug can only contain lowercase letters, numbers, and hyphens.',
    }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  tags: z.array(z.string()).min(1, {
    message: 'Select at least one tag.',
  }),
  viewport: gameViewportSchema,
  orientation: gameOrientationSchema.array().min(1, {
    message: 'Select at least one orientation.',
  }),
  devices: gameDeviceSchema.array().min(1, {
    message: 'Select at least one device.',
  }),
  aiDisclosure: z.boolean(),
});

export type DetailsFormSchema = z.infer<typeof detailsFormSchema>;

export const DEVICE_VALUES: {
  label: string;
  value: GameDeviceSchema;
}[] = [
  { label: 'Desktop', value: 'COMPUTER' },
  { label: 'Mobile', value: 'MOBILE' },
];

export const ORIENTATION_VALUES: {
  label: string;
  value: GameOrientationSchema;
}[] = [
  { label: 'Portrait', value: 'PORTRAIT' },
  { label: 'Landscape', value: 'LANDSCAPE' },
];

export const detailsFormDefaultValues: DetailsFormSchema = {
  title: '',
  slug: '',
  description: '',
  tags: [],
  viewport: 'RESPONSIVE',
  orientation: ORIENTATION_VALUES.map((orientation) => orientation.value),
  devices: DEVICE_VALUES.map((device) => device.value),
  aiDisclosure: false,
};

export const mediaFormSchema = z.object({
  thumbnail: z.string().min(1, {
    message: 'Thumbnail is required',
  }),
  coverImage: z.string().min(1, {
    message: 'Cover image is required',
  }),
  trailerUrl: z.string().url().optional().or(z.literal('')),
});

export type MediaFormSchema = z.infer<typeof mediaFormSchema>;

export const mediaFormDefaultValues: MediaFormSchema = {
  thumbnail: '',
  coverImage: '',
  trailerUrl: '',
};

export const filePreviewSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
});

export type FilePreviewSchema = z.infer<typeof filePreviewSchema>;
export const EMPTY_FILE_PREVIEW: FilePreviewSchema = {
  name: '',
  size: 0,
  type: '',
};

export const versionFormSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/, {
    message: 'Version must be in format x.y.z (e.g., 1.0.0)',
  }),
  gameFile: z.string().min(1, {
    message: 'Game file is required',
  }),
  notes: z.string().optional(),
  preview: filePreviewSchema,
});

export type VersionFormSchema = z.infer<typeof versionFormSchema>;

export const versionFormDefaultValues: VersionFormSchema = {
  version: '',
  gameFile: '',
  preview: {
    name: '',
    size: 0,
    type: '',
  },
  notes: '',
};

export const createGameFormSchema = detailsFormSchema
  .merge(mediaFormSchema)
  .merge(versionFormSchema);
export type CreateGameFormSchema = z.infer<typeof createGameFormSchema>;

export const createGameFormDefaultValues = {
  ...detailsFormDefaultValues,
  ...mediaFormDefaultValues,
  ...versionFormDefaultValues,
};

export const socialLinksSchema = z.object({
  twitter: z.string(),
  facebook: z.string(),
  itchio: z.string(),
  instagram: z.string(),
  discord: z.string(),
});

export type SocialLinksSchema = z.infer<typeof socialLinksSchema>;

export const socialLinksDefaultValues: SocialLinksSchema = {
  twitter: '',
  facebook: '',
  itchio: '',
  instagram: '',
  discord: '',
};

export const editProfileFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .max(50, {
      message: 'Name must be at most 50 characters.',
    })
    .regex(/^(?=.*[a-zA-Z0-9]).*$/, {
      message: 'Name must contain at least one letter or number.',
    })
    .regex(/^(?!.*[!@#$%^&*()_+={}[\]:;"'<>,.?~`-]{4,}).*$/, {
      message:
        'Name must not contain more than 3 consecutive special characters.',
    })
    .regex(/^(?!.* {3,}).*$/, {
      message: 'Name must not contain more than 2 consecutive spaces.',
    })
    // name must not have trailing or leading spaces.
    .regex(/^(?!\s)(.*\S)?$/, {
      message: 'Name must not have leading or trailing spaces.',
    }),

  description: z
    .string()
    .min(1, {
      message: 'Description is required',
    })
    .max(250, {
      message: 'Description must be at most 250 characters.',
    }),
  logo: z.string().min(1, {
    message: 'Logo is required',
  }),
});

export type EditProfileFormSchema = z.infer<typeof editProfileFormSchema>;

export const editProfileFormDefaultValues: EditProfileFormSchema = {
  name: '',
  description: '',
  logo: '',
};

export const createProfileFormSchema = z
  .object({
    slug: z
      .string()
      .min(3, {
        message: 'Slug must be at least 3 characters.',
      })
      .max(15, {
        message: 'Slug must be at most 15 characters.',
      })
      .regex(/^[a-z0-9-]+$/, {
        message:
          'Slug can only contain lowercase letters, numbers, hyphens, and underscores.',
      })
      .regex(/^(?!.*-{2,}).*$/, {
        message: 'Slug must not contain more than 1 consecutive hyphen.',
      })
      .regex(/^(?!\s)(.*\S)?$/, {
        message: 'Slug must not have leading or trailing spaces.',
      }),
  })
  .merge(editProfileFormSchema);

export type CreateProfileFormSchema = z.infer<typeof createProfileFormSchema>;

export const createProfileFormDefaultValues: CreateProfileFormSchema = {
  ...editProfileFormDefaultValues,
  slug: '',
};

export const createTeamSchema = z
  .object({
    termsOfService: z.boolean().refine((val) => val, {
      message: 'You must accept the Terms of Service.',
    }),
    privacyPolicy: z.boolean().refine((val) => val, {
      message: 'You must accept the Privacy Policy.',
    }),
    submissionPolicies: z.boolean().refine((val) => val, {
      message: 'You must accept the Submission Policies.',
    }),
    links: socialLinksSchema,
  })
  .merge(createProfileFormSchema);

export const createTeamDefaultValues: CreateTeamSchema = {
  termsOfService: false,
  privacyPolicy: false,
  submissionPolicies: false,
  links: socialLinksDefaultValues,
  ...createProfileFormDefaultValues,
};

export type CreateTeamSchema = z.infer<typeof createTeamSchema>;

export const teamSchema = createTeamSchema
  .omit({
    termsOfService: true,
    privacyPolicy: true,
    submissionPolicies: true,
  })
  .extend({
    id: z.string(),
    slug: z.string(),
    members: z.number(),
    games: z.number(),
    links: socialLinksSchema,
  });

export const gameFileMetadataSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
});

const gameFileUploaderSchema = z.object({
  id: z.string(),
  username: z.string(),
});

export const gameFileSchema = z.object({
  id: z.string(),
  gameId: z.string(),
  error: z.string(),
  version: z.string(),
  notes: z.string(),
  createdAt: z.string(),
  isCurrent: z.boolean(),
  metadata: gameFileMetadataSchema,
  uploader: gameFileUploaderSchema,
});

export type GameFileSchema = z.infer<typeof gameFileSchema>;

export const visibilityFormSchema = z.object({
  visibility: z.nativeEnum(GameVisibility),
});
export type VisibilityFormSchema = z.infer<typeof visibilityFormSchema>;

export const visibilityFormDefaultValues: VisibilityFormSchema = {
  visibility: GameVisibility.PRIVATE,
};
