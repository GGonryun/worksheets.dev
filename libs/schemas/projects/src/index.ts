import { z } from '@worksheets/zod';

// TODO: this global maximum won't suffice for long.
export const MAX_USER_PROJECTS = 20;

export type ProjectFeatures = z.infer<typeof projectFeaturesSchema>;
export const projectFeaturesSchema = z.enum([
  'tasks',
  'services',
  'vault',
  'connections',
  'converter',
  'events',
]);

export type ProjectEntity = z.infer<typeof projectEntitySchema>;
export const projectEntitySchema = z.object({
  id: z.string(),
  uid: z.string().describe("owner's user id"),
  title: z.string(),
  features: z.array(projectFeaturesSchema),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type ProjectBasics = z.infer<typeof projectBasicsSchema>;
export const projectBasicsSchema = z.object({
  id: z.string(),
  title: z.string(),
  domain: z.string().optional(),
  features: z.array(projectFeaturesSchema),
});

export type ListProjectsRequest = z.infer<typeof listProjectsRequestSchema>;
export const listProjectsRequestSchema = z.object({});

export type ListProjectsResponse = z.infer<typeof listProjectsResponseSchema>;
export const listProjectsResponseSchema = z.object({
  projects: z.array(projectBasicsSchema),
  max: z.number(),
});

export type CreateProjectRequest = z.infer<typeof createProjectRequestSchema>;
export const createProjectRequestSchema = z.object({
  id: z.string(),
  title: z.string(),
  features: z.array(projectFeaturesSchema),
});

export type CreateProjectResponse = z.infer<typeof createProjectResponseSchema>;
export const createProjectResponseSchema = z.object({
  project: projectBasicsSchema,
});

export const defaultCreateProjectRequest: CreateProjectRequest = {
  title: '',
  id: '',
  features: ['connections', 'services'],
};

export const projectNameValidationRules = [
  {
    name: 'Project name must be at least 3 characters long.',
    isValid: (name: string) => name.length >= 3,
  },
  {
    name: 'Project name must be less than 40 characters long.',
    isValid: (name: string) => name.length <= 40,
  },
  {
    name: 'Project name can only contain spaces, letters, numbers, and dashes.',
    isValid: (name: string) => /^[a-zA-Z0-9- ]*$/.test(name),
  },
  {
    name: 'Project name cannot end with a space.',
    isValid: (name: string) => !/ $/.test(name),
  },
  {
    name: 'Project name must start with a letter.',
    isValid: (name: string) => /^[a-zA-Z]/.test(name),
  },
  {
    name: 'Project name cannot end with a dash.',
    isValid: (name: string) => !/-$/.test(name),
  },
  {
    name: 'Project name cannot contain consecutive dashes.',
    isValid: (name: string) => !/--/.test(name),
  },
  {
    name: "Project cannot be named 'new'.",
    isValid: (name: string) => name !== 'new',
  },
  {
    name: "Project cannot be named 'create'.",
    isValid: (name: string) => name !== 'create',
  },
  {
    name: "Project cannot be named 'projects'.",
    isValid: (name: string) => name !== 'projects',
  },
  {
    name: "Project cannot be named 'applications'.",
    isValid: (name: string) => name !== 'applications',
  },
];

export const bannedProjectIds = [
  'api',
  'app',
  'test',
  'www',
  'new',
  'create',
  'projects',
  'applications',
  'connections',
  'services',
  'vault',
  'analytics',
  'admin',
  'dashboard',
  'login',
  'register',
  'logout',
  'auth',
  'blog',
  'docs',
  'help',
  'support',
  'status',
  'about',
  'contact',
  'pricing',
  'terms',
  'privacy',
  'legal',
  'tos',
  'faq',
  'jobs',
  'careers',
];
export const projectIdValidationRules = [
  {
    name: 'Identifier must be longer than 3 characters',
    test: (id: string) => id.length >= 3,
  },
  {
    name: 'Identifier must be shorter than 20 characters',
    test: (id: string) => id.length <= 20,
  },
  {
    name: 'Identifier characters must be lowercase',
    test: (id: string) => id === id.toLowerCase(),
  },
  {
    name: 'Identifier cannot be a reserved word',
    test: (id: string) => !bannedProjectIds.includes(id),
  },
  {
    name: 'Identifier must only contain letters, numbers, and dashes',
    test: (id: string) => /^[a-z0-9-]*$/.test(id),
  },
  {
    name: 'Identifier must start with a letter',
    test: (id: string) => /^[a-z]/.test(id),
  },
  {
    name: 'Identifier cannot end with a dash',
    test: (id: string) => !/-$/.test(id),
  },
  {
    name: 'Identifier cannot contain two dashes in a row',
    test: (id: string) => !/--/.test(id),
  },
];
