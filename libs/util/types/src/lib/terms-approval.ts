import { z } from '@worksheets/zod';

export const termsApprovalSchema = z.object({
  hasApproved: z.boolean(),
  canApprove: z.boolean(),
});

export type TermsApproval = z.infer<typeof termsApprovalSchema>;
