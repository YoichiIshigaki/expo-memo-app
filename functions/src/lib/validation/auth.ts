import { z } from 'zod';

const authPostRequest = z.object({
  email: z.string().email(),
  password: z.string(),
});
const authPutRequest = z.object({
  displayName: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  phoneNumber: z.string().optional(),
  emailVerified: z.boolean().optional(),
  disabled: z.boolean().optional(),
  photoURL: z.string().optional(),
});

// リクエストデータを検証
export const validateAuthPostRequest = (data: unknown) =>
  authPostRequest.safeParse(data);

export const validateAuthPutRequest = (data: unknown) =>
  authPutRequest.safeParse(data);
