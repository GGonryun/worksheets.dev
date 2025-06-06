import { GameVisibility, Prisma, TeamMemberRole } from '@prisma/client';
import { keysOf } from '@worksheets/util/objects';
import { z } from 'zod';

import { userSchema } from './user';

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
  id: z
    .string()
    .min(3, {
      message: 'Game ID must be at least 3 characters.',
    })
    .regex(/^[a-z0-9-]+$/, {
      message:
        'Game ID can only contain lowercase letters, numbers, and hyphens.',
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
  id: '',
  title: '',
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

// {
//   facebook?: string;
//   twitter?: string;
//   instagram?: string;
//   youtube?: string;
//   twitch?: string;
//   pintrest?: string;
//   discord?: string;
//   linkedIn?: string;
//   itchio?: string;
//   tiktok?: string;
//   website?: string;
//   website2?: string;
//   steam?: string;
//   playstore?: string;
//   appstore?: string;
//   github?: string;
// }
export const socialLinksSchema = z.object({
  twitter: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  itchio: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  discord: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  website2: z.string().optional().nullable(),
  twitch: z.string().optional().nullable(),
  youtube: z.string().optional().nullable(),
  pintrest: z.string().optional().nullable(),
  tiktok: z.string().optional().nullable(),
  linkedIn: z.string().optional().nullable(),
  steam: z.string().optional().nullable(),
  playstore: z.string().optional().nullable(),
  appstore: z.string().optional().nullable(),
});

export type SocialLinksSchema = z.infer<typeof socialLinksSchema>;

export const socialLinksDefaultValues: SocialLinksSchema = {
  twitter: '',
  facebook: '',
  itchio: '',
  instagram: '',
  discord: '',
  github: '',
  twitch: '',
  pintrest: '',
  tiktok: '',
  website: '',
  youtube: '',
  linkedIn: '',
  website2: '',
  steam: '',
  playstore: '',
  appstore: '',
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
    id: z
      .string()
      .min(3, {
        message: 'Team Id must be at least 3 characters.',
      })
      .max(15, {
        message: 'Team Id must be at most 15 characters.',
      })
      .regex(/^[a-z0-9-]+$/, {
        message:
          'Team Id can only contain lowercase letters, numbers, hyphens, and underscores.',
      })
      .regex(/^(?!.*-{2,}).*$/, {
        message: 'Team Id must not contain more than 1 consecutive hyphen.',
      })
      .regex(/^(?!\s)(.*\S)?$/, {
        message: 'Team Id must not have leading or trailing spaces.',
      }),
  })
  .merge(editProfileFormSchema);

export type CreateProfileFormSchema = z.infer<typeof createProfileFormSchema>;

export const createProfileFormDefaultValues: CreateProfileFormSchema = {
  ...editProfileFormDefaultValues,
  id: '',
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
    members: z.number(),
    games: z.number(),
    links: socialLinksSchema,
  });

export type TeamSchema = z.infer<typeof teamSchema>;

export const parseTeam = (
  team: Prisma.TeamGetPayload<{
    include: {
      members: true;
      games: true;
    };
  }>
) => ({
  id: team.id,
  name: team.name,
  members: team.members.length,
  description: team.description,
  games: team.games.length,
  logo: team.logo,
  links: socialLinksSchema.parse(team.links),
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
  visibility: z.nativeEnum({ ...GameVisibility, DELETE: 'DELETE' as const }),
});
export type VisibilityFormSchema = z.infer<typeof visibilityFormSchema>;

export const visibilityFormDefaultValues: VisibilityFormSchema = {
  visibility: GameVisibility.PRIVATE,
};

export const teamMemberSchema = z.object({
  teamId: z.string(),
  userId: z.string(),
  user: userSchema,
  role: z.nativeEnum(TeamMemberRole),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TeamMemberSchema = z.infer<typeof teamMemberSchema>;

export const MEMBER_LABELS: Record<TeamMemberRole, string> = {
  OWNER: 'Owner',
  MANAGER: 'Manager',
  MEMBER: 'Member',
};

export const ROLE_SENSITIVITY: Record<TeamMemberRole, 'ADMIN' | 'STANDARD'> = {
  OWNER: 'ADMIN',
  MANAGER: 'ADMIN',
  MEMBER: 'STANDARD',
};

export const ADMIN_ROLES: TeamMemberRole[] = keysOf(ROLE_SENSITIVITY).filter(
  (role) => ROLE_SENSITIVITY[role] === 'ADMIN'
);

export const STANDARD_ROLES: TeamMemberRole[] = keysOf(ROLE_SENSITIVITY).filter(
  (role) => ROLE_SENSITIVITY[role] === 'STANDARD'
);

export const ROLE_VALUES: Record<TeamMemberRole, number> = {
  OWNER: 1,
  MANAGER: 2,
  MEMBER: 3,
};

export const adminsFirst = (a: TeamMemberSchema, b: TeamMemberSchema) => {
  const av = ROLE_VALUES[a.role];
  const bv = ROLE_VALUES[b.role];
  if (av === bv) {
    return a.user.email.localeCompare(b.user.email);
  }
  return av - bv;
};
