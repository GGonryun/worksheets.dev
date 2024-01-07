import { z } from '@worksheets/zod';

const reservedUsernames = [
  'charity-games',
  'charity_games',
  'charitygames',
  'admin',
  'administrator',
  'moderator',
  'staff',
  'support',
  'help',
  'root',
  'system',
  'superuser',
  'webmaster',
  'owner',
  'developer',
  'test',
  'testuser',
  'guest',
  'anonymous',
  'banned',
  'blocked',
  'hacker',
  'cheater',
  'bot',
  'spam',
  'phishing',
  'scammer',
  'fraud',
  'illegal',
  'violence',
  'hate',
  'racist',
  'sexist',
  'offensive',
  'porn',
  'drugs',
  'gambling',
  'money',
  'password',
  '123456',
  'qwerty',
  'abc123',
  'letmein',
  'admin123',
  'password123',
  '123456789',
  'iloveyou',
  'welcome',
  'login',
  'logout',
  'register',
  'username',
  'email',
  'contact',
  'about',
  'privacy',
  'terms',
  'policy',
  'cookie',
  'security',
  'account',
  'profile',
  'settings',
  'notifications',
  'inbox',
  'messages',
  'friends',
  'followers',
  'following',
  'leaderboard',
  'achievements',
  'stats',
  'score',
  'game',
  'gamer',
  'gaming',
  'player',
  'proplayer',
  'noob',
  'newbie',
  'beginner',
  'veteran',
  'master',
  'legend',
  'champion',
  'winner',
  'loser',
  'coolguy',
  'coolgirl',
  'awesome',
  'epic',
  'legendary',
  'ninja',
  'savage',
  'killer',
  'sniper',
  'warrior',
  'wizard',
  'mage',
  'hunter',
  'thief',
  'assassin',
  'paladin',
  'knight',
  'warlock',
  'priest',
  'healer',
  'tank',
  'dps',
  'support',
  'ranger',
  'archer',
  'gunner',
  'brawler',
  'fighter',
  'swordsman',
  'necromancer',
  'summoner',
  'elementalist',
  'shaman',
  'druid',
  'bard',
  'trickster',
  'jester',
  'cleric',
  'monk',
  'samurai',
  'ninja',
  'pirate',
  'viking',
  'gladiator',
  'spartan',
  'kungfu',
  'martialarts',
  'ninja',
  'cyber',
  'tech',
  'geek',
  'nerd',
];

export const basicInformationFormSchema = z.object({
  username: z
    .string()
    .min(4, `Username must be at least 4 characters.`)
    .max(20, `Username cannot be more than 20 characters.`)
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      `Username can only contain letters, numbers, dashes, and underscores.`
    )
    .refine(
      (value) => !reservedUsernames.includes(value),
      `Username is reserved. Please try another one.`
    )
    .refine(
      (value) => !value.startsWith('-') && !value.endsWith('-'),
      `Username cannot start or end with a dash.`
    )
    .refine(
      (value) => !value.startsWith('_') && !value.endsWith('_'),
      `Username cannot start or end with an underscore.`
    )
    .refine(
      // username must have at least one letter
      (value) => /[a-zA-Z]/.test(value),
      `Username must contain at least one letter.`
    ),
  bio: z
    .string()
    .max(160, `Bio cannot be more than 160 characters.`)
    .refine(
      (value) => !value.length || value.length >= 10,
      `Bio must be at least 10 characters.`
    )
    .nullable(),
});

export type BasicInformationForm = z.infer<typeof basicInformationFormSchema>;

export type BasicInformationFormErrors = Record<
  BasicInformationFormKeys,
  string
>;

export type BasicInformationFormKeys = keyof BasicInformationForm;

export type BasicInformationFormContextType = {
  errors: BasicInformationFormErrors;
  values: BasicInformationForm;
  isValid: () => boolean;
  isUpdated: () => boolean;
  onSubmit: () => void;
  setFieldValue: <T extends BasicInformationFormKeys>(
    field: T,
    value: BasicInformationForm[T]
  ) => void;
};
