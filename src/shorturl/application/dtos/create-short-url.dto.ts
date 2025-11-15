import z from 'zod';

export const createShortUrlDto = z.object({
  originalUrl: z.string(),
  name: z.string().min(1).max(50),
});

export type CreateShortUrlDto = z.infer<typeof createShortUrlDto>;
