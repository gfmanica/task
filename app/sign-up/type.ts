import { z } from 'zod';

export const SignUpScheme = z
  .object({
    name: z.string().min(1, { message: 'Nome de usuário é obrigatório' }),
    password: z.string().min(1, { message: 'Senha é obrigatória' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirmação de senha é obrigatória' }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'As senhas não são iguais',
    path: ['confirmPassword'],
  });

export type TSignUp = z.infer<typeof SignUpScheme>;
