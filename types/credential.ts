import { z } from "zod";

export const createCredentialSchema = z.object({
  name: z.string().max(30),
  value: z.string().max(500),
});

export type TCreateCredentialSchema = z.infer<typeof createCredentialSchema>;
