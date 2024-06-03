'use client';

import { useMutate } from '@/hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { SignUpScheme, TSignUp } from '../type';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SignUpForm() {
  const { push } = useRouter();

  const { isMutating, onMutate } = useMutate<TSignUp>({
    url: '/api/user',
    onSuccess: () => push('/sign-in'),
  });

  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUp>({
    resolver: zodResolver(SignUpScheme),
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

      <Input
        {...register('confirmPassword')}
        variant="bordered"
        label="Confirmar senha"
        type={isVisibleConfirm ? 'text' : 'password'}
        isDisabled={isMutating}
        isInvalid={Boolean(errors.confirmPassword)}
        errorMessage={errors.confirmPassword?.message}
        endContent={
          <Button
            className="focus:outline-none"
            variant="light"
            size="sm"
            onClick={() =>
              setIsVisibleConfirm((isVisibleConfirm) => !isVisibleConfirm)
            }
            isIconOnly
          >
            {isVisibleConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </Button>
        }
      />

      <Button type="submit" color="primary" isLoading={isMutating}>
        Salvar
      </Button>
    </form>
  );
}
