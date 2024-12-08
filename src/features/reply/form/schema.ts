import { z } from 'zod';

export const schema = z.object({
  content: z
    .string({ required_error: 'Reply cannot be empty' })
    .min(1, 'Reply cannot be empty'),
});

export type ReplyInput = z.infer<typeof schema>;
