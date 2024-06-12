import { z } from 'zod';

export const TaskScheme = z.object({
  id: z.number().nullish(),
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
  link: z.string().url({ message: 'Link inválido' }),
  status: z.object(
    {
      id: z.string(),
      status: z.string(),
    },
    { message: 'Status é obrigatório' },
  ),
  // users: z
  //   .array(
  //     z.object({
  //       id: z.number(),
  //       name: z.string(),
  //       role: z.object({
  //         id: z.string(),
  //         role: z.string(),
  //       }),
  //     }),
  //   )
  //   .min(1, { message: 'Usuários é obrigatório' }),
});

export type TTask = z.infer<typeof TaskScheme>;
