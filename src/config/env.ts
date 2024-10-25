import { z } from 'zod';

const envSchema = z.object({
  cloudinaryProfilePublicID: z.string(),
});

export type EnvSchema = z.infer<typeof envSchema>;

const envValues: EnvSchema = {
  cloudinaryProfilePublicID:
    process.env.NEXT_PUBLIC_CLOUDINARY_PROFILE_PUBLIC_ID!,
};

export const env = envSchema.safeParse(envValues).data;
