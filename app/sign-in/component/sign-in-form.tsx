'use client';

import { useMutate } from '@/hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, Input, Link } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { SignInScheme, TSignIn } from '../type';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function SignInForm() {
  const { isMutating, onMutate } = useMutate<TSignIn>({ url: '/api/user' });
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignIn>({
    resolver: zodResolver(SignInScheme),
  });

  return (
    <form onSubmit={handleSubmit(onMutate)} className="flex flex-col gap-4">
      <Input
        {...register('name')}
        variant="bordered"
        label="Nome de usuário"
        isDisabled={isMutating}
        isInvalid={Boolean(errors.name)}
        errorMessage={errors.name?.message}
      />

      <Input
        {...register('password')}
        variant="bordered"
        label="Senha"
        type={isVisible ? 'text' : 'password'}
        isDisabled={isMutating}
        isInvalid={Boolean(errors.password)}
        errorMessage={errors.password?.message}
        endContent={
          <Button
            className="focus:outline-none"
            variant="light"
            size="sm"
            onClick={() => setIsVisible((isVisible) => !isVisible)}
            isIconOnly
          >
            {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </Button>
        }
      />

      <Divider />

      <p className="text-sm">
        Não possui uma conta? <Link href="/sign-up">cadastre-se</Link>
      </p>

      <Button type="submit" color="primary" isLoading={isMutating}>
        Entrar
      </Button>
    </form>
  );
}
