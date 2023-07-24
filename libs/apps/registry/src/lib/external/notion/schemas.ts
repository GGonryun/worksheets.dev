import { z } from '@worksheets/zod';

// Automatically generated from JSON Schemas:
//
// https://developers.notion.com/reference/get-users
// https://developers.notion.com/reference/get-self

export const personSchema = z.object({
  object: z.literal('user'),
  id: z.string().uuid(), // Assuming it's a valid UUID format
  type: z.literal('person'),
  person: z.object({
    email: z.string().email().optional(), // Assuming it's a valid email format
  }),
  name: z.string().optional(),
  avatarUrl: z.string().url().optional(), // Assuming it's a valid URL format
});

export const botSchema = z.object({
  object: z.literal('user'),
  id: z.string().uuid(), // Assuming it's a valid UUID format
  name: z.string().optional(),
  avatarUrl: z.string().optional(), // Avatar URL can be a string or null
  type: z.literal('bot'),
});

export const databaseSchema = z.object({
  id: z.string().uuid(), // Assuming it's a valid UUID format
  object: z.literal('database'),
  properties: z.record(
    z
      .object({
        id: z.string(),
        name: z.string().optional().nullable(),
        type: z.string().optional().nullable(),
      })
      .nonstrict()
  ),
});

export const createPageSchema = z.object({
  parent: z.object({
    databaseId: z.string(), // Assuming database_id is a string without a specific format
  }),
  icon: z
    .object({
      emoji: z.string(),
    })
    .nullable()
    .optional(),
  cover: z
    .object({
      external: z.object({
        url: z.string().url(), // Assuming it's a valid URL format
      }),
    })
    .nullable()
    .optional(),
  properties: z.record(z.any()),
});

export const pageSchema = z.object({
  object: z.literal('page'),
  id: z.string(),
});
