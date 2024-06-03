import { z } from 'zod';

export const SignInScheme = z.object({
  name: z.string().min(1, { message: 'Nome de usuário é obrigatório' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
});

export type TSignIn = z.infer<typeof SignInScheme>;
