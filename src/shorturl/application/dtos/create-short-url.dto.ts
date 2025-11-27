import z from 'zod';

export const createShortUrlInputDto = z.object({
  originalUrl: z.string(),
  name: z.string().min(1).max(50),
});

export const createShortUrlUseCaseInputDto = createShortUrlInputDto.extend({
  createdBy: z.string().min(1),
  createdByOrganization: z.string(),
});

export type CreateShortUrlInputDto = z.infer<typeof createShortUrlInputDto>;
export type CreateShortUrlUseCaseInputDto = z.infer<
  typeof createShortUrlUseCaseInputDto
>;
