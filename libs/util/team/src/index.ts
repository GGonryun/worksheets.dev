import { TeamMemberRole } from '@prisma/client';

export const protectedIds = [
  'create',
  'random',
  'list',
  'select',
  'selected',
  'profile',
  'links',
  'checkSlug',
  'slug',
  'files',
  'play',
  'category',
  'leaderboard',
  'leaderboards',
  'raffles',
  'raffle',
  'raffle-winners',
  'raffle-winner',
  'prizes',
  'prize',
  'account',
  'blog',
  'blog-posts',
  'developers',
  'help',
  'library',
  'preview',
  'ref',
  'tags',
  'widgets',
  'about',
  '404',
  '429',
  '500',
  'about',
  'contact',
  'cookies',
  'index',
  'login',
  'logout',
  'portal',
  'privacy',
  'signup',
  'styles',
  'terms',
  'admin',
  'administrator',
  'auth',
  'login',
  'logout',
  'signup',
  'register',
  'dashboard',
  'settings',
  'profile',
  'account',
  'user',
  'users',
  'me',
  'session',
  'sessions',
  'verify',
  'callback',
  'security',
  'api',
  'graphql',
  'rest',
  'webhook',
  'webhooks',
  'callback',
  'cron',
  'health',
  'metrics',
  'status',
  'config',
  'configuration',
  'setup',
  'internal',
  'system',
  'assets',
  'static',
  'cdn',
  'media',
  'uploads',
  'files',
  'home',
  'index',
  '404',
  'error',
  'about',
  'contact',
  'help',
  'support',
  'terms',
  'privacy',
  'tos',
  'faq',
  'legal',
  'docs',
  'documentation',
  'blog',
  'news',
  'press',
  'partners',
  'sponsors',
  'careers',
  'jobs',
  'pricing',
  'plans',
  'features',
  'roadmap',
  'root',
  'superuser',
  'null',
  'undefined',
  'true',
  'false',
  'new',
  'delete',
  'create',
  'update',
  'edit',
  'remove',
  'test',
  'testing',
  'dev',
  'development',
  'prod',
  'production',
  'staging',
  'charity',
  'donate',
  'donation',
  'fund',
  'fundraiser',
  'event',
  'events',
  'game',
  'games',
  'play',
  'leaderboard',
  'score',
  'stats',
  'ranking',
  'team',
  'teams',
  'google',
  'facebook',
  'meta',
  'apple',
  'microsoft',
  'github',
  'gitlab',
  'bitbucket',
  'linkedin',
  'twitter',
  'x',
  'instagram',
  'snapchat',
  'tiktok',
  'paypal',
  'stripe',
  'bank',
  'secure',
  'login-secure',
  'verify-account',
  'verification',
  'account-update',
  'support-center',
  'helpdesk',
  'customer-support',
  'signin',
  'sign-in',
  'signout',
  'sign-out',
  'password-reset',
  'reset-password',
  'authenticator',
  '2fa',
  'mfa',
  'ssl',
  'https',
  'http',
  'login-verification',
  'session-restore',
  'identity-check',
  'admin-login',
  'mod',
  'moderator',
  'sysadmin',
  'root-access',
  'sso',
  'oauth',
  'tokens',
  'jwt',
  'api-key',
  'client-secret',
  '.ftpconfig',
  '.env',
  '.env.local',
  'config.php',
  'phpmyadmin',
  'server-status',
  'robots.txt',
  'sitemap.xml',
  '.htaccess',
  '.vscode',
  '.git',
  '.gitignore',
  '.gitconfig',
  'node_modules',
  'package.json',
  'yarn.lock',
  'dockerfile',
  'redirect',
  'redirect-login',
  'refresh-token',
  'token',
  'callback',
  'return',
  'exit',
  'continue',
  'next',
  'previous',
  'back',
  'forward',
  'go',
  'admin',
  'superadmin',
  'moderator',
  'staff',
  'team',
  'owner',
  'devteam',
  'developer',
  'engineer',
  'support',
  'customer-care',
  'service',
  'billing',
  'accounts',
  'finance',
  'compliance',
  'legal',
  'sex',
  'sexy',
  'porn',
  'pornhub',
  'xxx',
  'nudes',
  'naked',
  'nude',
  'onlyfans',
  'cam',
  'cams',
  'webcam',
  'adult',
  'escort',
  'fetish',
  'nsfw',
  'strip',
  'strippers',
  'hookup',
  'dating',
  'hotgirls',
  'hotguys',
  'milf',
  'babes',
  'boobs',
  'ass',
  'dick',
  'penis',
  'vagina',
  'anal',
  'blowjob',
  'handjob',
  '69',
  'bdsm',
  'kink',
  'free-money',
  'win-big',
  'claim-prize',
  'earn-cash',
  'get-rich',
  'cashapp',
  'venmo',
  'paypal-giveaway',
  'crypto',
  'bitcoin',
  'crypto-giveaway',
  'invest-now',
  'double-your-money',
  'promo',
  'promocode',
  'giveaway',
  'bonus',
  'prize',
  'lottery',
  'sweepstakes',
  'delete-all',
  'drop-table',
  'shutdown',
  'format',
  'reboot',
  'kill',
  'rm-rf',
  'run-script',
  'bash',
  'exec',
  'eval',
  'import',
  'sudo',
  'exit',
  'command',
  'sql',
  'admin-panel',
];

export const MEMBERSHIP_PERMISSIONS: Record<
  TeamMemberRole,
  MemberPermission[]
> = {
  OWNER: [
    'team:read',
    'games:create',
    'games:read',
    'games:update',
    'games:delete',
    'members:create',
    'members:read',
    'members:update',
    'members:delete',
    'members:leave',
    'settings:update',
    'ownership:update',
    'team:delete',
  ],
  MANAGER: [
    'team:read',
    'games:create',
    'games:read',
    'games:update',
    'games:delete',
    'members:create',
    'members:read',
    'members:update',
    'members:delete',
    'members:leave',
    'settings:update',
  ],
  MEMBER: ['team:read', 'games:read', 'members:read', 'members:leave'],
};

export type MemberPermission =
  | 'team:read'
  | 'team:delete'
  | 'games:create'
  | 'games:read'
  | 'games:update'
  | 'games:delete'
  | 'members:create'
  | 'members:read'
  | 'members:update'
  | 'members:delete'
  | 'members:leave'
  | 'settings:update'
  | 'ownership:update';

export const MEMBERSHIP_LABELS: Record<MemberPermission, string> = {
  'team:read': 'View team details',
  'games:read': 'View games and information',
  'members:read': 'View team information',
  'games:create': 'Create new games',
  'games:update': 'Create, update, and delete games',
  'games:delete': 'Delete games',
  'members:create': 'Invite new team members',
  'members:update': 'Change member roles',
  'members:leave': 'Leave the team',
  'members:delete': 'Remove team members',
  'settings:update': 'Change team settings',
  'ownership:update': 'Transfer team ownership',
  'team:delete': 'Delete team',
};

export const HIDDEN_MEMBERSHIP_LABELS: MemberPermission[] = [
  'team:read',
  'games:create',
  'games:delete',
  'members:leave',
  'settings:update',
];
