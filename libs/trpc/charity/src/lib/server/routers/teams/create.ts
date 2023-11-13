import { z } from '@worksheets/zod';
import { protectedProcedure } from '../../procedures/protected';
import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';

const form = z.object({
  name: z.string(),
  subdomain: z.string(),
  description: z.string().optional(),
});

type InputForm = z.infer<typeof form>;

const createSucceed = z.object({
  ok: z.literal(true),
  id: z.string(),
});

const createFailed = z.object({
  ok: z.literal(false),
  errors: z.object({
    name: z.string().optional(),
    subdomain: z.string().optional(),
    description: z.string().optional(),
    unknown: z.string().optional(),
  }),
});

const blockedSubdomains = [
  'official',
  'admin',
  'administrator',
  'auth',
  'www',
  'api',
  'app',
  'apps',
  'blog',
  'blogs',
  'community',
  'download',
  'downloads',
  'email',
  'mail',
  'emailus',
  'follow',
  'followers',
  'following',
  'ftp',
  'host',
  'hosting',
  'hostmaster',
  'http',
  'https',
  'imap',
  'info',
  'login',
  'logs',
  'marketing',
  'mine',
  'my',
  'news',
  'noreply',
  'null',
  'newsletter',
  'newsletters',
  'oauth',
  'pop',
  'pop3',
  'postmaster',
  'post',
  'postmaster',
  'prez',
  'price',
  'pricing',
  'promo',
  'pub',
  'public',
  'redirect',
  'register',
  'registration',
  'root',
  'rss',
  'sale',
  'sales',
  'shop',
  'signin',
  'signup',
  'security',
  'service',
  'ssl',
  'ssladmin',
  'ssladministrator',
  'sslwebmaster',
  'status',
  'store',
  'subscribe',
  'support',
  'sysadmin',
  'trial',
  'unsubscribe',
  'user',
  'users',
  'webmaster',
  'you',
  'yourname',
  'yoursite',
  'yourusername',
  'yourusername',
  'yourdomain',
  'yoursite',
  'yourwebsite',
  'yourcompany',
  'yoursite',
  'yourhost',
  'yourhostname',
  'yourusername',
  'yourusername',
  'yourdomain',
];

const blockedSubdomainPrefixes = ['mail', 'email', 'www', 'ns', 'static'];

const localSubdomains = ['localhost', 'local', 'dev', 'test', 'staging'];

const rules = [
  {
    name: 'Required',
    error: 'Name is required',
    property: 'name',
    predicate: (input: InputForm) => input.name === '',
  },
  {
    name: 'Too long',
    error: 'Name is too long',
    property: 'name',
    predicate: (input: InputForm) => input.name.length > 50,
  },
  {
    name: 'Too short',
    error: 'Name is too short',
    property: 'name',
    predicate: (input: InputForm) => input.name.length < 3,
  },
  {
    name: 'Required',
    error: 'Subdomain is required',
    property: 'subdomain',
    predicate: (input: InputForm) => input.subdomain === '',
  },
  {
    name: 'Blocked',
    error: 'Subdomain is not allowed',
    property: 'subdomain',
    predicate: (input: InputForm) =>
      blockedSubdomains.includes(input.subdomain),
  },
  {
    name: 'Blocked Prefix',
    error: 'Subdomain cannot start with a blocked prefix',
    property: 'subdomain',
    predicate: (input: InputForm) =>
      blockedSubdomainPrefixes.some((prefix) =>
        input.subdomain.startsWith(`${prefix}.`)
      ),
  },
  {
    name: 'Too long',
    error: 'Subdomain is too long',
    property: 'subdomain',
    predicate: (input: InputForm) => input.subdomain.length > 50,
  },
  {
    name: 'Too short',
    error: 'Subdomain is too short',
    property: 'subdomain',
    predicate: (input: InputForm) => input.subdomain.length < 3,
  },
  {
    name: 'Invalid',
    error: 'Subdomain may only contain lowercase letters, numbers, and dashes',
    property: 'subdomain',
    predicate: (input: InputForm) => !/^[a-z0-9-]+$/.test(input.subdomain),
  },
  {
    name: 'Too long',
    error: 'Description is too long',
    property: 'description',
    predicate: (input: InputForm) =>
      input.description && input.description?.length > 500,
  },
  {
    name: "Can't use local subdomain on production",
    error: 'Subdomain is not allowed',
    property: 'subdomain',
    predicate: (input: InputForm) =>
      process.env.VERCEL_ENV === 'production' &&
      localSubdomains.includes(input.subdomain),
  },
];

export default protectedProcedure
  .input(form)
  .output(z.union([createSucceed, createFailed]))
  .mutation(async ({ ctx: { user, db }, input }) => {
    for (const rule of rules) {
      if (rule.predicate(input)) {
        return {
          ok: false,
          errors: { [rule.property]: rule.error },
        };
      }
    }

    const id = await createTeamProcedure(db, input, user);

    return {
      ok: true,
      id,
    };
  });

const createTeamProcedure = async (
  db: PrismaClient,
  input: InputForm,
  user: User
) => {
  return await db.$transaction(async (tx) => {
    const team = await tx.team.create({
      select: {
        id: true,
      },
      data: {
        name: input.name,
        subdomain: input.subdomain,
        description: input.description,
      },
    });

    await tx.membership.create({
      select: {
        id: true,
      },
      data: {
        role: 'OWNER',
        teamId: team.id,
        userId: user.id,
      },
    });

    return team.id;
  });
};
